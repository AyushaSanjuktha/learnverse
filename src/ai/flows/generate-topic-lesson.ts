'use server';

/**
 * @fileOverview A flow to generate a personalized lesson on a selected topic using AI.
 *
 * - generateTopicLesson - A function that generates a lesson based on the selected topic.
 * - GenerateTopicLessonInput - The input type for the generateTopicLesson function.
 * - GenerateTopicLessonOutput - The return type for the generateTopicLesson function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicLessonInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a lesson.'),
  userLevel: z.string().describe('The user\u0027s level (Beginner, Intermediate, Advanced).'),
  userName: z.string().describe('The user\u0027s name.'),
});
export type GenerateTopicLessonInput = z.infer<typeof GenerateTopicLessonInputSchema>;

const GenerateTopicLessonOutputSchema = z.object({
  lessonContent: z.string().describe('The generated lesson content for the topic.'),
});
export type GenerateTopicLessonOutput = z.infer<typeof GenerateTopicLessonOutputSchema>;

export async function generateTopicLesson(input: GenerateTopicLessonInput): Promise<GenerateTopicLessonOutput> {
  return generateTopicLessonFlow(input);
}

const generateTopicLessonPrompt = ai.definePrompt({
  name: 'generateTopicLessonPrompt',
  input: {schema: GenerateTopicLessonInputSchema},
  output: {schema: GenerateTopicLessonOutputSchema},
  prompt: `You are an expert educator, skilled at creating personalized micro-lessons.

  Create a concise and informative lesson on the topic \"{{{topic}}}\", tailored to a user named {{{userName}}} with a level of {{{userLevel}}}.
  The lesson should be easy to understand and engaging, providing key concepts and practical examples.
  Focus on delivering valuable information in a short, focused format.`,
});

const generateTopicLessonFlow = ai.defineFlow(
  {
    name: 'generateTopicLessonFlow',
    inputSchema: GenerateTopicLessonInputSchema,
    outputSchema: GenerateTopicLessonOutputSchema,
  },
  async input => {
    const {output} = await generateTopicLessonPrompt(input);
    return output!;
  }
);
