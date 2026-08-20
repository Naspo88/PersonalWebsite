import type { Cv } from "@/lib/cv-schema";

export const cv: Cv = {
  updatedAt: "2026-08",

  experience: [
    {
      company: "Tangram Therapeutics",
      title: { en: "TODO — job title", it: "TODO — ruolo" },
      location: "London, United Kingdom",
      startDate: "TODO-01",
      endDate: null,
      summary: {
        en: "TODO — two lines on what you own here and the impact it has.",
        it: "TODO — due righe su cosa gestisci e sull'impatto che ha.",
      },
      highlights: {
        en: ["TODO — a concrete, measurable achievement."],
        it: ["TODO — un risultato concreto e misurabile."],
      },
      stack: ["TODO"],
    },
  ],

  education: [
    {
      institution: "Università di Pisa",
      qualification: { en: "Master's degree", it: "Laurea magistrale" },
      field: { en: "Digital Humanities", it: "Informatica Umanistica" },
      location: "Pisa, Italy",
      startDate: "2011-09",
      endDate: "2013-12",
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
      label: { en: "Languages", it: "Linguaggi" },
      items: ["TODO — JavaScript", "TODO — TypeScript", "TODO — Python", "TODO — C#"],
    },
    {
      label: { en: "Frameworks", it: "Framework" },
      items: ["TODO — React", "TODO — Next.js", "TODO — ASP.NET"],
    },
    {
      label: { en: "Cloud & infrastructure", it: "Cloud e infrastruttura" },
      items: ["TODO — AWS", "TODO — Terraform"],
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
