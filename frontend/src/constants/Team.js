export const categorizedTeam = [
  {
    category: "Core Team",
    members: [
      {
        name: "Uddipan Bhattacharjee",
        role: "Organizer",
        img: "/images/team/Uddu.png",
        linkedin: "https://www.linkedin.com/in/uddipan-bhattacharjee-95402b1ba/",
        instagram: "https://www.instagram.com/uddipxn._/",
      },
      {
        name: "Biswashreya Acharya",
        role: "Co-Organizer",
        img: "/images/team/biswashreya.jpeg",
      },
      {
        name: "Prarthana Borah",
        role: "Event Director",
        img: "/images/team/prarthana.jpeg",
      },
      {
        name: "Krishtina Ete",
        role: "Curation Team Leads",
        img: "/images/team/krishtina.jpeg",
      },
      {
        name: "Sandhya Genwali",
        role: "Content Curator & Hospitality Incharge",
        img: "/images/team/sandhya.jpeg",
      },
      {
        name: "Champak Changmai",
        role: "Speaker Curator",
        img: "/images/team/champak.jpeg",
      },

    ],
  },
  {
    category: "Media Team",
    members: [
      {
        name: "Maitreya Mayarong Dutta",
        role: "Designing Head",
        img: "/images/team/maya.jpeg",
      },
      {
        name: "Suman Malick",
        role: "Designing Head",
        img: "/images/team/suman.jpeg",
      },
      {
        name: "Rishava Kashyap Jyoti",
        role: "Designing Head",
        img: "/images/team/rishava.jpeg",
      },
      {
        name: "Bikash Deep Tinikuria",
        role: "Videography",
        img: "/images/team/bikash.jpeg",
      },
      {
        name: "Satyaprakash Nath",
        role: "Photo/Videography Head",
        img: "/images/team/satya.jpeg",
      },
    ],
  },
  {
    category: "Tech Team",
    members: [
      {
        name: "Parasar Kashyap",
        role: "Website Developer",
        img: "/images/team/parasar.jpeg",
      },
      {
        name: "Chingkheinganba Haobam",
        role: "Website Developer",
        img: "/images/team/chingkhei.jpeg",
      },
      {
        name: "Sanjeev",
        role: "Website Developer",
        img: "/images/team/sanjeev.jpeg",
      },
    ],
  },
];

// Keep original structure for backwards compatibility if needed elsewhere
export const Team = [
  ...categorizedTeam[0].members.map(m => ({ ...m, category: "NA" })),
  ...categorizedTeam[1].members.map(m => ({ ...m, category: "NA" })),
  ...categorizedTeam[2].members.map(m => ({ ...m, category: "NA" }))
];

export const Category = ["NA"];
export const Members = Team;

export default { categorizedTeam, Team, Category, Members };
