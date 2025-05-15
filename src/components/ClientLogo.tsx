
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ClientLogoProps {
  name: string;
  logoSrc?: string; 
  className?: string;
}

const ClientLogo = ({ name, logoSrc, className }: ClientLogoProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-lg p-4 flex items-center justify-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow", 
        className
      )}
    >
      <AspectRatio ratio={16/9} className="flex items-center justify-center w-full">
        {logoSrc ? (
          <img src={logoSrc} alt={`${name} logo`} className="max-h-12 max-w-full object-contain" />
        ) : (
          <span className="text-gray-500 font-medium text-center">{name}</span>
        )}
      </AspectRatio>
    </div>
  );
};

export default ClientLogo;
