"use server";

import { generateTopicLesson } from "@/ai/flows/generate-topic-lesson";
import { personalizedRecommendationsBasedOnQuiz } from "@/ai/flows/personalized-recommendations-based-on-quiz";

export async function getLesson(topic: string, userLevel: string, userName: string) {
  try {
    const result = await generateTopicLesson({ topic, userLevel, userName });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating lesson:", error);
    return { success: false, error: "Failed to generate lesson. Please try again." };
  }
}

export async function getRecommendation(quizScore: number) {
  try {
    const result = await personalizedRecommendationsBasedOnQuiz({ quizScore });
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting recommendation:", error);
    return { success: false, error: "Failed to get recommendation. Please try again." };
  }
}
