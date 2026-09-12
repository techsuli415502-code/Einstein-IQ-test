/* eslint-disable @next/next/next-script-for-ga */
// We intentionally use raw <script> tags instead of the @next/third-parties
// GoogleAnalytics component because Google Search Console site verification
// requires the GA snippet to be in the <head>. The official
// @next/third-parties/google GoogleAnalytics component uses afterInteractive
// strategy which places the script in the <body>, which fails verification.

/**
 * Google Analytics (gtag.js) integration.
 *
 * This component renders inline <script> tags directly inside the
 * document <head> (via the layout's <head> element in layout.tsx).
 * Placing the snippet in <head> is required by Google Search
 * Console for site ownership verification using the GA tracking
 * snippet.
 *
 * The script is loaded with the async attribute so it does not
 * block the page from rendering. The inline init script runs
 * after the gtag.js library finishes loading and pushes the
 * initial page_view event to GA4.
 *
 * Trade-off: putting GA in the <head> is slightly less optimal
 * for performance than loading it lazily in the body, but we
 * accept this trade-off because site verification requires the
 * snippet to be in the <head>.
 *
 * Google Analytics sets first-party cookies (_ga, _ga_<id>, _gid)
 * on the visitor's browser. See the Privacy Policy Cookies section
 * for what this means and how users can opt out.
 *
 * Measurement ID: G-SDZ836TS8D (Google Analytics 4 property).
 */

export function GoogleAnalyticsHead() {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-SDZ836TS8D"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SDZ836TS8D', {
              anonymize_ip: true
            });
          `,
        }}
      />
    </>
  );
}
