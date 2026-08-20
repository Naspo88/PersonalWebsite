import type { Project } from "@/lib/project-schema";

/**
 * Duplicate placeholderProject to add a real one. Every field is rendered:
 * the grid card uses name, year, role, summary and stack; the detail page
 * additionally uses problem, approach, outcome, highlights and links.
 * `slug` becomes the URL segment and must be unique.
 */
export const placeholderProject: Project = {
  slug: "placeholder-project",
  name: "Placeholder project",
  year: "2026",
  featured: true,
  role: {
    en: "TODO — your role, for example Lead engineer",
    it: "TODO — il tuo ruolo, ad esempio Lead engineer",
  },
  summary: {
    en: "TODO — one sentence a recruiter can skim: what it is and why it mattered.",
    it: "TODO — una frase leggibile a colpo d'occhio: cos'è e perché è importante.",
  },
  problem: {
    en: "TODO — the situation before you started, and why it needed solving.",
    it: "TODO — la situazione di partenza e perché andava risolta.",
  },
  approach: {
    en: "TODO — what you built and the decisions you made along the way.",
    it: "TODO — cosa hai costruito e le decisioni prese lungo il percorso.",
  },
  outcome: {
    en: "TODO — the measurable result. Numbers land harder than adjectives.",
    it: "TODO — il risultato misurabile. I numeri contano più degli aggettivi.",
  },
  highlights: {
    en: ["TODO — a specific thing you shipped.", "TODO — a constraint you worked around."],
    it: ["TODO — qualcosa di concreto che hai realizzato.", "TODO — un vincolo che hai superato."],
  },
  stack: ["TODO", "TODO", "TODO"],
  links: [
    { label: { en: "Source code", it: "Codice sorgente" }, href: "https://github.com/TODO" },
  ],
};

export const projects: Project[] = [placeholderProject];
