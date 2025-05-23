
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
  subtitleClassName
}: SectionHeadingProps) => {
  return <div className={cn('mb-12', {
    'text-left': alignment === 'left',
    'text-center': alignment === 'center',
    'text-right': alignment === 'right'
  }, className)}>
      <h2 className={cn("text-3xl md:text-4xl font-semibold tracking-tight inverted text-zinc-700", {
        'mx-auto': alignment === 'center',
        'ml-auto': alignment === 'right'
      })}>
        <span className="text-zinc-700">{title}</span>
      </h2>
      {subtitle && <p className={cn("mt-4 text-gray-700 max-w-3xl text-lg", {
      'mx-auto': alignment === 'center',
      'ml-auto': alignment === 'right'
    }, subtitleClassName)}>
          {subtitle}
        </p>}
    </div>;
};
export default SectionHeading;
