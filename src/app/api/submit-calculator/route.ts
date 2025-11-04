import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route: Submit ROI Calculator Lead
 *
 * Proxies calculator form submissions to n8n webhooks.
 * Handles CORS and authentication server-side.
 */

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const payload = await request.json()

    // Select webhook based on language
    const locale = payload.locale || 'pl' // Default to Polish

    // ✅ SECURITY FIX: Use environment variables for webhook URLs
    const webhookUrl = locale === 'en'
      ? process.env.N8N_WEBHOOK_URL_EN
      : process.env.N8N_WEBHOOK_URL_PL

    // ✅ SECURITY FIX: Server-side only credentials (no NEXT_PUBLIC_ prefix)
    const webhookUsername = process.env.N8N_WEBHOOK_USERNAME
    const webhookPassword = process.env.N8N_WEBHOOK_PASSWORD

    if (!webhookUrl || !webhookUsername || !webhookPassword) {
      console.error('❌ Missing webhook configuration:', {
        hasUrl: !!webhookUrl,
        hasUsername: !!webhookUsername,
        hasPassword: !!webhookPassword,
        locale
      })
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    // Prepare Basic Auth header
    const credentials = Buffer.from(`${webhookUsername}:${webhookPassword}`).toString('base64')
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    }

    console.log(`📤 Sending to ${locale === 'en' ? 'EN' : 'PL'} webhook:`, webhookUrl)
    console.log('📦 Payload:', JSON.stringify(payload, null, 2))

    // Send to production webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Production webhook error:', response.status, errorText)
      return NextResponse.json(
        {
          error: 'Webhook failed',
          status: response.status,
          details: errorText
        },
        { status: 502 }
      )
    }

    const result = await response.json()
    console.log('✅ Production webhook success:', result)

    // Return success
    return NextResponse.json({
      success: true,
      webhookResponse: result
    })

  } catch (error) {
    console.error('❌ API route error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
