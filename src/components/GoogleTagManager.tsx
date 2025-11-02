/**
 * Google Tag Manager Component
 *
 * Loads GTM script in production only.
 * In development, events are logged to console.
 *
 * Security:
 * - Validates GTM ID format (GTM-XXXXXXX)
 * - Uses Script children instead of dangerouslySetInnerHTML
 */

import Script from 'next/script'

/**
 * Validates Google Tag Manager ID format
 * @param gtmId - GTM ID to validate
 * @returns true if valid GTM-XXXXXXX format
 */
function isValidGTMId(gtmId: string): boolean {
  return /^GTM-[A-Z0-9]+$/.test(gtmId)
}

export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  // Skip GTM in development
  if (process.env.NODE_ENV === 'development' || !gtmId) {
    return null
  }

  // Validate GTM ID format to prevent XSS
  if (!isValidGTMId(gtmId)) {
    console.error('Invalid GTM ID format. Expected: GTM-XXXXXXX')
    return null
  }

  return (
    <>
      {/* Google Tag Manager - Head */}
      {/* Changed from afterInteractive to lazyOnload for better performance */}
      {/* GTM will load after page is fully interactive, not blocking initial render */}
      <Script id="gtm-script" strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>

      {/* Google Tag Manager - Body (noscript fallback) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
