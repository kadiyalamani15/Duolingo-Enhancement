import { CultureCapsuleData } from '../components/CultureCapsule';

// Spanish Culture Capsules - Rich cultural context for Spanish learners
export const spanishCultureCapsules: CultureCapsuleData[] = [
  {
    id: 'vale-spain',
    title: 'Why Spaniards Say "Vale" Constantly',
    emoji: '👍',
    category: 'slang',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: '"Vale" is the Swiss Army knife of Spanish words! It means "okay," "sure," "got it," "sounds good," and even "bye." Spaniards use it to agree, confirm, or just fill conversation gaps.',
    example: {
      phrase: '¿Quedamos a las 8? —Vale, vale.',
      translation: 'Meet at 8? —Okay, okay.',
      context: 'Used when agreeing to plans with friends',
    },
    funFact: 'In a single phone call, a Spaniard might say "vale" up to 20 times! It\'s basically verbal punctuation.',
    tipEmoji: '💡',
  },
  {
    id: 'sobremesa',
    title: 'Sobremesa: The Art of Lingering',
    emoji: '☕',
    category: 'tradition',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: '"Sobremesa" is the cherished Spanish tradition of staying at the table after a meal to chat, digest, and enjoy company. It can last hours! Leaving immediately after eating is considered rude.',
    example: {
      phrase: 'La sobremesa duró tres horas.',
      translation: 'The after-meal chat lasted three hours.',
      context: 'Typical Sunday family lunch in Spain',
    },
    funFact: 'There\'s no direct English translation for "sobremesa" — it\'s uniquely Spanish! This shows how central this ritual is to their culture.',
    tipEmoji: '🍷',
  },
  {
    id: 'two-kisses',
    title: 'Dos Besos: The Two-Kiss Greeting',
    emoji: '💋',
    category: 'gesture',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: 'In Spain, greeting someone with two kisses on the cheeks (right cheek first!) is standard between friends, family, and even new acquaintances. A handshake alone can feel cold or overly formal.',
    example: {
      phrase: '¡Hola! ¿Qué tal?',
      translation: 'Hi! How are you?',
      context: 'Said while giving two air kisses',
    },
    funFact: 'In Argentina it\'s just ONE kiss, and in some parts of France it\'s THREE or even FOUR! Always watch the locals first.',
    tipEmoji: '😘',
  },
  {
    id: 'vos-argentina',
    title: 'Vos: Argentina\'s Special "You"',
    emoji: '🇦🇷',
    category: 'dialect',
    country: 'Argentina',
    countryFlag: '🇦🇷',
    content: 'Forget "tú"! In Argentina, Uruguay, and parts of Central America, people use "vos" instead. It comes with its own verb conjugations: "tú tienes" becomes "vos tenés."',
    example: {
      phrase: '¿Vos querés un mate?',
      translation: 'Do you want some mate tea?',
      context: 'Casual offer between friends in Buenos Aires',
    },
    funFact: '"Voseo" dates back to colonial Spanish and was once used in Spain too. Argentina kept it while Spain moved on to "tú."',
    tipEmoji: '🧉',
  },
  {
    id: 'spanish-timing',
    title: 'Spanish Time is... Flexible',
    emoji: '⏰',
    category: 'etiquette',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: 'If a Spaniard says "ahora" (now), it might mean "in a bit." "Luego" (later) could mean "never." And arriving 15-30 minutes late to social events is perfectly normal—even expected!',
    example: {
      phrase: 'Vengo ahora mismo.',
      translation: 'I\'m coming right now.',
      context: 'Reality: They\'ll arrive in 20 minutes',
    },
    funFact: 'Business meetings start on time, but social dinners? A 9 PM invitation means people arrive at 9:30. Showing up "on time" might mean you\'re the only one there!',
    tipEmoji: '😅',
  },
  {
    id: 'tio-tia',
    title: 'Tío/Tía: Not Just Your Uncle',
    emoji: '🤙',
    category: 'slang',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: 'While "tío/tía" literally means uncle/aunt, Spaniards use it constantly to mean "dude," "mate," or "girl." It\'s super casual and shows you\'re speaking like a local!',
    example: {
      phrase: '¡Eh, tío! ¿Qué pasa?',
      translation: 'Hey dude! What\'s up?',
      context: 'Greeting a friend on the street',
    },
    funFact: 'You can even use it for strangers! "¡Oye, tía!" to get a woman\'s attention is casual but not rude (unlike in English).',
    tipEmoji: '🗣️',
  },
  {
    id: 'late-dinner',
    title: 'Dinner at 10 PM? Normal!',
    emoji: '🌙',
    category: 'tradition',
    country: 'Spain',
    countryFlag: '🇪🇸',
    content: 'Spaniards eat dinner between 9-11 PM, much later than anywhere else in Europe. Restaurants don\'t even open for dinner until 8:30 PM. This schedule traces back to the siesta tradition.',
    example: {
      phrase: '¿Cenamos a las diez?',
      translation: 'Shall we have dinner at 10?',
      context: 'Completely normal dinner invitation',
    },
    funFact: 'Spain is in the "wrong" time zone! Geographically it should match Portugal/UK time, but Franco changed it to align with Nazi Germany in 1940... and it stuck.',
    tipEmoji: '🍽️',
  },
  {
    id: 'mande-mexico',
    title: '¿Mande? — Mexico\'s Polite "What?"',
    emoji: '🇲🇽',
    category: 'etiquette',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    content: 'In Mexico, saying "¿Qué?" (What?) can sound rude. Instead, Mexicans say "¿Mande?" — literally "command me" — a super polite way to ask someone to repeat themselves.',
    example: {
      phrase: '¿Mande? No le escuché.',
      translation: 'Pardon? I didn\'t hear you.',
      context: 'Politely asking someone to repeat',
    },
    funFact: 'This traces back to colonial times when servants would say "mande" to their masters. Today it\'s just considered good manners!',
    tipEmoji: '🎩',
  },
];

// Get a random capsule for a specific unit/lesson
export const getCapsuleForLesson = (lessonId: string): CultureCapsuleData => {
  // For demo purposes, return capsules based on lesson
  const index = parseInt(lessonId, 10) - 1;
  return spanishCultureCapsules[index % spanishCultureCapsules.length];
};

// Get a specific capsule by ID
export const getCapsuleById = (id: string): CultureCapsuleData | undefined => {
  return spanishCultureCapsules.find(capsule => capsule.id === id);
};

