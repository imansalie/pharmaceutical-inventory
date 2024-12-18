import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card className="p-6 space-y-2">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="text-primary">{icon}</div>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
);

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Medications"
        value="2,420"
        description="Across all categories"
        icon={<div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">💊</div>}
      />
      <StatCard
        title="Low Stock Items"
        value="12"
        description="Need reordering"
        icon={<div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">⚠️</div>}
      />
      <StatCard
        title="Categories"
        value="8"
        description="Active categories"
        icon={<div className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">📑</div>}
      />
      <StatCard
        title="Total Value"
        value="$143,560"
        description="Current inventory value"
        icon={<div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">💰</div>}
      />
    </div>
  );
};