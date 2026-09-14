// The canonical URL of the website. Update this when you move to a
// different production domain. The current value points to the live
// Vercel deployment, which is the URL Google should index.
//
// IMPORTANT: the canonical URL must match the URL that actually serves
// the Next.js site. If you point this at a domain that serves different
// content (for example, a parked domain or a different hosting
// provider), Google will index that other content instead of this
// Vercel deployment, and the title in Google search results will not
// match the title rendered by this Next.js app.
//
// To switch the canonical to your custom domain (einsteiniqtest.com),
// first add the domain to your Vercel project:
//   vercel domains add einsteiniqtest.com
// then update DNS to point to Vercel, then change the values below.
export const siteConfig = {
  name: "Einstein IQ Test",
  shortName: "Einstein IQ",
  domain: "einsteiniqtest.vercel.app",
  url: "https://einsteiniqtest.vercel.app",
  tagline: "Test Your IQ Online",
  description:
    "Take a free online IQ test with Einstein IQ Test. Practice logical reasoning, pattern recognition, problem solving, and analytical thinking through a quick cognitive skills quiz.",
  // PNG OG image (1200x630) for Google search features and social sharing.
  // SVG is supported by some platforms but PNG is universally accepted.
  ogImage: "https://einsteiniqtest.vercel.app/og-image.png",
  // Square logo used in Organization structured data (schema.org).
  // Google uses this for the small logo next to the URL in search results
  // and for the knowledge panel. Must be a PNG/JPG, at least 112x112
  // (Google recommends 512x512).
  logo: "https://einsteiniqtest.vercel.app/android-chrome-512x512.png",
  logoSvg: "https://einsteiniqtest.vercel.app/logo.svg",
  twitter: "@einsteiniqtest",
  author: "Einstein IQ Test Team",
  contactEmail: "techsuli415502@gmail.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
} as const;

// Author profile used across the site for E-E-A-T signals.
// Jacob Moses is presented only as a Content Specialist. He is not
// claimed to be a licensed psychologist, doctor, scientist, researcher,
// or any other credentialed professional. The bio is written in first
// person ("I", "my", "me") so it reads naturally on the author card
// and avoids unsupported credentials, fake reviews, or exaggerated
// expertise.
export const authorProfile = {
  name: "Jacob Moses",
  role: "Content Specialist",
  // First-person bio (used on the author card and About page).
  bio: "Hi, I'm Jacob Moses, a Content Specialist focused on creating clear, useful, and engaging online content. I enjoy researching topics, organizing information, and turning complex ideas into simple, easy-to-understand content. My goal is to give readers helpful information and a better experience every time they visit this site. I work on the quiz questions, educational sections, and help articles here at Einstein IQ Test, and I review each piece carefully to make sure it is accurate and easy to follow.",
  shortBio:
    "Hi, I'm Jacob Moses, a Content Specialist focused on creating clear, useful, and engaging online content. I research topics carefully and present information in a simple, reader-friendly way.",
  // SVG initials avatar (no real photo, no fake face). Uses the brand
  // emerald color so the avatar feels native to the site design.
  avatar: "/author-jacob-moses.svg",
  // The author does not have public social profiles we can verify,
  // so we leave sameAs empty instead of inventing fake links.
  sameAs: [] as string[],
} as const;

export type AuthorProfile = typeof authorProfile;

export type SiteConfig = typeof siteConfig;
