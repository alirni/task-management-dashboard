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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="text-2xl font-bold">{stat.value}</div>
          <p className="text-sm text-muted-foreground">{stat.title}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
