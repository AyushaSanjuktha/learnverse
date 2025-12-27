// src/ai/flows/personalized-recommendations-based-on-quiz.ts
'use server';

/**
 * @fileOverview Flow for generating personalized learning recommendations based on quiz performance.
 *
 * This file defines a Genkit flow that takes a quiz score as input and provides a recommendation
 * on whether the user should revise the topic or move to the next topic.
 *
 * @exports personalizedRecommendationsBasedOnQuiz - The main function to generate personalized recommendations.
 * @exports PersonalizedRecommendationsBasedOnQuizInput - The input type for the personalizedRecommendationsBasedOnQuiz function.
 * @exports PersonalizedRecommendationsBasedOnQuizOutput - The output type for the personalizedRecommendationsBasedOnQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsBasedOnQuizInputSchema = z.object({
  quizScore: z
    .number()
    .describe("The user's score on the quiz, as a percentage (0-100)."),
});
export type PersonalizedRecommendationsBasedOnQuizInput = z.infer<
  typeof PersonalizedRecommendationsBasedOnQuizInputSchema
>;

const PersonalizedRecommendationsBasedOnQuizOutputSchema = z.object({
  recommendation: z
    .string()
    .describe(
      'A recommendation on whether the user should revise the topic or move to the next topic.'
    ),
});
export type PersonalizedRecommendationsBasedOnQuizOutput = z.infer<
  typeof PersonalizedRecommendationsBasedOnQuizOutputSchema
>;

export async function personalizedRecommendationsBasedOnQuiz(
  input: PersonalizedRecommendationsBasedOnQuizInput
): Promise<PersonalizedRecommendationsBasedOnQuizOutput> {
  return personalizedRecommendationsBasedOnQuizFlow(input);
}

const personalizedRecommendationsBasedOnQuizPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsBasedOnQuizPrompt',
  input: {schema: PersonalizedRecommendationsBasedOnQuizInputSchema},
  output: {schema: PersonalizedRecommendationsBasedOnQuizOutputSchema},
  prompt: `Based on the user's quiz score of {{quizScore}}%, provide a personalized recommendation on whether they should revise the topic or move to the next topic. If the score is less than 50%, recommend that they revise the topic. If the score is 50% or greater, recommend that they move to the next topic.

Recommendation:`,
});

const personalizedRecommendationsBasedOnQuizFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsBasedOnQuizFlow',
    inputSchema: PersonalizedRecommendationsBasedOnQuizInputSchema,
    outputSchema: PersonalizedRecommendationsBasedOnQuizOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsBasedOnQuizPrompt(input);
    return output!;
  }
);
