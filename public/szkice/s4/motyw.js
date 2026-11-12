/* Szkic S4: motyw z adresu (?motyw=jasny|ciemny), ustawiany przed malowaniem, żeby ciemny motyw nie mignął jasnym.
   Osobny plik, bo CSP produkcji (script-src 'self') blokuje skrypt wpisany w stronę. */
(function () {
  var m = "jasny";
  try { var q = new URLSearchParams(location.search).get("motyw"); if (q === "ciemny" || q === "jasny") m = q; } catch (e) {}
  document.documentElement.setAttribute("data-motyw", m);
})();
