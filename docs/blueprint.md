# **App Name**: LearnVerse

## Core Features:

- Topic Selection: Users select a topic from a dropdown menu to focus their learning.
- AI-Powered Lesson Generation: Generates a micro-lesson based on the selected topic, providing concise and relevant information using a tool to personalize the response.
- Quick Quiz: Presents a short quiz (two multiple-choice questions) to test the user's understanding of the lesson.
- Personalized Recommendations: Offers adaptive recommendations (revise topic or move to next) based on the user's quiz performance.
- User Data Tracking: Stores user data (completed_topics, quiz_scores, total_time_spent) in Firestore.
- Dashboard Display: Shows user profile details (name, level), progress stats (total topics completed, time spent).
- Achievement Badge: Awards a 'Fast Learner' badge if at least one topic is completed.

## Style Guidelines:

- Primary color: Soft blue (#94BDBE), promoting calmness and focus.
- Background color: Very light grayish-blue (#F0F4F5).
- Accent color: Muted olive green (#AEBFA1) for a natural, understated feel.
- Body and headline font: 'Inter' sans-serif for a modern, neutral reading experience.
- Card-based design for lessons, quizzes, and the dashboard. Use a CSS framework like Tailwind or simple Flexbox.
- Minimal and clear icons for topic selection, dashboard elements, and achievement badges.
- Subtle animations and transitions for feedback on quiz submission.