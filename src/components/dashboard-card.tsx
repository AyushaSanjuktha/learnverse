import type { FC } from 'react';
import { Award, BookOpen, Clock, User, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserData } from '@/lib/types';

interface DashboardCardProps {
  userData: UserData;
  suggestedTopic: string | null;
}

const StatCard: FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 rounded-lg bg-secondary p-4">
    <div className="rounded-full bg-primary/20 p-3 text-primary">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export const DashboardCard: FC<DashboardCardProps> = ({ userData, suggestedTopic }) => {
  const timeInMinutes = Math.floor(userData.total_time_spent / 60);
  const timeString = timeInMinutes > 0 ? `${timeInMinutes} min` : `${userData.total_time_spent}s`;

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-muted-foreground" />
          <CardTitle>
            {userData.name}'s Dashboard ({userData.level})
          </CardTitle>
        </div>
        {userData.completed_topics.length > 0 && (
          <Badge variant="outline" className="border-accent text-accent-foreground py-1 px-3">
            <Award className="mr-2 h-4 w-4" />
            Fast Learner
          </Badge>
        )}
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<BookOpen className="h-6 w-6" />}
          label="Topics Completed"
          value={userData.completed_topics.length}
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          label="Total Time Spent"
          value={timeString}
        />
        {suggestedTopic && (
           <StatCard
            icon={<Zap className="h-6 w-6" />}
            label="Suggested Topic"
            value={suggestedTopic}
          />
        )}
      </CardContent>
    </Card>
  );
};
