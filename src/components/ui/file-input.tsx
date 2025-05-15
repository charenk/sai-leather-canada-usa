
import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { AlertTriangle } from "lucide-react"

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  maxSize?: number; // Max file size in MB
  acceptedFileTypes?: string[]; // Array of MIME types
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, maxSize = 10, acceptedFileTypes = [], onChange, ...props }, ref) => {
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const files = e.target.files;
      
      if (files && files.length > 0) {
        const file = files[0];
        
        // Check file size
        if (maxSize && file.size > maxSize * 1024 * 1024) {
          setError(`File size exceeds ${maxSize}MB limit`);
          // Reset input
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          return;
        }
        
        // Check file type
        if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
          setError(`Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`);
          // Reset input
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          return;
        }
      }
      
      if (onChange) {
        onChange(e);
      }
    };
    
    return (
      <div className="space-y-2">
        <Input
          ref={(node) => {
            // This handles both the forwardRef and our local ref
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          type="file"
          className={cn("cursor-pointer", className)}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <div className="flex items-center gap-1 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }
)

FileInput.displayName = "FileInput"
