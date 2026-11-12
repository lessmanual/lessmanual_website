/* Wariant C: scena 3D. Kamera leci po krzywej, postęp lotu wynika z przewijania (jedno źródło: natywny scroll),
   stan liczony w pętli klatek z tłumieniem. Karty systemów stoją dokładnie tam, gdzie kamera jest przy ich tekście. */
// Pakiet ESM z jsDelivr: jeden zminifikowany plik (build/three.module.min.js dociąga niezminifikowany three.core.js, +130 KiB)
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.186.1/+esm";

const LIGHT = new THREE.Color("#F4F2EE");
const DARK = new THREE.Color("#0A0A0A");
const COPPER = new THREE.Color("#B87333");
// Postęp krzywej dla kotwic: start, o nas, 4 systemy, opinie, oferta, rozmowa
const T = [0, 0.1, 0.24, 0.36, 0.48, 0.6, 0.74, 0.86, 1];
const POSTERS = ["../_assets/rolka1.jpg", "../_assets/rolka2.jpg", "../_assets/rolka3.jpg", "../_assets/rolka2.jpg"];
const CLIPS = ["../_assets/rolka1.mp4", "../_assets/rolka2.mp4", "../_assets/rolka3.mp4", "../_assets/rolka2.mp4"];

function roundedRect(w, h, r, seg = 6) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ShapeGeometry(s, seg);
  const p = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < p.count; i++) uv.setXY(i, (p.getX(i) - x) / w, (p.getY(i) - y) / h);
  return g;
}

function rand(seed) { // deterministyczny, żeby układ był ten sam przy każdym wejściu
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

export async function start(canvas, LM) {
  let mobile = innerWidth < 761;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  let dprCap = 1.5;
  renderer.setPixelRatio(Math.min(devicePixelRatio, dprCap));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const bg = LIGHT.clone();
  scene.background = bg;
  scene.fog = new THREE.Fog(bg.getHex(), 3, 15);

  const camera = new THREE.PerspectiveCamera(mobile ? 50 : 35, innerWidth / innerHeight, 0.1, 80);
  const rig = new THREE.PerspectiveCamera(); // pomocnik do liczenia kadru w punkcie krzywej

  const hemi = new THREE.HemisphereLight(0xffffff, 0xcfc4b8, 1.6);
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(3, 6, 5);
  scene.add(hemi, sun);

  // Tor lotu: łagodny slalom w głąb sceny
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 8), new THREE.Vector3(0.5, 0.15, 1), new THREE.Vector3(-0.7, -0.2, -6),
    new THREE.Vector3(0.6, 0.25, -13), new THREE.Vector3(-0.5, 0, -20), new THREE.Vector3(0.5, -0.2, -27),
    new THREE.Vector3(-0.4, 0.2, -34), new THREE.Vector3(0.3, 0, -41), new THREE.Vector3(0, 0, -48),
  ], false, "centripetal");

  const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
  function frameAt(t, obj) {
    const tc = Math.min(Math.max(t, 0), 1);
    curve.getPointAt(tc, obj.position);
    curve.getTangentAt(tc, tmpA);
    tmpB.copy(obj.position).add(tmpA);
    obj.up.set(0, 1, 0);
    obj.lookAt(tmpB);
    obj.updateMatrixWorld(true);
    return obj;
  }

  // ---------- Karty systemów z filmami ----------
  const loader = new THREE.TextureLoader();
  const posterTex = await Promise.all(POSTERS.map((src) => loader.loadAsync(src).then((t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; })));
  const screenGeo = roundedRect(0.9, 1.6, 0.07);
  const frameGeo = roundedRect(0.94, 1.64, 0.09);
  const frameMat = new THREE.MeshBasicMaterial({ color: COPPER, transparent: true });
  const cards = posterTex.map((tex, i) => {
    const g = new THREE.Group();
    // przezroczystość tylko do wejścia karty; poza zasięgiem karta jest niewidoczna i nie wchodzi pod tekst innych sekcji
    const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));
    const frame = new THREE.Mesh(frameGeo, frameMat.clone());
    frame.position.z = -0.006;
    g.add(frame, screen);
    scene.add(g);
    return { group: g, screen, poster: tex, video: null, vtex: null, t: T[2 + i] };
  });

  function placeCards() {
    const aspect = innerWidth / innerHeight;
    const fov = THREE.MathUtils.degToRad(camera.fov);
    cards.forEach((c, i) => {
      frameAt(c.t, rig);
      let D, x, y, yaw;
      if (mobile) {
        D = 1.6 / (0.4 * 2 * Math.tan(fov / 2));
        const vis = 2 * D * Math.tan(fov / 2);
        x = 0; y = 0.2 * vis; yaw = 0;
      } else {
        D = 1.6 / (0.72 * 2 * Math.tan(fov / 2));
        const visW = 2 * D * Math.tan(fov / 2) * aspect;
        x = 0.21 * visW; y = 0; yaw = -0.16;
      }
      c.group.position.copy(rig.localToWorld(tmpA.set(x, y, -D)));
      c.group.quaternion.copy(rig.quaternion);
      c.group.rotateY(yaw);
      // pozycja bazowa i kierunek zejścia z kadru: po przeczytaniu karta odsuwa się w bok (telefon: w górę)
      c.basePos = c.group.position.clone();
      c.baseQuat = c.group.quaternion.clone();
      c.away = new THREE.Vector3(mobile ? 0 : 1, mobile ? 1 : 0, 0).applyQuaternion(rig.quaternion);
    });
  }

  // ---------- Pływające karty (jedna instancja, jedno wywołanie rysowania) ----------
  const N = mobile ? 26 : 40;
  const ghostGeo = roundedRect(0.9, 1.6, 0.08, 4);
  const ghostMat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const ghosts = new THREE.InstancedMesh(ghostGeo, ghostMat, N);
  ghosts.frustumCulled = false; // instancje rozsiane po całym torze, a pod koniec układają się w ścianę
  const rnd = rand(20261112);
  const base = [];
  const white = new THREE.Color("#FFFFFF"), warm = new THREE.Color("#F1E4D6"), cop = new THREE.Color("#C98B52"), pat = new THREE.Color("#3FD0C2");
  placeCards();
  for (let i = 0; i < N; i++) {
    let pos, tries = 0;
    const t = 0.02 + rnd() * 0.97;
    do {
      frameAt(t, rig);
      // większość po prawej; po lewej tylko daleko przy krawędzi, żeby nie wchodzić pod kolumnę tekstu
      const right = rnd() < 0.75;
      const lx = right ? 1.3 + rnd() * 3.4 : -(4.2 + rnd() * 2.4);
      const ly = (rnd() - 0.5) * 3.6;
      const lz = -1.5 - rnd() * 3.5;
      pos = rig.localToWorld(new THREE.Vector3(lx, ly, lz));
      tries++;
    } while (tries < 8 && cards.some((c) => c.group.position.distanceTo(pos) < 1.4));
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - 0.5) * 0.9, (rnd() - 0.5) * 1.6, (rnd() - 0.5) * 0.6));
    q.premultiply(rig.quaternion);
    const s = 0.45 + rnd() * 0.55;
    base.push({ pos, q, s, ph: rnd() * Math.PI * 2, sp: 0.35 + rnd() * 0.4 });
    const r = rnd();
    ghosts.setColorAt(i, r < 0.05 ? pat : r < 0.2 ? cop : r < 0.45 ? warm : white);
  }
  scene.add(ghosts);

  // Ściana na finał: karty układają się w równą siatkę
  const wall = [];
  function placeWall() {
    frameAt(1, rig);
    const cols = mobile ? 4 : 7, rows = Math.ceil(N / cols);
    const cw = 0.55, ch = 0.9, D = mobile ? 14 : 12.5;
    const cx = mobile ? 0 : 2.9, cy = mobile ? 3.0 : 0.6;
    const yawQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, mobile ? 0 : -0.32, 0));
    for (let i = 0; i < N; i++) {
      const c = i % cols, r = Math.floor(i / cols);
      const lx = cx + (c - (cols - 1) / 2) * cw;
      const ly = cy + ((rows - 1) / 2 - r) * ch;
      wall[i] = { pos: rig.localToWorld(new THREE.Vector3(lx, ly, -D)), q: rig.quaternion.clone().multiply(yawQ), s: 0.5 };
    }
  }
  placeWall();

  // Kurz w świetle projektora: lekkie punkty wzdłuż toru
  const DUST = mobile ? 260 : 520;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) {
    frameAt(rnd(), rig);
    rig.localToWorld(tmpA.set((rnd() - 0.5) * 9, (rnd() - 0.5) * 5, -1 - rnd() * 6));
    dustPos.set([tmpA.x, tmpA.y, tmpA.z], i * 3);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: COPPER, size: 0.022, transparent: true, opacity: 0.45, depthWrite: false });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ---------- Przewijanie na postęp lotu ----------
  function ease(f) { const s = f * f * (3 - 2 * f); return 0.7 * s + 0.3 * f; } // zwalnia przy kartach, nie staje
  function scrollToT(y) {
    const a = LM.anchors;
    if (!a || a.length < 2) return 0;
    if (y <= a[0]) return T[0];
    for (let i = 0; i < a.length - 1; i++) {
      if (y <= a[i + 1]) return T[i] + (T[i + 1] - T[i]) * ease((y - a[i]) / (a[i + 1] - a[i]));
    }
    return 1;
  }

  // ---------- Filmy na kartach: tylko gdy kamera jest blisko ----------
  function wakeVideo(c, on) {
    if (on && !c.video) {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "auto";
      v.src = CLIPS[cards.indexOf(c)];
      v.addEventListener("playing", () => {
        if (!c.vtex) { c.vtex = new THREE.VideoTexture(v); c.vtex.colorSpace = THREE.SRGBColorSpace; }
        c.screen.material.map = c.vtex; c.screen.material.needsUpdate = true;
      }, { once: true });
      c.video = v;
    }
    if (!c.video) return;
    if (on && c.video.paused) c.video.play().catch(() => {});
    if (!on && !c.video.paused) c.video.pause();
  }

  // ---------- Kursor: delikatna paralaksa (desktop) ----------
  const ptr = { x: 0, y: 0, cx: 0, cy: 0 };
  if (matchMedia("(pointer: fine)").matches) {
    addEventListener("pointermove", (e) => { ptr.x = e.clientX / innerWidth - 0.5; ptr.y = e.clientY / innerHeight - 0.5; }, { passive: true });
  }

  // ---------- Zmiana rozmiaru (pasek adresu na telefonie nie przebudowuje sceny) ----------
  let lastW = innerWidth, lastH = innerHeight;
  function onResize() {
    const w = innerWidth, h = innerHeight;
    if (w === lastW && Math.abs(h - lastH) < 140) return;
    lastW = w; lastH = h;
    mobile = w < 761;
    camera.fov = mobile ? 50 : 35;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    placeCards(); placeWall();
  }
  addEventListener("resize", onResize);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  // ---------- Pętla klatek ----------
  const timer = new THREE.Timer();
  timer.connect(document);
  const dummy = new THREE.Object3D();
  const qTmp = new THREE.Quaternion();
  const look = new THREE.Vector3(), side = new THREE.Vector3(), upv = new THREE.Vector3();
  let tCur = scrollToT(scrollY);
  let frames = 0, acc = 0, degraded = false, dead = false;

  function render() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    const time = timer.getElapsed();

    // Strażnik płynności: najpierw niższa rozdzielczość, potem statyczny zamiennik
    if (frames < 400) {
      frames++;
      if (frames > 30) acc += dt;
      if (frames === 150) {
        const avg = acc / 120;
        if (avg > 0.034) { degraded = true; renderer.setPixelRatio(1); }
        acc = 0;
      }
      if (frames === 330 && degraded && acc / 180 > 0.045) { dead = true; }
    }
    if (dead) { stop(); LM.fallback(); return; }

    tCur = THREE.MathUtils.damp(tCur, scrollToT(scrollY), 3.2, dt);
    frameAt(tCur, camera);
    // przechył na zakrętach
    curve.getTangentAt(Math.min(tCur + 0.02, 1), look);
    curve.getTangentAt(tCur, side);
    camera.rotateZ(THREE.MathUtils.clamp((look.x - side.x) * -0.9, -0.05, 0.05));
    ptr.cx = THREE.MathUtils.damp(ptr.cx, ptr.x, 3, dt);
    ptr.cy = THREE.MathUtils.damp(ptr.cy, ptr.y, 3, dt);
    side.set(1, 0, 0).applyQuaternion(camera.quaternion);
    upv.set(0, 1, 0).applyQuaternion(camera.quaternion);
    camera.position.addScaledVector(side, ptr.cx * 0.22).addScaledVector(upv, -ptr.cy * 0.14);

    // kolor kina
    const k = LM.k || 0;
    bg.copy(LIGHT).lerp(DARK, k);
    scene.fog.color.copy(bg);
    scene.fog.far = 15 + 7 * k; // w kinie ekrany widać z dalszej odległości
    hemi.intensity = 1.6 - 1.45 * k;
    sun.intensity = 1.6 - 1.38 * k;
    dustMat.opacity = 0.35 + 0.35 * k;

    // pływające karty, a pod koniec ściana
    const f = THREE.MathUtils.smoothstep(tCur, 0.88, 0.99);
    scene.fog.far += 16 * f; // ściana na finał ma być wyraźna
    for (let i = 0; i < N; i++) {
      const b = base[i], w = wall[i];
      const bob = Math.sin(time * b.sp + b.ph);
      dummy.position.copy(b.pos);
      dummy.position.y += bob * 0.09;
      dummy.quaternion.copy(b.q);
      dummy.rotateZ(bob * 0.05);
      dummy.rotateY(Math.cos(time * b.sp * 0.7 + b.ph) * 0.08);
      if (f > 0) {
        dummy.position.lerp(w.pos, f);
        qTmp.copy(dummy.quaternion).slerp(w.q, f);
        dummy.quaternion.copy(qTmp);
      }
      dummy.scale.setScalar(b.s + (w.s - b.s) * f);
      dummy.updateMatrix();
      ghosts.setMatrixAt(i, dummy.matrix);
    }
    ghosts.instanceMatrix.needsUpdate = true;

    // filmy na kartach budzą się w pobliżu
    for (const c of cards) {
      const ds = tCur - c.t; // ujemne: karta przed nami, dodatnie: już ją mijamy
      const d = Math.abs(ds);
      wakeVideo(c, d < 0.075);
      // wejście łagodne z daleka; po minięciu karta znika szybko, zanim kamera wjedzie w ekran
      const op = ds < 0 ? 1 - THREE.MathUtils.smoothstep(d, 0.06, 0.11) : 1 - THREE.MathUtils.smoothstep(ds, 0.03, 0.05);
      const ex = ds > 0 ? THREE.MathUtils.smoothstep(ds, 0.0, 0.045) : 0;
      c.group.position.copy(c.basePos).addScaledVector(c.away, ex * (mobile ? 2.6 : 3.4));
      c.group.quaternion.copy(c.baseQuat);
      if (ex > 0) c.group.rotateY(-ex * 0.9);
      c.group.visible = op > 0.001;
      c.screen.material.opacity = op;
      c.group.children[0].material.opacity = op;
    }

    renderer.render(scene, camera);
  }
  function stop() {
    renderer.setAnimationLoop(null);
    removeEventListener("resize", onResize);
    cards.forEach((c) => { if (c.video) { c.video.pause(); c.video.removeAttribute("src"); c.video.load(); } c.vtex?.dispose(); c.poster.dispose(); c.screen.material.dispose(); c.group.children[0].material.dispose(); });
    [screenGeo, frameGeo, ghostGeo, dustGeo].forEach((g) => g.dispose());
    [frameMat, ghostMat, dustMat].forEach((m) => m.dispose());
    renderer.dispose();
  }

  await renderer.compileAsync(scene, camera);
  render();
  renderer.setAnimationLoop(render);
  window.__sceneC = { renderer, stats: () => ({ calls: renderer.info.render.calls, tris: renderer.info.render.triangles, dpr: renderer.getPixelRatio(), t: tCur }) };
}
