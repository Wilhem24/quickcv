export const emptyCV = {
  template: "classic",
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [],
  education: [],
  certificates: [],
  skills: "",
}

export const sampleCV = {
  template: "classic",
  name: "Alex Morgan",
  title: "Senior Product Designer",
  email: "alex.morgan@email.com",
  phone: "+1 555 123 4567",
  location: "New York, NY",
  website: "alexmorgan.design",
  summary:
    "Product designer with 5+ years of experience designing user-centered SaaS and fintech products. Focused on design systems, accessibility and data-driven design.",
  experience: [
    {
      id: "e1",
      role: "Senior Product Designer",
      company: "FinTech Co",
      period: "2022 - Present",
      bullets:
        "Led redesign of core dashboard, improving user retention by 28%\nBuilt a design system used across 5 product teams\nDesigned mobile app from 0 to 1, now 50k+ active users",
    },
  ],
  education: [
    {
      id: "d1",
      degree: "B.A. Interaction Design",
      school: "University of Washington",
      year: "2020",
    },
  ],
  certificates: [
    {
      id: "c1",
      name: "Certified Usability Analyst",
      issuer: "Human Factors International",
      year: "2021",
    },
  ],
  skills: "Figma, Prototyping, User Research, Design Systems, Analytics, Accessibility",
}