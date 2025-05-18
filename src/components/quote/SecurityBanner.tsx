
import React from 'react';
import { Shield, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SecurityBanner: React.FC = () => {
  return (
    <>
      {/* Security Banner */}
      <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
        <p className="text-sm text-green-800">
          <span className="font-semibold">Secure Form:</span> Your information is protected and will only be sent to our authorized team. We never share your data with third parties.
        </p>
      </div>
      
      {/* Calendar Call-out Section - Simplified */}
      <div className="mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-4">
        <CalendarDays className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-700 flex-1">
          Prefer a conversation? 
          <Button 
            variant="link" 
            className="text-blue-600 px-1 py-0 h-auto font-medium"
            onClick={() => window.open('https://calendly.com/your-calendar-link', '_blank')}
          >
            Book a 30-minute consultation call
          </Button>
          instead of filling the form.
        </p>
      </div>
    </>
  );
};

export default SecurityBanner;
