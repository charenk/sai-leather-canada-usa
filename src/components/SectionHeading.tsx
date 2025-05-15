
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClassName?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  alignment = 'left',
  className,
  subtitleClassName,
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        'mb-12',
        {
          'text-left': alignment === 'left',
          'text-center': alignment === 'center',
          'text-right': alignment === 'right',
        },
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl font-medium text-gray-800 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-gray-600 max-w-3xl", 
          {
            'mx-auto': alignment === 'center',
            'ml-auto': alignment === 'right',
          },
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
