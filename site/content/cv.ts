import type { Cv } from "@/lib/cv-schema";

export const cv: Cv = {
  updatedAt: "2026-11",

  experience: [
    {
      company: "Clippd",
      title: { en: "Engineering Manager", it: "Engineering Manager" },
      location: "London, United Kingdom",
      startDate: "2026-08",
      endDate: null,
      summary: {
        en: "I lead the engineering team across the UK and India, spanning backend, frontend, data, platform and QA.",
        it: "Guido il team di ingegneria tra Regno Unito e India, che comprende backend, frontend, dati, piattaforma e QA.",
      },
      highlights: {
        en: [
          "Organised the roadmap into four outcomes, each owned by an engineer. Every live project now has a lead and a date.",
          "Introduced a new way of working: a fixed sprint rhythm, DORA metrics, WIP limits, blameless root-cause reviews and a support rota that protects focus time.",
          "Started reliability work on the parts of the product that matter most.",
          "Took ownership of engineering spend, reviewing tooling seats and vendor contracts.",
        ],
        it: [
          "Ho organizzato la roadmap in quattro obiettivi, ognuno con un ingegnere responsabile. Ogni progetto attivo ora ha un referente e una data.",
          "Ho introdotto un nuovo modo di lavorare: sprint a cadenza fissa, metriche DORA, limiti al lavoro in corso, analisi delle cause senza colpe e una turnazione di supporto che protegge il tempo di concentrazione.",
          "Ho avviato il lavoro sull'affidabilità delle parti del prodotto più importanti.",
          "Ho preso in carico la spesa di ingegneria, rivedendo licenze degli strumenti e contratti con i fornitori.",
        ],
      },
      stack: [],
    },
    {
      company: "Tangram Therapeutics",
      title: {
        en: "Principal Developer, Front End Engineering",
        it: "Principal Developer, Front End Engineering",
      },
      location: "London, United Kingdom",
      startDate: "2024-11",
      endDate: "2026-04",
      summary: {
        en: "Led the architecture of a production-ready, AI-driven drug discovery platform, connecting a scalable front end with backend AI agents.",
        it: "Ho guidato l'architettura di una piattaforma di drug discovery basata sull'AI e pronta per la produzione, collegando un front end scalabile con agenti AI nel backend.",
      },
      highlights: {
        en: [
          "Partnered with AI experts and backend engineers to shape a scalable system that met complex, multidisciplinary requirements.",
          "Designed a modular UI codebase with React, TypeScript and microfrontends (Nx, Rspack) for high-velocity feature development.",
          "Supported the AWS ECS setup and infrastructure reliability as the platform moved into active use across the organisation.",
        ],
        it: [
          "Ho collaborato con esperti di AI e ingegneri backend per progettare un sistema scalabile in grado di soddisfare requisiti complessi e multidisciplinari.",
          "Ho progettato una codebase UI modulare con React, TypeScript e microfrontend (Nx, Rspack) per sviluppare nuove funzionalità ad alta velocità.",
          "Ho supportato la configurazione di AWS ECS e l'affidabilità dell'infrastruttura mentre la piattaforma entrava in uso attivo in tutta l'organizzazione.",
        ],
      },
      stack: ["React", "TypeScript", "Nx", "Rspack", "Microfrontends", "AWS ECS"],
    },
    {
      company: "FundApps",
      title: {
        en: "Software Engineer, Team Lead, Engineering Manager",
        it: "Software Engineer, Team Lead, Engineering Manager",
      },
      location: "London, United Kingdom",
      startDate: "2018-09",
      endDate: "2024-09",
      summary: {
        en: "Grew from engineer to engineering manager over six years, scaling the front-end team and leading its move to a microfrontend architecture.",
        it: "In sei anni sono passato da ingegnere a engineering manager, facendo crescere il team front-end e guidandone il passaggio a un'architettura a microfrontend.",
      },
      highlights: {
        en: [
          "Helped grow the front-end team from 1 to 9 engineers.",
          "Directly managed 4 engineers; every report earned at least one promotion through structured mentoring and career planning.",
          "Led the architectural move to microfrontends (Nx, React), so the growing team could ship independently and faster.",
          "Partnered with designers and product managers on a modern UI architecture aligned with the product vision.",
          "Built a learning-first culture recognised by reports and senior leadership for high trust and psychological safety.",
        ],
        it: [
          "Ho contribuito a far crescere il team front-end da 1 a 9 ingegneri.",
          "Ho gestito direttamente 4 ingegneri; ognuno ha ottenuto almeno una promozione grazie a mentoring strutturato e piani di carriera.",
          "Ho guidato il passaggio architetturale ai microfrontend (Nx, React), permettendo al team in crescita di rilasciare in autonomia e più velocemente.",
          "Ho collaborato con designer e product manager su un'architettura UI moderna, allineata alla visione del prodotto.",
          "Ho costruito una cultura orientata all'apprendimento, riconosciuta dal team e dal senior leadership per fiducia e sicurezza psicologica.",
        ],
      },
      stack: ["React", "TypeScript", "Nx", "Microfrontends", "Python"],
    },
    {
      company: "Pushfor",
      title: { en: "UI Developer", it: "UI Developer" },
      location: "London, United Kingdom",
      startDate: "2017-09",
      endDate: "2018-09",
      summary: {
        en: "Web team member working on the company's web application and on the new platform built to replace it.",
        it: "Membro del team web, ho lavorato sull'applicazione web dell'azienda e sulla nuova piattaforma creata per sostituirla.",
      },
      highlights: {
        en: [
          "Maintained the existing Angular 2 application.",
          "Built UI for the replacement platform with React, Redux and Angular 4.",
        ],
        it: [
          "Ho mantenuto l'applicazione Angular 2 esistente.",
          "Ho sviluppato la UI della nuova piattaforma con React, Redux e Angular 4.",
        ],
      },
      stack: ["React", "Redux", "Angular", "TypeScript", "Sass"],
    },
    {
      company: "Deseeo Ltd.",
      title: { en: "JavaScript Front End Developer", it: "JavaScript Front End Developer" },
      location: "Pisa, Italy",
      startDate: "2016-04",
      endDate: "2017-09",
      summary: {
        en: "Built the website prototype for a startup in a small team, extending a proprietary JavaScript framework where needed.",
        it: "In un piccolo team ho sviluppato il prototipo del sito di una startup, estendendo un framework JavaScript proprietario dove necessario.",
      },
      highlights: { en: [], it: [] },
      stack: ["JavaScript", "jQuery", "Less"],
    },
    {
      company: "Apparound",
      title: { en: "JavaScript Developer", it: "JavaScript Developer" },
      location: "Pisa, Italy",
      startDate: "2015-10",
      endDate: "2016-04",
      summary: {
        en: "Widget team member building product features and introducing unit testing to the company codebase.",
        it: "Membro del team widget, ho sviluppato funzionalità di prodotto e introdotto i test unitari nel codice aziendale.",
      },
      highlights: { en: [], it: [] },
      stack: ["AngularJS", "Node.js", "Jasmine", "Karma"],
    },
    {
      company: "Flux Entertainment",
      title: { en: "Software Developer", it: "Software Developer" },
      location: "Pisa, Italy",
      startDate: "2013-11",
      endDate: "2015-10",
      summary: {
        en: "Web and mobile developer in a four-person startup, building commissioned websites and cross-platform mobile apps.",
        it: "Sviluppatore web e mobile in una startup di quattro persone, ho realizzato siti su commissione e app mobile multipiattaforma.",
      },
      highlights: { en: [], it: [] },
      stack: ["JavaScript", "AngularJS", "Bootstrap", "C#", "Lua", "Corona SDK"],
    },
  ],

  education: [
    {
      institution: "Università di Pisa",
      qualification: { en: "Bachelor's degree", it: "Laurea triennale" },
      field: { en: "Humanities Computing", it: "Informatica Umanistica" },
      location: "Pisa, Italy",
      startDate: "2011-01",
      endDate: "2013-11",
    },
  ],

  certifications: [
    { name: "Learn Python 3", issuer: "Codecademy", date: "2021-03" },
    { name: "React Global Summit 2020", issuer: "Geekle", date: "2020-09" },
    { name: "The Complete ASP.NET MVC 5 Course", issuer: "Udemy", date: "2019-06" },
    {
      name: "Git a Web Developer Job: Mastering the Modern Workflow",
      issuer: "Udemy",
      date: "2019-01",
    },
    { name: "JavaScript: Understanding the Weird Parts", issuer: "Udemy", date: "2018-10" },
  ],

  skills: [
    {
      label: { en: "Leadership", it: "Leadership" },
      items: [
        "Engineering leadership",
        "Mentoring",
        "Performance management",
        "Hiring & team scaling",
        "DORA metrics",
      ],
    },
    {
      label: { en: "Languages", it: "Linguaggi" },
      items: ["TypeScript", "JavaScript", "Python", "C#"],
    },
    {
      label: { en: "Frontend & architecture", it: "Frontend e architettura" },
      items: ["React", "Redux", "Angular", "Microfrontends", "Nx", "Rspack"],
    },
    {
      label: { en: "Cloud & infrastructure", it: "Cloud e infrastruttura" },
      items: ["AWS", "AWS ECS"],
    },
  ],

  languages: [
    {
      name: { en: "Italian", it: "Italiano" },
      level: { en: "Native", it: "Madrelingua" },
    },
    {
      name: { en: "English", it: "Inglese" },
      level: { en: "Professional working proficiency", it: "Competenza professionale" },
    },
    {
      name: { en: "Spanish", it: "Spagnolo" },
      level: { en: "Professional working proficiency", it: "Competenza professionale" },
    },
  ],
};
