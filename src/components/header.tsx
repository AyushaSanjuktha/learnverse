import { BrainCircuit } from 'lucide-react';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center gap-2">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          LearnVerse
        </h1>
      </div>
    </header>
  );
};
