
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecurityBannerProps {
  fileSize?: number; // Size in bytes
}

const SecurityBanner: React.FC<SecurityBannerProps> = ({ fileSize }) => {
  // Show warning when file size is greater than 4.9MB (4.9 * 1024 * 1024 bytes)
  const showFileSizeWarning = fileSize && fileSize > 4.9 * 1024 * 1024;
  
  return (
    <>
      {/* Security Banner */}
      <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          <span className="font-semibold">Secure Form:</span> Your information is protected and will only be sent to our authorized team. We never share your data with third parties.
        </p>
      </div>
      
      {/* File Size Warning - Only shown when file size exceeds 4.9MB */}
      {showFileSizeWarning && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Warning:</span> File attachment exceeds 4.9MB. Large files will be automatically compressed.
          </p>
        </div>
      )}
    </>
  );
};

export default SecurityBanner;
