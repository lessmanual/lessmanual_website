"use client";

import { Calendar, MessageSquare, FileText, Compass } from "lucide-react";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

const VISIONS = [
  {
    icon: Calendar,
    title: "Kalendarz pełny spotkań",
    text: "Otwierasz kalendarz — 4 potwierdzone spotkania z decydentami. Nie szukałeś ich. System znalazł, napisał, umówił.",
  },
  {
    icon: MessageSquare,
    title: "Odpowiedź w 30 sekund",
    text: "Klient wysłał zapytanie w sobotę o 23:00. Dostał odpowiedź w 30 sekund. Oferta wygenerowała się sama. PDF na mailu w 5 minut.",
  },
  {
    icon: FileText,
    title: "Blog pisze się sam",
    text: "3 artykuły tygodniowo. Ruch z Google rośnie co miesiąc. Ty nie napisałeś ani jednego zdania.",
  },
  {
    icon: Compass,
    title: "Ty prowadzisz firmę",
    text: "Spotykasz się z klientami, myślisz o strategii. Nie o raportach, ofertach i odpowiadaniu na te same pytania po raz setny.",
  },
];

export function Imagine() {
  return (
    <section className="py-28 md:py-40 bg-bg">
      <div className="max-w-[1000px] mx-auto px-6">
        <FadeUp>
          <p className="text-center text-text-light text-sm font-mono uppercase tracking-wider mb-4">
            Wyobraź sobie
          </p>
          <h2 className="font-serif text-center text-2xl md:text-3xl mb-12">
            Poniedziałek rano. Kawa w ręku.
          </h2>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {VISIONS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="bg-white border border-border rounded-[6px] p-6 md:p-8 h-full hover:border-accent transition-colors duration-200">
                <item.icon size={24} strokeWidth={1.5} className="text-accent mb-4" />
                <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed italic">
                  {item.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp>
          <div className="text-center">
            <p className="text-text font-medium text-lg mb-2">
              Brzmi jak science fiction?
            </p>
            <p className="text-text-secondary mb-6">
              Dla naszych klientów to poniedziałek.
            </p>
            <Button href={CALENDLY_URL} external>
              Chcę takie wyniki
            </Button>
            <p className="mt-5 text-text-light text-sm">
              Nie wierz mi na słowo. Zaraz pokażę Ci konkretne wyniki i opinie klientów.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
