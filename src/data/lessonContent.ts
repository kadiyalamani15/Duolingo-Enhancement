// Lesson content for each unit - progressively harder
export interface Question {
  id: string;
  type: 'multiple-choice' | 'translate' | 'listen';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface LessonData {
  unitId: string;
  unitTitle: string;
  topic: string;
  difficulty: 'beginner' | 'elementary' | 'intermediate';
  questions: Question[];
  cultureCapsuleId: string;
}

// Unit 1: Basic Greetings & Phrases (Easiest)
const unit1Questions: Question[] = [
  {
    id: '1-1',
    type: 'multiple-choice',
    question: 'Select the correct translation:\n\n"Hello"',
    options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
    correctAnswer: 'Hola',
  },
  {
    id: '1-2',
    type: 'multiple-choice',
    question: 'What does "Gracias" mean?',
    options: ['Please', 'Thank you', 'Goodbye', 'Hello'],
    correctAnswer: 'Thank you',
  },
  {
    id: '1-3',
    type: 'translate',
    question: 'Translate this:\n\n"Good morning"',
    options: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Hasta luego'],
    correctAnswer: 'Buenos días',
  },
];

// Unit 2: Common Objects (Medium)
const unit2Questions: Question[] = [
  {
    id: '2-1',
    type: 'multiple-choice',
    question: 'What is "el libro" in English?',
    options: ['The table', 'The book', 'The chair', 'The pen'],
    correctAnswer: 'The book',
  },
  {
    id: '2-2',
    type: 'translate',
    question: 'Select the Spanish word for:\n\n"The water"',
    options: ['La leche', 'El café', 'El agua', 'El jugo'],
    correctAnswer: 'El agua',
  },
  {
    id: '2-3',
    type: 'multiple-choice',
    question: 'Which object is "la mesa"?',
    options: ['The door', 'The window', 'The table', 'The bed'],
    correctAnswer: 'The table',
  },
];

// Unit 3: Places & Locations (Harder)
const unit3Questions: Question[] = [
  {
    id: '3-1',
    type: 'translate',
    question: 'How do you say:\n\n"Where is the bathroom?"',
    options: [
      '¿Dónde está el baño?',
      '¿Cómo está usted?',
      '¿Cuánto cuesta?',
      '¿Qué hora es?'
    ],
    correctAnswer: '¿Dónde está el baño?',
  },
  {
    id: '3-2',
    type: 'multiple-choice',
    question: 'What does "a la derecha" mean?',
    options: ['To the left', 'To the right', 'Straight ahead', 'Behind'],
    correctAnswer: 'To the right',
  },
  {
    id: '3-3',
    type: 'translate',
    question: 'Translate:\n\n"The restaurant is near here"',
    options: [
      'El restaurante está cerca de aquí',
      'El restaurante está lejos',
      'El restaurante está cerrado',
      'El restaurante es grande'
    ],
    correctAnswer: 'El restaurante está cerca de aquí',
  },
];

// All lessons data
export const lessonsData: Record<string, LessonData> = {
  '1': {
    unitId: '1',
    unitTitle: 'Unit 1',
    topic: 'Greetings & Basics',
    difficulty: 'beginner',
    questions: unit1Questions,
    cultureCapsuleId: 'vale-spain', // About the word "vale" - professional & relevant to greetings
  },
  '2': {
    unitId: '2',
    unitTitle: 'Unit 2',
    topic: 'Common Objects',
    difficulty: 'elementary',
    questions: unit2Questions,
    cultureCapsuleId: 'sobremesa', // About table/dining culture
  },
  '3': {
    unitId: '3',
    unitTitle: 'Unit 3',
    topic: 'Places & Directions',
    difficulty: 'intermediate',
    questions: unit3Questions,
    cultureCapsuleId: 'spanish-timing', // About arriving/meeting places
  },
};

// Get lesson by ID
export const getLessonById = (lessonId: string): LessonData | undefined => {
  return lessonsData[lessonId];
};

// Get all lessons
export const getAllLessons = (): LessonData[] => {
  return Object.values(lessonsData);
};

