export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type QuizData = {
  [key: string]: QuizQuestion[];
};

export type UserData = {
  name: string;
  level: string;
  completed_topics: string[];
  quiz_scores: { topic: string; score: number }[];
  total_time_spent: number; // in seconds
};
