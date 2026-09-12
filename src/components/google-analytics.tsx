import Script from "next/script";

/**
 * Google Analytics (gtag.js) integration.
 *
 * Uses Next.js Script component with strategy="afterInteractive" so
 * the gtag.js library loads after the page is interactive (does not
 * block First Contentful Paint). The inline init script configures
 * the GA4 measurement ID and pushes the initial page_view event.
 *
 * The measurement ID is hardcoded below. To change it later, edit
 * this file or replace with an env variable (process.env.GA_ID).
 *
 * Google Analytics sets first-party cookies (_ga, _ga_<id>, _gid)
 * on the visitor's browser. See the Privacy Policy Cookies section
 * for what this means and how users can opt out.
 *
 * Measurement ID: G-SDZ836TS8D (Google Analytics 4 property).
 */

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SDZ836TS8D"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SDZ836TS8D', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
