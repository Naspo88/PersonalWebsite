import type { Locale } from "@/lib/i18n";

export type Social = { label: string; href: string };
export type Localized = Record<Locale, string>;

export const profile = {
  name: "Roberto Minghi",
  email: "robertominghi@msn.com",
  foundedYear: 2026,
  location: { en: "London, UK", it: "Londra, Regno Unito" } satisfies Localized,
  role: {
    en: "Strategic Engineering Leader | Mentorship & People Development",
    it: "Engineering Leader strategico | Mentorship e sviluppo delle persone",
  } satisfies Localized,
  positioning: {
    en: "I help engineering teams adopt AI with confidence, raising productivity without compromising the quality great software demands.",
    it: "Aiuto i team di ingegneria ad adottare l'AI con consapevolezza, aumentando la produttività senza rinunciare alla qualità che il buon software richiede.",
  } satisfies Localized,
  about: {
    en: [
      "Our industry is going through one of its biggest shifts. AI tools can make engineers dramatically more productive, but only when teams understand where those tools help, where they fall short, and how to stay in ownership of the code they ship.",
      "My focus is on people: mentoring engineers, building shared practices for using AI well, and creating an environment where speed and quality reinforce each other instead of competing. At FundApps I helped grow the front-end team from 1 to 9 engineers, and every one of my direct reports earned a promotion. At Tangram Therapeutics I led the architecture of an AI-driven drug discovery platform. Today I lead engineering at Clippd across the UK and India.",
    ],
    it: [
      "Il nostro settore sta attraversando uno dei cambiamenti più profondi della sua storia. Gli strumenti di AI possono rendere gli ingegneri molto più produttivi, ma solo quando i team capiscono dove aiutano davvero, dove mostrano i loro limiti e come mantenere la piena responsabilità del codice che rilasciano.",
      "Il mio lavoro è centrato sulle persone: fare mentoring agli ingegneri, costruire pratiche condivise per usare bene l'AI e creare un ambiente in cui velocità e qualità si rafforzano a vicenda invece di competere. In FundApps ho contribuito a far crescere il team front-end da 1 a 9 ingegneri, e ognuno dei miei riporti diretti ha ottenuto una promozione. In Tangram Therapeutics ho guidato l'architettura di una piattaforma di drug discovery basata sull'AI. Oggi guido l'ingegneria di Clippd tra Regno Unito e India.",
    ],
  } satisfies Record<Locale, string[]>,
  socials: [
    { label: "GitHub", href: "https://github.com/Naspo88" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/roberto-minghi-7b6b6852/" },
  ] satisfies Social[],
} as const;
