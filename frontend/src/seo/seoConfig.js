const SITE_URL = "https://tedxnerist.com";
const SITE_NAME = "TEDxNERIST";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const EVENT_ID = `${SITE_URL}/#event`;
const VENUE_ID = `${SITE_URL}/#venue`;

const DEFAULT_IMAGE_PATH = "/images/thumbnail1.jpg";
const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
const NOINDEX_ROBOTS = "noindex,nofollow,noarchive,nosnippet";

const BASE_DESCRIPTION =
  "TEDxNERIST is an independently organized TEDx event at NERIST in Arunachal Pradesh. Explore the 2026 theme Metamorphosis, speakers, event details, team, and registration.";

const BASE_KEYWORDS = [
  "TEDxNERIST",
  "TEDx NERIST",
  "TEDx Arunachal Pradesh",
  "TEDx India",
  "Metamorphosis",
  "Ideas Worth Spreading",
  "NERIST event",
  "TEDx speakers",
  "TEDx registration",
];

const SOCIAL_LINKS = [
  "https://www.instagram.com/tedxnerist",
  "https://www.facebook.com/tedxnerist",
  "https://www.linkedin.com/company/tedxnerist/",
  "https://twitter.com/tedxnerist",
];

const venueAddress = {
  "@type": "PostalAddress",
  streetAddress:
    "Silver Jubilee Hall, North Eastern Regional Institute of Science and Technology",
  addressLocality: "Nirjuli",
  addressRegion: "Arunachal Pradesh",
  postalCode: "791109",
  addressCountry: "IN",
};

const venueGeo = {
  "@type": "GeoCoordinates",
  latitude: 27.124235,
  longitude: 93.740833,
};

const featuredSpeakers = [
  {
    name: "Aarzoo Shah",
    description: "Psychology entrepreneur and transformational speaker",
    image: "/images/speakers/arzoo.jpeg",
    url: "https://www.youtube.com/watch?v=LhTQUQEg5_M",
  },
  {
    name: "Aku Zeliang",
    description: "Sustainable designer and cultural innovator",
    image: "/images/speakers/aku.jpg",
    url: "https://www.youtube.com/watch?v=83aW3tDc5G0",
  },
  {
    name: "Eksha Kerung",
    description: "Police officer, athlete, and model",
    image: "/images/speakers/eksha.jpg",
    url: "https://www.youtube.com/watch?v=Btl7b-7cBw4",
  },
  {
    name: "Jarjum Ete",
    description: "Women's rights activist and social advocate",
    image: "/images/speakers/JE1.jpg",
    url: "https://youtube.com/watch?v=CUtqIppCxLQ",
  },
  {
    name: "Shivendra Pratap Singh Kanwar",
    description: "Special Forces veteran and leadership speaker",
    image: "/images/speakers/shivendar.jpg",
    url: `${SITE_URL}/speakers`,
  },
];

const featuredTeam = [
  {
    name: "Uddipan Bhattacharjee",
    role: "Organizer",
    image: "/images/team/Uddu.png",
    url: "https://www.linkedin.com/in/uddipan-bhattacharjee-95402b1ba/",
  },
  {
    name: "Biswashreya Acharya",
    role: "Co-Organizer",
    image: "/images/team/biswashreya.jpeg",
    url: `${SITE_URL}/team`,
  },
  {
    name: "Krishtina Ete",
    role: "Curation Team Lead",
    image: "/images/team/krishtina.jpeg",
    url: `${SITE_URL}/team`,
  },
  {
    name: "Sandhya Genwali",
    role: "Content Curator and Hospitality Incharge",
    image: "/images/team/sandhya.jpeg",
    url: `${SITE_URL}/team`,
  },
  {
    name: "Prarthana Borah",
    role: "Event Director",
    image: "/images/team/prarthana.jpeg",
    url: `${SITE_URL}/team`,
  },
  {
    name: "Parasar Kashyap",
    role: "Website Developer",
    image: "/images/team/parasar.jpeg",
    url: `${SITE_URL}/team`,
  },
];

const buildUrl = (path = "/") => {
  if (path === "/") {
    return `${SITE_URL}/`;
  }

  return new URL(path.replace(/\/+$/, ""), `${SITE_URL}/`).toString();
};

const toAbsoluteUrl = (value) => {
  if (!value) {
    return buildUrl(DEFAULT_IMAGE_PATH);
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return buildUrl(value);
};

const buildBreadcrumbSchema = (pageUrl, items) => ({
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: buildUrl(item.path),
  })),
});

const buildPageSchema = ({
  pageUrl,
  title,
  description,
  imageUrl,
  type = "WebPage",
  about,
  mainEntity,
}) => ({
  "@type": type,
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: title,
  description,
  inLanguage: "en-IN",
  isPartOf: { "@id": WEBSITE_ID },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: imageUrl,
  },
  breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  ...(about ? { about } : {}),
  ...(mainEntity ? { mainEntity } : {}),
});

const buildVenueSchema = () => ({
  "@type": "Place",
  "@id": VENUE_ID,
  name: "Silver Jubilee Hall, NERIST",
  address: venueAddress,
  geo: venueGeo,
  url: buildUrl("/contact"),
});

const buildEventSchema = (imageUrl) => ({
  "@type": "Event",
  "@id": EVENT_ID,
  name: "TEDxNERIST 2026: Metamorphosis",
  alternateName: "TEDxNERIST",
  description:
    "TEDxNERIST 2026 brings thinkers, artists, innovators, and changemakers to NERIST for a day of talks and performances built around the theme Metamorphosis.",
  url: buildUrl("/"),
  image: [imageUrl],
  startDate: "2026-04-11",
  endDate: "2026-04-11",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "en-IN",
  location: { "@id": VENUE_ID },
  organizer: { "@id": ORGANIZATION_ID },
  keywords: ["TEDxNERIST", "Metamorphosis", "Ideas Worth Spreading"],
});

const buildSpeakerListSchema = () => ({
  "@type": "ItemList",
  name: "TEDxNERIST past speakers",
  numberOfItems: featuredSpeakers.length,
  itemListElement: featuredSpeakers.map((speaker, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Person",
      name: speaker.name,
      description: speaker.description,
      image: toAbsoluteUrl(speaker.image),
      url: speaker.url,
    },
  })),
});

const buildTeamListSchema = () => ({
  "@type": "ItemList",
  name: "TEDxNERIST organizing team",
  numberOfItems: featuredTeam.length,
  itemListElement: featuredTeam.map((member, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      image: toAbsoluteUrl(member.image),
      url: member.url,
    },
  })),
});

export const baseStructuredData = [
  {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: buildUrl("/logo.png"),
    },
    email: "tedx@nerist.ac.in",
    sameAs: SOCIAL_LINKS,
    address: venueAddress,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "event support",
        email: "tedx@nerist.ac.in",
        telephone: "+91-88220-78464",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "TEDx",
      url: "https://www.ted.com/tedx",
    },
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: BASE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": ORGANIZATION_ID },
  },
];

const routeDefinitions = {
  "/": {
    title: "TEDxNERIST 2026 | Metamorphosis | Ideas Worth Spreading",
    description:
      "Join TEDxNERIST 2026 at Silver Jubilee Hall, NERIST in Arunachal Pradesh. Explore the Metamorphosis theme, event details, speakers, and registration.",
    keywords: [
      ...BASE_KEYWORDS,
      "TEDxNERIST 2026",
      "Metamorphosis theme",
      "Silver Jubilee Hall NERIST",
    ],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [{ name: "Home", path: "/" }]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
        about: { "@id": EVENT_ID },
      }),
      buildVenueSchema(),
      buildEventSchema(imageUrl),
    ],
  },
  "/about": {
    title: "About TEDxNERIST | Local Voices, Global Ideas",
    description:
      "Learn what TEDxNERIST stands for, how it connects local voices with global ideas, and why the Metamorphosis edition matters for NERIST and the wider Northeast.",
    keywords: [...BASE_KEYWORDS, "About TEDxNERIST", "TEDx event at NERIST"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
        type: "AboutPage",
        about: { "@id": ORGANIZATION_ID },
      }),
    ],
  },
  "/contact": {
    title: "Contact TEDxNERIST | Event Support and Partnerships",
    description:
      "Contact TEDxNERIST for event questions, partnerships, and attendee support. Find the venue details, email, phone number, and location at NERIST, Nirjuli.",
    keywords: [...BASE_KEYWORDS, "Contact TEDxNERIST", "TEDxNERIST support"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
        type: "ContactPage",
        mainEntity: { "@id": VENUE_ID },
      }),
      buildVenueSchema(),
    ],
  },
  "/speakers": {
    title: "Past Speakers | TEDxNERIST",
    description:
      "Meet the past TEDxNERIST speakers who brought ideas, lived experience, and bold perspectives to the stage across design, leadership, activism, and human potential.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST speakers", "Past TEDxNERIST talks"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => {
      const speakerList = buildSpeakerListSchema();

      return [
        buildBreadcrumbSchema(pageUrl, [
          { name: "Home", path: "/" },
          { name: "Speakers", path: "/speakers" },
        ]),
        buildPageSchema({
          pageUrl,
          title,
          description,
          imageUrl,
          type: "CollectionPage",
          mainEntity: speakerList,
        }),
      ];
    },
  },
  "/team": {
    title: "Organizing Team | TEDxNERIST",
    description:
      "Meet the student-led TEDxNERIST organizing team behind the event, from curation and content to media, technology, and stage direction.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST team", "TEDx organizers"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => {
      const teamList = buildTeamListSchema();

      return [
        buildBreadcrumbSchema(pageUrl, [
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ]),
        buildPageSchema({
          pageUrl,
          title,
          description,
          imageUrl,
          type: "CollectionPage",
          mainEntity: teamList,
        }),
      ];
    },
  },
  "/register": {
    title: "Register for TEDxNERIST 2026",
    description:
      "Reserve your place at TEDxNERIST 2026. Register online to attend the Metamorphosis edition at Silver Jubilee Hall, NERIST.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST registration", "Register for TEDxNERIST"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "Register", path: "/register" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
        about: { "@id": EVENT_ID },
      }),
      buildVenueSchema(),
      buildEventSchema(imageUrl),
    ],
  },
  "/policy": {
    title: "Privacy Policy | TEDxNERIST",
    description:
      "Read the TEDxNERIST privacy policy to understand how attendee and registration information is collected, used, and protected.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST privacy policy"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "Privacy Policy", path: "/policy" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
      }),
    ],
  },
  "/refund": {
    title: "Refund Policy | TEDxNERIST",
    description:
      "Read the TEDxNERIST refund policy for ticketing and event purchase terms related to cancellations, exchanges, and attendee requests.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST refund policy"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "Refund Policy", path: "/refund" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
      }),
    ],
  },
  "/term": {
    title: "Terms and Conditions | TEDxNERIST",
    description:
      "Review the TEDxNERIST terms and conditions covering website use, registrations, attendee responsibilities, and service policies.",
    keywords: [...BASE_KEYWORDS, "TEDxNERIST terms and conditions"],
    buildGraph: ({ pageUrl, imageUrl, title, description }) => [
      buildBreadcrumbSchema(pageUrl, [
        { name: "Home", path: "/" },
        { name: "Terms and Conditions", path: "/term" },
      ]),
      buildPageSchema({
        pageUrl,
        title,
        description,
        imageUrl,
      }),
    ],
  },
  "/feedback": {
    title: "Feedback | TEDxNERIST",
    description: "Share post-event feedback with the TEDxNERIST team.",
    robots: NOINDEX_ROBOTS,
    buildGraph: () => [],
  },
};

const notFoundDefinition = {
  title: "Page Not Found | TEDxNERIST",
  description:
    "The page you were looking for could not be found on the TEDxNERIST website.",
  robots: NOINDEX_ROBOTS,
  buildGraph: () => [],
};

const adminDefinition = {
  title: "Admin | TEDxNERIST",
  description: "Restricted TEDxNERIST administration area.",
  robots: NOINDEX_ROBOTS,
  buildGraph: () => [],
};

export const getSeoForPath = (pathname) => {
  const normalizedPath =
    pathname && pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";

  if (normalizedPath.startsWith("/admin")) {
    const pageUrl = buildUrl(normalizedPath);
    const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH);

    return {
      ...adminDefinition,
      pageUrl,
      imageUrl,
      canonicalUrl: pageUrl,
      openGraphType: "website",
      keywords: BASE_KEYWORDS,
      robots: adminDefinition.robots,
      graph: [],
    };
  }

  const isKnownRoute = Boolean(routeDefinitions[normalizedPath]);
  const route = routeDefinitions[normalizedPath] || notFoundDefinition;
  const pageUrl = buildUrl(normalizedPath);
  const imageUrl = toAbsoluteUrl(DEFAULT_IMAGE_PATH);
  const title = route.title;
  const description = route.description || BASE_DESCRIPTION;
  const canonicalUrl = isKnownRoute ? pageUrl : buildUrl("/");

  return {
    title,
    description,
    robots: route.robots || DEFAULT_ROBOTS,
    canonicalUrl,
    pageUrl,
    imageUrl,
    imageAlt: `${SITE_NAME} preview image`,
    openGraphType: route.openGraphType || "website",
    keywords: route.keywords || BASE_KEYWORDS,
    graph: route.buildGraph
      ? route.buildGraph({ pageUrl, imageUrl, title, description })
      : [],
  };
};

export {
  BASE_DESCRIPTION,
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL,
};
