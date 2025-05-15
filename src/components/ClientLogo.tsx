
import { cn } from '@/lib/utils';

interface ClientLogoProps {
  name: string;
  logoSrc?: string; 
  className?: string;
}

const ClientLogo = ({ name, logoSrc, className }: ClientLogoProps) => {
  return (
    <div 
      className={cn(
        "bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[120px]", 
        className
      )}
    >
      {logoSrc ? (
        <img src={logoSrc} alt={`${name} logo`} className="max-h-12" />
      ) : (
        <span className="text-gray-500 font-medium">{name}</span>
      )}
    </div>
  );
};

export default ClientLogo;
