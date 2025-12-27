"use client";

import { useState, useTransition } from "react";
import {
  BookOpen,
  CheckCircle,
  Loader2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Header } from "@/components/header";
import { DashboardCard } from "@/components/dashboard-card";
import { useToast } from "@/hooks/use-toast";

import type { UserData, QuizQuestion } from "@/lib/types";
import { quizData } from "@/lib/quiz-data";
import { getLesson, getRecommendation } from "@/app/actions";

const TOPICS = ["Arrays", "Strings"];

export default function Home() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [userData, setUserData] = useState<UserData>({
    name: "Ayusha",
    level: "Beginner",
    completed_topics: [],
    quiz_scores: [],
    total_time_spent: 0,
  });

  const [topic, setTopic] = useState(TOPICS[0]);
  const [lesson, setLesson] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
  const [quizResult, setQuizResult] = useState<{
    score: number;
    recommendation: string;
    results: boolean[];
  } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleGenerateLesson = () => {
    startTransition(async () => {
      setLesson(null);
      setQuizResult(null);
      setQuizAnswers({});
      setStartTime(Date.now());
      const response = await getLesson(topic, userData.level, userData.name);
      if (response.success && response.data) {
        setLesson(response.data.lessonContent);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
        setStartTime(null);
      }
    });
  };

  const handleSubmitQuiz = () => {
    startTransition(async () => {
      const currentQuiz = quizData[topic];
      let score = 0;
      const results: boolean[] = [];
      currentQuiz.forEach((q, index) => {
        const isCorrect = q.correctAnswer === quizAnswers[index];
        if (isCorrect) {
          score++;
        }
        results.push(isCorrect);
      });

      const percentageScore = (score / currentQuiz.length) * 100;
      const response = await getRecommendation(percentageScore);

      if (response.success && response.data) {
        setQuizResult({
          score: percentageScore,
          recommendation: response.data.recommendation,
          results,
        });

        const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

        setUserData((prev) => {
          const newScores = [...prev.quiz_scores, { topic, score: percentageScore }];
          const newCompleted = [...prev.completed_topics];
          if (percentageScore >= 50 && !newCompleted.includes(topic)) {
            newCompleted.push(topic);
          }
          return {
            ...prev,
            quiz_scores: newScores,
            completed_topics: newCompleted,
            total_time_spent: prev.total_time_spent + timeSpent,
          };
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.error,
        });
      }
    });
  };

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    setLesson(null);
    setQuizResult(null);
    setQuizAnswers({});
    setStartTime(null);
  };

  const currentQuiz: QuizQuestion[] = quizData[topic];
  const masteredStrings = userData.completed_topics.includes("Strings") && !userData.completed_topics.includes("Objects");
  const suggestedTopic = masteredStrings ? "Objects" : null;

  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col gap-8 px-4 py-8">
        <DashboardCard userData={userData} suggestedTopic={suggestedTopic} />

        <Card>
          <CardHeader>
            <CardTitle>Start a new lesson</CardTitle>
            <CardDescription>
              Select a topic and generate an AI-powered micro-lesson to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <Select onValueChange={handleTopicChange} defaultValue={topic}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                {TOPICS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateLesson} disabled={isPending} className="w-full sm:w-auto">
              {isPending && !lesson ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BookOpen className="mr-2 h-4 w-4" />
              )}
              Generate Micro Lesson (AI)
            </Button>
          </CardContent>
        </Card>

        {isPending && !lesson && (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        )}

        {lesson && (
          <Card className="animate-in fade-in-0 duration-500">
            <CardHeader>
              <CardTitle>Micro Lesson: {topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm md:prose-base max-w-none text-foreground">
                {lesson.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {lesson && !quizResult && (
          <Card className="animate-in fade-in-0 duration-700">
            <CardHeader>
              <CardTitle>Quick Quiz: {topic}</CardTitle>
              <CardDescription>Test your knowledge with these questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuiz.map((q, qIndex) => (
                <div key={qIndex}>
                  <p className="font-medium mb-2">{`${qIndex + 1}. ${q.question}`}</p>
                  <RadioGroup
                    value={quizAnswers[qIndex]}
                    onValueChange={(value) =>
                      setQuizAnswers((prev) => ({ ...prev, [qIndex]: value }))
                    }
                  >
                    {q.options.map((opt, oIndex) => (
                      <div key={oIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt} id={`q${qIndex}o${oIndex}`} />
                        <Label htmlFor={`q${qIndex}o${oIndex}`}>{opt}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitQuiz} disabled={isPending || Object.keys(quizAnswers).length < currentQuiz.length}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Quiz
              </Button>
            </CardFooter>
          </Card>
        )}

        {quizResult && (
          <Card className="animate-in fade-in-0 duration-500">
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>You scored {quizResult.score.toFixed(0)}%</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant={quizResult.score >= 50 ? "default" : "destructive"} className={quizResult.score >= 50 ? "bg-green-50 border-green-200" : ""}>
                    <AlertTitle className="font-bold">Recommendation</AlertTitle>
                    <AlertDescription>{quizResult.recommendation}</AlertDescription>
                </Alert>
                <div className="space-y-4">
                    {currentQuiz.map((q, qIndex) => (
                        <div key={qIndex} className="p-4 border rounded-lg">
                             <p className="font-medium mb-2">{q.question}</p>
                             {q.options.map((opt, oIndex) => {
                                 const isSelected = quizAnswers[qIndex] === opt;
                                 const isCorrect = q.correctAnswer === opt;
                                 return (
                                    <div key={oIndex} className="flex items-center gap-2 text-sm">
                                        {isCorrect ? <CheckCircle className="h-4 w-4 text-green-500" /> : (isSelected ? <XCircle className="h-4 w-4 text-red-500" /> : <div className="h-4 w-4"/>)}
                                        <span className={cn(isCorrect && "font-bold text-green-700", isSelected && !isCorrect && "text-red-700 line-through")}>{opt}</span>
                                    </div>
                                 )
                             })}
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
