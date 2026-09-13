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
  ogImage: "https://einsteiniqtest.vercel.app/og-image.svg",
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

export type SiteConfig = typeof siteConfig;
