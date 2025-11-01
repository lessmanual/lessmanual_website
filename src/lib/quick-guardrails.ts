/**
 * Quick Guardrails - Phase 1 Implementation
 *
 * Keyword-based pre-filter to block off-topic questions BEFORE sending to GPT-5-mini.
 * This provides instant rejection (<50ms) without API costs.
 *
 * Target: Block 80%+ of off-topic questions (recipes, weather, personal questions)
 *
 * @see docs/RAPORT_ARCHITEKTURA_CHATBOTA.md for full architecture
 */

/**
 * Off-topic keywords database
 * Organized by category for easy maintenance
 */
const OFF_TOPIC_KEYWORDS = {
  pl: {
    // Recipes & Food
    recipes: [
      'przepis na',
      'szarlotka',
      'szarlotk',
      'ugotuj',
      'ugotować',
      'upiecz',
      'upiec',
      'składniki do',
      'skladnik do',
      'ciasto',
      'pizza',
      'makaron',
      'zupa',
      'jak zrobić szarlotkę',
      'jak zrobić ciasto',
      'jak przyrządzić',
      'jak przygotować obiad',
      'jak przygotować kolację',
      'receptura',
      'gotowanie',
      'pieczenie'
    ],

    // Weather
    weather: [
      'pogoda',
      'temperatura',
      'temperatur',
      'słonecznie',
      'slonecz',
      'deszcz',
      'śnieg',
      'snieg',
      'wiatr',
      'prognoza pogody',
      'ile stopni',
      'czy pada',
      'czy bedzie padac',
      'jaka pogoda'
    ],

    // Personal questions (chatbot identity)
    personal: [
      'kim jesteś',
      'kim jestes',
      'ile masz lat',
      'skąd jesteś',
      'skad jestes',
      'co lubisz',
      'czy masz uczucia',
      'jaki jest twój',
      'jaki jest twoj',
      'twoje hobby',
      'czy jestes czlowiek',
      'czy jesteś człowiek'
    ],

    // General knowledge (NOT business-related)
    // NOTE: Be careful with "jak" - "jak chcę" and "jak mogę" are business questions!
    generalKnowledge: [
      'kto wynalazł',
      'kto wynalazl',
      'kiedy powstał',
      'kiedy powstal',
      'jak działa fotosynteza',
      'jak dziala fotosynteza',
      'jak działa komputer',
      'jak dziala komputer',
      'jak działa silnik',
      'jak dziala silnik',
      'definicja słowa',
      'definicja slowa',
      'znaczenie słowa',
      'znaczenie slowa',
      'historia polski',
      'historia świata',
      'historia swiata',
      'opowiedz mi o historii',
      'powiedz mi o historii',
      'wyjaśnij czym jest',
      'wyjasni czym jest',
      'encyklopedia',
      'wikipedia'
    ],

    // Entertainment
    entertainment: [
      'dowcip',
      'kawał',
      'kawal',
      'opowiedz dowcip',
      'żart',
      'zart',
      'zabawne',
      'śmieszne',
      'smieszne',
      'zagadka',
      'quiz',
      'gra'
    ],

    // Math & homework help
    math: [
      'rozwiąż równanie',
      'rozwiaz rownanie',
      'oblicz',
      'policz',
      'zadanie matematyczne',
      'zadanie z matematyki',
      'praca domowa',
      'homework',
      'ile to jest',
      'wynik działania',
      'wynik dzialania'
    ],

    // Programming help (unrelated to LessManual services)
    programming: [
      'jak napisać kod',
      'jak napisac kod',
      'błąd w kodzie',
      'blad w kodzie',
      'debug',
      'napisz funkcję',
      'napisz funkcje',
      'zrób program',
      'zrob program',
      'pomóż z kodem',
      'pomoz z kodem'
    ],

    // News & current events
    news: [
      'najnowsze wiadomości',
      'najnowsze wiadomosci',
      'co się dzieje',
      'co sie dzieje',
      'aktualności',
      'aktualnosci',
      'breaking news',
      'wyniki wyborów',
      'wyniki wyborow',
      'mecz',
      'sport'
    ]
  },

  en: {
    // Recipes & Food
    recipes: [
      'recipe',
      'cook',
      'bake',
      'ingredient',
      'how to make',
      'how to prepare',
      'pizza',
      'pasta',
      'cake',
      'soup',
      'cooking',
      'baking',
      'dish'
    ],

    // Weather
    weather: [
      'weather',
      'temperature',
      'sunny',
      'rain',
      'snow',
      'wind',
      'forecast',
      'degrees',
      'is it raining',
      'will it rain',
      'what\'s the weather'
    ],

    // Personal questions
    personal: [
      'who are you',
      'how old are you',
      'where are you from',
      'what do you like',
      'do you have feelings',
      'are you human',
      'what is your',
      'your hobby',
      'tell me about yourself'
    ],

    // General knowledge
    generalKnowledge: [
      'who invented',
      'when was',
      'what is',
      'how does',
      'definition',
      'meaning',
      'history of',
      'tell me about',
      'explain'
    ],

    // Entertainment
    entertainment: [
      'joke',
      'funny',
      'tell me a joke',
      'riddle',
      'quiz',
      'game',
      'story'
    ],

    // Math & homework
    math: [
      'solve equation',
      'calculate',
      'math problem',
      'homework',
      'what is the result',
      'compute'
    ],

    // Programming help
    programming: [
      'write code',
      'code error',
      'debug',
      'write function',
      'make program',
      'help with code'
    ],

    // News & current events
    news: [
      'latest news',
      'what\'s happening',
      'current events',
      'breaking news',
      'election results',
      'match',
      'sports'
    ]
  }
}

/**
 * Template responses for off-topic questions
 */
const OFF_TOPIC_RESPONSES = {
  pl: 'Przepraszam, odpowiadam tylko na pytania związane z LessManual.ai i automatyzacją biznesową. Jak mogę Ci pomóc w temacie naszych usług? 🤖',
  en: 'Sorry, I only answer questions related to LessManual.ai and business automation. How can I help you with our services? 🤖'
}

/**
 * Normalize text for keyword matching
 * - Convert to lowercase
 * - Remove Polish diacritics (ą→a, ę→e, etc.)
 * - Remove extra whitespace
 *
 * @param text - Text to normalize
 * @returns Normalized text
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
}

/**
 * Check if message is off-topic using keyword matching
 *
 * Performance: ~1-5ms (extremely fast, no API calls)
 * Accuracy: ~80-85% (catches most common off-topic questions)
 *
 * @param message - User message to check
 * @param locale - Language locale ('pl' | 'en')
 * @returns true if off-topic, false if potentially on-topic
 */
export function isOffTopic(message: string, locale: 'pl' | 'en' = 'pl'): boolean {
  const normalized = normalizeText(message)
  const keywords = OFF_TOPIC_KEYWORDS[locale]

  // Check each category
  for (const category of Object.values(keywords)) {
    for (const keyword of category) {
      if (normalized.includes(normalizeText(keyword))) {
        return true // OFF-TOPIC detected
      }
    }
  }

  return false // Potentially ON-TOPIC (proceed to next layer)
}

/**
 * Get template response for off-topic questions
 *
 * @param locale - Language locale ('pl' | 'en')
 * @returns Template response string
 */
export function getOffTopicResponse(locale: 'pl' | 'en' = 'pl'): string {
  return OFF_TOPIC_RESPONSES[locale]
}

/**
 * Main guardrail check function
 * Returns rejection response if off-topic, null if should proceed
 *
 * @param message - User message to check
 * @param locale - Language locale
 * @returns Rejection response or null
 */
export function checkGuardrails(
  message: string,
  locale: 'pl' | 'en' = 'pl'
): string | null {
  if (isOffTopic(message, locale)) {
    return getOffTopicResponse(locale)
  }

  return null // Pass to next layer (FAQ search or LLM)
}
