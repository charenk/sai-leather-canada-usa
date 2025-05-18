
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface SuccessMessageProps {
  requestedSample: boolean;
  requestedNDA: boolean;
  onSubmitAnother: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ 
  requestedSample, 
  requestedNDA, 
  onSubmitAnother 
}) => {
  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center bg-white p-10 rounded-xl shadow-sm">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-sai-navy mb-6">Thank You for Your Quote Request</h2>
          <p className="text-gray-600 mb-8 text-lg">
            We'll get back to you within 2 business days with a detailed quote. 
            {requestedSample && " Since you requested samples, we'll follow up about shipping arrangements."}
            {requestedNDA && " We'll also prepare an NDA document based on your request."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={onSubmitAnother}
            >
              Submit Another Request
            </Button>
            <Button 
              className="bg-sai-red hover:bg-sai-red/90"
              onClick={() => window.location.href = '/'}
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SuccessMessage;
