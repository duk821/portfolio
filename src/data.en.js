// ================================================================
//  ENGLISH CONTENT — same structure as data.js (Mongolian).
//  When you change one, change the other too.
// ================================================================

export const me = {
  name: "Dulguun G.",
  shortName: "Dulguun",
  photo: "/me.jpg",
  role: "Information Systems Management student · System administrator",
  tagline: "Systems, servers, code — I like keeping things running reliably, and I never get tired of learning.",
  school: "University of Finance and Economics (UFE) — Information Systems Management, 4th year",
  location: "Ulaanbaatar, Mongolia",
  bio: [
    "I'm Dulguun Ganbold, a 4th-year Information Systems Management student at the University of Finance and Economics.",
    "I'm interested in IT, systems analysis and programming. I've worked as a system administrator on RHEL servers in M Bank's infrastructure department, and before that as an assistant at Mexim Consulting responsible for the integrity of the company's tablets.",
    "I love learning new things and want to work with new teams in an international environment. Outside of work I play table tennis and dance.",
  ],
  skills: [
    { group: "Programming", items: [["HTML / CSS", 80], ["JavaScript / React", 70], ["SQL", 75], ["C / C#", 65]] },
    { group: "Systems & networks", items: [["Linux (RHEL) servers", 75], ["LAN setup, router config", 75], ["Technical troubleshooting", 80]] },
    { group: "Other", items: [["Word, Excel, PowerPoint", 90], ["Systems analysis", 70], ["English (Intermediate)", 60]] },
  ],
  tools: ["React", "Supabase", "SQL", "C#", "RHEL Linux", "Git", "Vercel", "Excel", "PowerPoint"],
  awards: [
    { icon: "🏓", place: "2nd place", title: "Table tennis — Ulaanbaatar City Championship", year: "2023" },
    { icon: "🏓", place: "3rd place", title: "Table tennis — Mongolian National Championship", year: "2023" },
    { icon: "🏓", place: "3rd place", title: "Table tennis — Bayangol District Championship", year: "" },
    { icon: "💃", place: "1st place", title: "17th Cheer Up! Korea Open Cheerleading Championship — Team dance", year: "2022" },
    { icon: "💃", place: "1st place", title: "National Cheerleading Championship — Team dance", year: "2022" },
    { icon: "💃", place: "1st place", title: "Cheer sports regional & district championship — Team dance", year: "2023" },
    { icon: "💃", place: "2nd place", title: "Cheer sports regional & district championship — Team dance", year: "2023" },
  ],
};

export const cv = { file: "/Dulguun-CV.pdf", info: "1 page · PDF · 170 KB" };

export const contacts = [
  { type: "email", label: "Email", value: "gdulguun821@gmail.com", href: "mailto:gdulguun821@gmail.com", icon: "✉" },
  { type: "github", label: "GitHub", value: "github.com/duk821", href: "https://github.com/duk821", icon: "⌥" },
];

export const projects = [
  {
    id: "torque", title: "TORQUE", type: "Online store for car tuning parts", year: "2026", thumb: "torque", image: "/torque.jpg",
    desc: "An online store for tuning parts from 10 of the world's top brands. Drift and Off-road categories, a brand carousel, cart and user sign-in.",
    tech: ["React", "Supabase", "CSS"], demo: "", code: "",
  },
  {
    id: "museum", title: "ISM Digital Museum", type: "Interactive digital museum", year: "2026", thumb: "museum", image: "/museum.jpg",
    desc: "A digital museum where you can browse, search and explore the ISM department's history, faculty, events and student work in chronological order. Includes a time machine, sign-in and Row Level Security.",
    tech: ["React", "Supabase", "PostgreSQL"], demo: "https://ism-digital-museum-pi.vercel.app", code: "https://github.com/duk821/ism-digital-museum",
  },
  {
    id: "travel", title: "Travel route recommendation system", type: "Systems analysis & design", year: "2026", thumb: "travel",
    desc: "A system design for a travel agency that recommends routes based on a customer's interests and budget. Analysis and design done as a team.",
    tech: ["Systems analysis", "UML", "ERD"], demo: "", code: "",
  },
  {
    id: "help", title: "First-year help site", type: "Problem–solution website", year: "2026", thumb: "help",
    desc: "A website that gathers the common problems first-year ISM students run into, and their solutions, in one place.",
    tech: ["HTML", "CSS", "JavaScript"], demo: "", code: "",
  },
  {
    id: "portfolio", title: "Personal portfolio", type: "This website", year: "2026", thumb: "portfolio",
    desc: "The site you're looking at. A React portfolio with a terminal, a timeline and hidden easter eggs — hand-coded from a Figma design.",
    tech: ["React", "Vite", "CSS"], demo: "", code: "https://github.com/duk821/portfolio",
  },
  {
    id: "rhel", title: "RHEL 8 → 9 upgrade guide", type: "Technical documentation · M Bank", year: "2025", thumb: "rhel",
    desc: "A step-by-step guide for upgrading the servers in M Bank's infrastructure department from RHEL 8 to RHEL 9.",
    tech: ["RHEL", "Linux", "Documentation"], demo: "", code: "",
  },
];

export const roles = ["System administrator.", "Web developer.", "ISM student.", "Table tennis player.", "Dancer."];

export const experience = [
  {
    icon: "cap", title: "Rector's Scholarship", org: "University of Finance and Economics", period: "2026",
    short: "Awarded for academic achievement.",
    detail: "Received the University of Finance and Economics Rector's Scholarship for my academic achievements.",
  },
  {
    icon: "server", title: "System administrator", org: "M Bank", period: "2025 – 2026",
    short: "Looked after RHEL servers in the infrastructure department.",
    detail: "Worked on servers running RHEL and wrote the guide for upgrading their operating system from version 8 to 9. Responsible for patching vulnerabilities and keeping the servers' integrity intact.",
  },
  {
    icon: "router", title: "Assistant, tablet integrity", org: "Mexim Consulting", period: "2023 – 2025",
    short: "Responsible for the integrity of the company's tablets.",
    detail: "Responsible for the integrity and normal operation of the tablets — diagnosing and fixing freezes, software errors and connection problems. Also helped set up the LAN, configure routers and install equipment, keeping devices stable during exams.",
  },
  {
    icon: "cap", title: "Bachelor's student", org: "University of Finance and Economics", period: "2023 – now",
    short: "Information Systems Management, 4th year.",
    detail: "Studying Information Systems Management at UFE. Completed many projects in systems analysis, project management, programming and web development courses.",
  },
  {
    icon: "heart", title: "Volunteer", org: "Mongolian Red Cross Society", period: "2021 – 2022",
    short: "Helped vulnerable groups and the elderly.",
    detail: "Volunteered at the Mongolian Red Cross Society, helping vulnerable groups and elderly people in person.",
  },
];

export const techStack = [
  { name: "HTML", label: "5", color: "#e34f26" },
  { name: "CSS", label: "3", color: "#2965f1" },
  { name: "JavaScript", label: "JS", color: "#f7df1e", dark: true },
  { name: "React", label: "⚛", color: "#61dafb", dark: true },
  { name: "Supabase", label: "⚡", color: "#3ecf8e", dark: true },
  { name: "SQL", label: "SQL", color: "#8b5cf6" },
  { name: "C", label: "C", color: "#5c6bc0" },
  { name: "C#", label: "C#", color: "#9b4f96" },
  { name: "Linux (RHEL)", label: "🐧", color: "#ee0000" },
  { name: "Git", label: "git", color: "#f05032" },
  { name: "Vercel", label: "▲", color: "#ffffff", dark: true },
  { name: "Excel", label: "X", color: "#1d6f42" },
];

export const story = [
  { shape: "portrait", label: "My story", lines: ["I didn't start|with code.", "Scroll down to see where it began."] },
  { shape: "cross", label: "2021 · Red Cross", lines: ["It started|with helping.", "Helping the elderly and vulnerable groups in person — that's where my urge to solve problems came from."] },
  { shape: "ger", label: "2023 · UFE", lines: ["Then I decided|to learn systems.", "I became an Information Systems Management student and started studying how systems work."] },
  { shape: "network", label: "2023 – 2025 · Mexim Consulting", lines: ["Tablets, routers,|networks.", "I kept the company's tablets intact and brought every frozen device back to life. That's where I learned that reliable systems start with small things."] },
  { shape: "server", label: "2025 – 2026 · M Bank", lines: ["Then —|bank servers.", "I mapped out the upgrade path from RHEL 8 to 9 and looked after the servers' security."] },
  { shape: "code", label: "Now", lines: ["Still learning,|every day.", "Building sites like TORQUE and ISM Digital Museum — and learning something new each day."] },
  { shape: "paddle", label: "Beyond code", lines: ["Table tennis|and dance.", "A national table tennis medal and 1st place at Korea Open with my dance team. I like to work hard and compete outside of work too."] },
  { shape: "name_en", label: "I am", lines: ["Dulguun|Ganbold.", "System administrator · Information systems student · Ulaanbaatar."] },
];

export const nowBuilding = {
  projectId: "torque",
  cards: [
    {
      projectId: "torque", color: "#d7372b", shape: "gauge", status: "In development", building: true,
      steps: [
        { label: "Design, home page", state: "done" },
        { label: "Catalog, Drift / Off-road", state: "doing" },
        { label: "Cart, sign-in", state: "doing" },
        { label: "Vercel deploy", state: "todo" },
      ],
    },
    { projectId: "museum", color: "#2f4fd8", shape: "frames", status: "Web app · Live" },
    { projectId: "portfolio", color: "#ff6b3d", shape: "portrait", status: "Website · Live" },
  ],
};
