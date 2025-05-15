
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  color: 'red' | 'coral' | 'blue' | 'lavender';
  className?: string;
}

const StatCard = ({ value, label, description, color, className }: StatCardProps) => {
  const colorClasses = {
    red: 'bg-sai-red/10',
    coral: 'bg-sai-coral/10',
    blue: 'bg-sai-blue/10',
    lavender: 'bg-sai-lavender/10',
  };

  const valueColorClasses = {
    red: 'text-sai-red',
    coral: 'text-sai-coral',
    blue: 'text-sai-blue',
    lavender: 'text-sai-navy',
  };

  return (
    <div 
      className={cn(
        'stat-card', 
        colorClasses[color],
        className
      )}
    >
      <div>
        <h3 className={cn('text-5xl font-bold mb-2', valueColorClasses[color])}>
          {value}
        </h3>
        <p className="text-xl font-medium text-gray-800">{label}</p>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
