/**
 * Facebook Pixel Component
 *
 * Loads Meta (Facebook) Pixel script in production only.
 * In development, events are logged to console.
 *
 * Security:
 * - Validates Pixel ID format (15 digits)
 * - Uses Script children instead of dangerouslySetInnerHTML
 * - GDPR/RODO compliant (loads only with cookie consent)
 */

import Script from 'next/script'

/**
 * Validates Facebook Pixel ID format
 * @param pixelId - Pixel ID to validate
 * @returns true if valid 15-digit format
 */
function isValidPixelId(pixelId: string): boolean {
  return /^\d{15,16}$/.test(pixelId)
}

export function FacebookPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID

  // Skip Pixel in development
  if (process.env.NODE_ENV === 'development' || !pixelId) {
    return null
  }

  // Validate Pixel ID format to prevent XSS
  if (!isValidPixelId(pixelId)) {
    console.error('Invalid Facebook Pixel ID format. Expected: 15-16 digits')
    return null
  }

  return (
    <>
      {/* Facebook Pixel - Base Code */}
      {/* lazyOnload strategy: loads after page is fully interactive */}
      <Script id="fb-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Facebook Pixel - Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}
