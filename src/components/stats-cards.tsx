interface StatsCardsProps {
  totalTasks: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

const StatsCards = ({
  totalTasks,
  inProgress,
  completed,
  overdue,
}: StatsCardsProps) => {
  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      description: 'All tasks in the system',
    },
    {
      title: 'In Progress',
      value: inProgress,
      description: 'Currently being worked on',
    },
    {
      title: 'Completed',
      value: completed,
      description: 'Successfully finished tasks',
    },
    {
      title: 'Overdue',
      value: overdue,
      description: 'Tasks past their due date',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm sm:p-4"
        >
          <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {stat.title}
          </p>
          <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
