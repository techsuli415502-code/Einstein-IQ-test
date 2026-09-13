export const siteConfig = {
  name: "Einstein IQ Test",
  shortName: "Einstein IQ",
  domain: "einsteiniqtest.com",
  url: "https://einsteiniqtest.com",
  tagline: "Test Your IQ Online",
  description:
    "Take a free online IQ test with Einstein IQ Test. Practice logical reasoning, pattern recognition, problem solving, and analytical thinking through a quick cognitive skills quiz.",
  ogImage: "https://einsteiniqtest.com/og-image.svg",
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
