/**
 * Analytics Utilities
 *
 * Google Tag Manager & GA4 event tracking for ROI Calculator.
 *
 * Events tracked:
 * - product_selected: User selects product in Step 1
 * - step_completed: User completes Step 2 and clicks "Calculate ROI"
 * - results_viewed: User views results in Step 3
 * - lead_captured: User submits contact form
 */

// Extend Window interface for GTM dataLayer and Facebook Pixel
declare global {
  interface Window {
    dataLayer?: any[]
    fbq?: (action: string, event: string, params?: Record<string, any>) => void
  }
}

/**
 * Push event to GTM dataLayer and Facebook Pixel
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined') return

  // Push to GTM dataLayer
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...eventParams
  })

  // Push to Facebook Pixel (if loaded)
  if (window.fbq) {
    // Map event names to Facebook standard events where possible
    const fbEventMap: Record<string, string> = {
      'lead_captured': 'Lead',
      'demo_booking_started': 'InitiateCheckout',
      'demo_booking_completed': 'Schedule',
      'contact_form_submitted': 'Contact',
      'product_selected': 'ViewContent',
      'results_viewed': 'ViewContent',
      'quiz_completed': 'CompleteRegistration',
    }

    const fbEventName = fbEventMap[eventName] || eventName
    window.fbq('track', fbEventName, eventParams)
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventParams)
  }
}

/**
 * Track product selection (Step 1)
 */
export function trackProductSelected(productId: string, productName: string) {
  trackEvent('product_selected', {
    product_id: productId,
    product_name: productName,
    calculator_step: 1
  })
}

/**
 * Track step completion (Step 2 → Step 3)
 */
export function trackStepCompleted(productId: string, stepNumber: number) {
  trackEvent('step_completed', {
    product_id: productId,
    calculator_step: stepNumber
  })
}

/**
 * Track results viewed (Step 3)
 */
export function trackResultsViewed(
  productId: string,
  savingsMonth: number,
  savingsYear: number,
  roi: number
) {
  trackEvent('results_viewed', {
    product_id: productId,
    calculator_step: 3,
    monthly_savings: savingsMonth,
    yearly_savings: savingsYear,
    roi_percent: roi,
    currency: 'PLN'
  })
}

/**
 * Track lead capture (Form submission)
 */
export function trackLeadCaptured(
  productId: string,
  email: string,
  phone: string,
  companyName?: string
) {
  trackEvent('lead_captured', {
    product_id: productId,
    calculator_step: 3,
    has_email: !!email,
    has_phone: !!phone,
    has_company: !!companyName,
    // Don't send actual PII to analytics for privacy
    lead_source: 'roi_calculator'
  })
}

/**
 * Track preset usage
 */
export function trackPresetUsed(productId: string, presetName: string) {
  trackEvent('preset_used', {
    product_id: productId,
    preset_name: presetName,
    calculator_step: 2
  })
}

/**
 * Track quiz completion
 */
export function trackQuizCompleted(
  recommendedProduct: string,
  industry: string,
  problem: string,
  companySize: string
) {
  trackEvent('quiz_completed', {
    recommended_product: recommendedProduct,
    industry: industry,
    problem: problem,
    company_size: companySize
  })
}
