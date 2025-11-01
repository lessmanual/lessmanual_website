/**
 * Test Chatbot Fixes
 *
 * Tests the problematic queries from the user's conversation to verify fixes work.
 */

interface TestCase {
  query: string;
  expectedBehavior: string;
  shouldContain?: string[];
  shouldNotContain?: string[];
}

const testCases: TestCase[] = [
  {
    query: "ile to kosztuje",
    expectedBehavior: "Should return FAQ answer about pricing philosophy and ROI",
    shouldContain: ["ROI", "złożoności projektu", "3000-8000"]
  },
  {
    query: "a tak mniej więcej? widełki?",
    expectedBehavior: "Should recognize 'widełki' as price range and give specific numbers",
    shouldContain: ["3000-8000", "PLN", "ChatBot", "Voice Agent"],
    shouldNotContain: ["odpowiadam tylko na pytania związane"]
  },
  {
    query: "a jak chcę zautomatyzować wysyłkę fv do ksef to mi to zrobicie",
    expectedBehavior: "Should give specific answer about KSeF integration",
    shouldContain: ["KSeF", "faktury", "API", "Wfirma", "Fakturownia"],
    shouldNotContain: ["odpowiadam tylko na pytania związane"]
  },
  {
    query: "a jak chcę kilka automatyzacji to dostanę rabat?",
    expectedBehavior: "Should give specific answer about discounts for multiple services",
    shouldContain: ["rabat", "10%", "15%", "pakiet"],
    shouldNotContain: ["Nie.", "odpowiadam tylko na pytania związane"]
  },
  {
    query: "jak zrobić szarlotkę",
    expectedBehavior: "Should block recipe question (off-topic)",
    shouldContain: ["odpowiadam tylko na pytania związane", "LessManual"]
  }
];

async function testChatbot(query: string): Promise<string> {
  const response = await fetch('http://localhost:3004/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: query,
      sessionId: 'test-session',
      locale: 'pl'
    })
  });

  const data = await response.json();
  return data.response;
}

async function runTests() {
  console.log('🧪 Testing Chatbot Fixes\n');
  console.log('='.repeat(80) + '\n');

  let passCount = 0;
  let failCount = 0;

  for (const [index, testCase] of testCases.entries()) {
    console.log(`Test ${index + 1}/${testCases.length}: "${testCase.query}"`);
    console.log(`Expected: ${testCase.expectedBehavior}`);

    try {
      const response = await testChatbot(testCase.query);
      console.log(`\nResponse:\n${response}\n`);

      let passed = true;
      const issues: string[] = [];

      // Check shouldContain
      if (testCase.shouldContain) {
        for (const keyword of testCase.shouldContain) {
          if (!response.toLowerCase().includes(keyword.toLowerCase())) {
            passed = false;
            issues.push(`❌ Missing keyword: "${keyword}"`);
          }
        }
      }

      // Check shouldNotContain
      if (testCase.shouldNotContain) {
        for (const keyword of testCase.shouldNotContain) {
          if (response.toLowerCase().includes(keyword.toLowerCase())) {
            passed = false;
            issues.push(`❌ Should NOT contain: "${keyword}"`);
          }
        }
      }

      if (passed) {
        console.log('✅ PASS\n');
        passCount++;
      } else {
        console.log('❌ FAIL');
        issues.forEach(issue => console.log(`   ${issue}`));
        console.log('');
        failCount++;
      }
    } catch (error) {
      console.log(`❌ ERROR: ${error}\n`);
      failCount++;
    }

    console.log('-'.repeat(80) + '\n');

    // Rate limit: wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('='.repeat(80));
  console.log(`\n📊 Results: ${passCount} passed, ${failCount} failed\n`);

  if (failCount === 0) {
    console.log('✨ All tests passed! Chatbot fixes are working correctly.\n');
  } else {
    console.log('⚠️  Some tests failed. Review the output above for details.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
