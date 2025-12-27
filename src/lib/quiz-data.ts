import type { QuizData } from './types';

export const quizData: QuizData = {
  "Arrays": [
    {
      question: "What is the correct way to declare an array in JavaScript?",
      options: ["var arr = (1, 2, 3)", "var arr = [1, 2, 3]", "var arr = {1, 2, 3}", "var arr = <1, 2, 3>"],
      correctAnswer: "var arr = [1, 2, 3]",
    },
    {
      question: "Which method adds one or more elements to the end of an array and returns the new length?",
      options: ["pop()", "shift()", "push()", "unshift()"],
      correctAnswer: "push()",
    },
  ],
  "Strings": [
    {
      question: "Which method returns the character at a specified index in a string?",
      options: ["charAt()", "concat()", "indexOf()", "slice()"],
      correctAnswer: "charAt()",
    },
    {
      question: "How do you find the length of a string in JavaScript?",
      options: ["string.size", "string.length()", "string.length", "string.len"],
      correctAnswer: "string.length",
    },
  ],
};
