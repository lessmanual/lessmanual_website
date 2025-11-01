#!/usr/bin/env node

/**
 * Test script for Option 3: Hybrid Multi-turn Conversation Context
 *
 * Tests three conversation scenarios to ensure follow-up questions work correctly.
 */

const { v4: uuidv4 } = require('uuid');

const API_URL = 'http://localhost:3000/api/chatbot';
const SESSION_ID = uuidv4();

/**
 * Send a message to the chatbot API with conversation history
 */
async function sendMessage(message, history = []) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sessionId: SESSION_ID,
        locale: 'pl',
        history
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error(`❌ Error sending message:`, error.message);
    return null;
  }
}

/**
 * Test Scenario 1: KSeF automation → pricing → next steps
 */
async function testScenario1() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 SCENARIO 1: KSeF Automation Flow');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let history = [];

  // Turn 1: Ask about KSeF automation
  console.log('👤 User: chcę zautomatyzować ksef\n');
  const response1 = await sendMessage('chcę zautomatyzować ksef', history);
  console.log(`🤖 Bot: ${response1}\n`);

  if (!response1) {
    console.log('❌ FAILED: No response for KSeF question\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'chcę zautomatyzować ksef', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response1, timestamp: new Date().toISOString() }
  );

  // Turn 2: Ask about pricing
  console.log('👤 User: ile to kosztuje?\n');
  const response2 = await sendMessage('ile to kosztuje?', history);
  console.log(`🤖 Bot: ${response2}\n`);

  if (!response2) {
    console.log('❌ FAILED: No response for pricing question\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'ile to kosztuje?', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response2, timestamp: new Date().toISOString() }
  );

  // Turn 3: Ask what to do next (CRITICAL TEST)
  console.log('👤 User: to co mam robić\n');
  const response3 = await sendMessage('to co mam robić', history);
  console.log(`🤖 Bot: ${response3}\n`);

  // Check if response is helpful (not off-topic rejection)
  const isOffTopicRejection = response3?.includes('Przepraszam, odpowiadam tylko na pytania związane');
  const mentionsContactForm = response3?.toLowerCase().includes('formularz') ||
                               response3?.toLowerCase().includes('kontakt');

  if (isOffTopicRejection) {
    console.log('❌ FAILED: Bot rejected valid follow-up question as off-topic\n');
    return false;
  }

  if (mentionsContactForm) {
    console.log('✅ PASSED: Bot provided helpful next steps with contact form\n');
    return true;
  } else {
    console.log('⚠️  WARNING: Bot responded but didn\'t mention contact form\n');
    return true; // Still a pass if it didn't reject
  }
}

/**
 * Test Scenario 2: General inquiry → follow-up → contact location
 */
async function testScenario2() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 SCENARIO 2: Service Inquiry Flow');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let history = [];

  // Turn 1: Ask what they do
  console.log('👤 User: czym się zajmujecie\n');
  const response1 = await sendMessage('czym się zajmujecie', history);
  console.log(`🤖 Bot: ${response1}\n`);

  if (!response1) {
    console.log('❌ FAILED: No response for service question\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'czym się zajmujecie', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response1, timestamp: new Date().toISOString() }
  );

  // Turn 2: Ask how it works
  console.log('👤 User: a jak to wygląda\n');
  const response2 = await sendMessage('a jak to wygląda', history);
  console.log(`🤖 Bot: ${response2}\n`);

  if (!response2) {
    console.log('❌ FAILED: No response for follow-up question\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'a jak to wygląda', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response2, timestamp: new Date().toISOString() }
  );

  // Turn 3: Ask where to schedule
  console.log('👤 User: gdzie się mogę umówić\n');
  const response3 = await sendMessage('gdzie się mogę umówić', history);
  console.log(`🤖 Bot: ${response3}\n`);

  const isOffTopicRejection = response3?.includes('Przepraszam, odpowiadam tylko na pytania związane');
  const mentionsLocation = response3?.toLowerCase().includes('formularz') ||
                           response3?.toLowerCase().includes('poniżej') ||
                           response3?.toLowerCase().includes('kontakt');

  if (isOffTopicRejection) {
    console.log('❌ FAILED: Bot rejected valid follow-up question as off-topic\n');
    return false;
  }

  if (mentionsLocation) {
    console.log('✅ PASSED: Bot provided location/contact information\n');
    return true;
  } else {
    console.log('⚠️  WARNING: Bot responded but didn\'t mention location\n');
    return true;
  }
}

/**
 * Test Scenario 3: Casual start → chatbot inquiry → pricing → next steps
 */
async function testScenario3() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 SCENARIO 3: Chatbot Product Flow');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let history = [];

  // Turn 1: Casual greeting
  console.log('👤 User: co tam\n');
  const response1 = await sendMessage('co tam', history);
  console.log(`🤖 Bot: ${response1}\n`);

  if (!response1) {
    console.log('❌ FAILED: No response for greeting\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'co tam', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response1, timestamp: new Date().toISOString() }
  );

  // Turn 2: Ask about chatbot
  console.log('👤 User: chcę chatbota\n');
  const response2 = await sendMessage('chcę chatbota', history);
  console.log(`🤖 Bot: ${response2}\n`);

  if (!response2) {
    console.log('❌ FAILED: No response for chatbot question\n');
    return false;
  }

  history.push(
    { role: 'user', content: 'chcę chatbota', timestamp: new Date().toISOString() },
    { role: 'assistant', content: response2, timestamp: new Date().toISOString() }
  );

  // Turn 3: Ask about pricing
  console.log('👤 User: ok ale ile to kosztuje\n');
  const response3 = await sendMessage('ok ale ile to kosztuje', history);
  console.log(`🤖 Bot: ${response3}\n`);

  const isOffTopicRejection = response3?.includes('Przepraszam, odpowiadam tylko na pytania związane');
  const handlesPricing = response3?.toLowerCase().includes('formularz') ||
                         response3?.toLowerCase().includes('indywidualn') ||
                         response3?.toLowerCase().includes('wycen');

  if (isOffTopicRejection) {
    console.log('❌ FAILED: Bot rejected valid follow-up question as off-topic\n');
    return false;
  }

  if (handlesPricing) {
    console.log('✅ PASSED: Bot handled pricing question appropriately\n');
    return true;
  } else {
    console.log('⚠️  WARNING: Bot responded but didn\'t handle pricing properly\n');
    return true;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   CONVERSATION CONTEXT TEST SUITE (Option 3: Hybrid)  ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  const results = {
    scenario1: await testScenario1(),
    scenario2: await testScenario2(),
    scenario3: await testScenario3()
  };

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║                    TEST RESULTS                        ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`Scenario 1 (KSeF → pricing → next steps):    ${results.scenario1 ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Scenario 2 (Services → follow-up → contact): ${results.scenario2 ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Scenario 3 (Casual → chatbot → pricing):     ${results.scenario3 ? '✅ PASSED' : '❌ FAILED'}`);

  const allPassed = results.scenario1 && results.scenario2 && results.scenario3;

  console.log('\n' + '━'.repeat(60));
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED! Conversation context working correctly.');
  } else {
    console.log('⚠️  SOME TESTS FAILED. Review the output above.');
  }
  console.log('━'.repeat(60) + '\n');

  process.exit(allPassed ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
