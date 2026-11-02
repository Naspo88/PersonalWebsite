import type { Project } from "@/lib/project-schema";

/**
 * Every field is rendered: the grid card uses name, year, role, summary and stack;
 * the detail page additionally uses problem, approach, outcome, highlights and links.
 * `slug` becomes the URL segment and must be unique.
 */
const aiDrugDiscoveryPlatform: Project = {
  slug: "ai-drug-discovery-platform",
  name: "AI drug discovery platform",
  year: "2025",
  featured: true,
  role: { en: "Principal Developer, Front End", it: "Principal Developer, Front End" },
  summary: {
    en: "A production-ready platform that puts backend AI agents in the hands of drug discovery scientists.",
    it: "Una piattaforma pronta per la produzione che mette agenti AI a disposizione degli scienziati della drug discovery.",
  },
  problem: {
    en: "Tangram Therapeutics needed its AI research to be usable day to day. That meant a front end able to scale with fast-moving science and integrate cleanly with backend AI agents.",
    it: "Tangram Therapeutics aveva bisogno di rendere la propria ricerca AI utilizzabile ogni giorno. Serviva un front end capace di crescere al ritmo della ricerca e di integrarsi in modo pulito con gli agenti AI nel backend.",
  },
  approach: {
    en: "I led the architectural design and implementation, working with AI experts and backend engineers so technical decisions matched multidisciplinary requirements. The UI is a modular React and TypeScript codebase split into microfrontends with Nx and Rspack.",
    it: "Ho guidato la progettazione architetturale e l'implementazione, lavorando con esperti di AI e ingegneri backend perché le scelte tecniche rispondessero a requisiti multidisciplinari. La UI è una codebase modulare in React e TypeScript suddivisa in microfrontend con Nx e Rspack.",
  },
  outcome: {
    en: "The platform went into active use across the organisation, with a codebase built for high-velocity feature development.",
    it: "La piattaforma è entrata in uso attivo in tutta l'organizzazione, con una codebase pensata per sviluppare nuove funzionalità ad alta velocità.",
  },
  highlights: {
    en: [
      "Bridged front-end scalability with backend AI agent integration.",
      "Supported the AWS ECS setup and infrastructure reliability.",
    ],
    it: [
      "Ho unito la scalabilità del front end con l'integrazione degli agenti AI nel backend.",
      "Ho supportato la configurazione di AWS ECS e l'affidabilità dell'infrastruttura.",
    ],
  },
  stack: ["React", "TypeScript", "Nx", "Rspack", "AWS ECS"],
  links: [],
};

const microfrontendMigration: Project = {
  slug: "fundapps-microfrontends",
  name: "Microfrontend migration and team scaling",
  year: "2024",
  featured: true,
  role: { en: "Team Lead, Engineering Manager", it: "Team Lead, Engineering Manager" },
  summary: {
    en: "Grew a front-end team from 1 to 9 engineers and moved it to microfrontends so it could ship independently.",
    it: "Ho fatto crescere un team front-end da 1 a 9 ingegneri e l'ho portato ai microfrontend per permettergli di rilasciare in autonomia.",
  },
  problem: {
    en: "As FundApps grew, a single front-end codebase and a one-person team could not keep pace. More engineers needed to work in parallel without blocking each other.",
    it: "Con la crescita di FundApps, una singola codebase front-end e un team di una persona non riuscivano a tenere il passo. Più ingegneri dovevano lavorare in parallelo senza bloccarsi a vicenda.",
  },
  approach: {
    en: "I led the architectural transition to microfrontends with Nx and React, partnering with designers and product managers so the new UI architecture served the product vision. In parallel I hired, managed and mentored the engineers joining the team.",
    it: "Ho guidato la transizione architetturale ai microfrontend con Nx e React, collaborando con designer e product manager perché la nuova architettura UI servisse la visione del prodotto. Allo stesso tempo ho assunto, gestito e seguito come mentore gli ingegneri che entravano nel team.",
  },
  outcome: {
    en: "The team grew from 1 to 9 engineers and shipped independently and faster. Every one of my 4 direct reports earned at least one promotion.",
    it: "Il team è cresciuto da 1 a 9 ingegneri e rilasciava in autonomia e più velocemente. Ognuno dei miei 4 riporti diretti ha ottenuto almeno una promozione.",
  },
  highlights: {
    en: [
      "Structured mentoring and career planning for every direct report.",
      "A learning-first culture recognised for high trust and psychological safety.",
    ],
    it: [
      "Mentoring strutturato e piani di carriera per ogni riporto diretto.",
      "Una cultura orientata all'apprendimento, riconosciuta per fiducia e sicurezza psicologica.",
    ],
  },
  stack: ["React", "TypeScript", "Nx", "Microfrontends"],
  links: [],
};

const engineeringOperatingModel: Project = {
  slug: "clippd-operating-model",
  name: "Engineering operating model",
  year: "2026",
  featured: true,
  role: { en: "Engineering Manager", it: "Engineering Manager" },
  summary: {
    en: "A new way of working for a distributed UK and India engineering team, built around clear ownership and measurable delivery.",
    it: "Un nuovo modo di lavorare per un team di ingegneria distribuito tra Regno Unito e India, basato su responsabilità chiare e consegne misurabili.",
  },
  problem: {
    en: "The team spanned two countries and five disciplines: backend, frontend, data, platform and QA. Work needed clearer ownership and a predictable rhythm.",
    it: "Il team era distribuito su due paesi e cinque discipline: backend, frontend, dati, piattaforma e QA. Il lavoro aveva bisogno di responsabilità più chiare e di un ritmo prevedibile.",
  },
  approach: {
    en: "I organised the roadmap into four outcomes, each owned by an engineer. I introduced a fixed sprint rhythm, DORA metrics, WIP limits, blameless root-cause reviews and a support rota that protects focus time.",
    it: "Ho organizzato la roadmap in quattro obiettivi, ognuno con un ingegnere responsabile. Ho introdotto sprint a cadenza fissa, metriche DORA, limiti al lavoro in corso, analisi delle cause senza colpe e una turnazione di supporto che protegge il tempo di concentrazione.",
  },
  outcome: {
    en: "Every live project now has a lead and a date. Work is under way on reliability and on engineering spend.",
    it: "Ogni progetto attivo ora ha un referente e una data. È in corso il lavoro sull'affidabilità e sulla spesa di ingegneria.",
  },
  highlights: {
    en: [
      "Started reliability work on the parts of the product that matter most.",
      "Took ownership of engineering spend, reviewing tooling seats and vendor contracts.",
    ],
    it: [
      "Ho avviato il lavoro sull'affidabilità delle parti del prodotto più importanti.",
      "Ho preso in carico la spesa di ingegneria, rivedendo licenze degli strumenti e contratti con i fornitori.",
    ],
  },
  stack: ["DORA metrics", "WIP limits", "Blameless reviews"],
  links: [],
};

export const projects: Project[] = [
  aiDrugDiscoveryPlatform,
  microfrontendMigration,
  engineeringOperatingModel,
];
