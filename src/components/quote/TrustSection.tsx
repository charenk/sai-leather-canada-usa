
import React from 'react';
import { ShieldCheck, Clock, CalendarCheck } from 'lucide-react';

const TrustSection: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-sai-red/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-sai-red" />
          </div>
          <h3 className="font-bold text-sai-navy mb-2">Trusted by Global Brands</h3>
          <p className="text-gray-600">
            Supplying premium leather garments to European fashion brands for over 15 years
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-sai-red/10 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-sai-red" />
          </div>
          <h3 className="font-bold text-sai-navy mb-2">Quick Response Guarantee</h3>
          <p className="text-gray-600">
            We'll respond to your quote request within 2 business days
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-sai-red/10 rounded-full flex items-center justify-center mb-4">
            <CalendarCheck className="h-6 w-6 text-sai-red" />
          </div>
          <h3 className="font-bold text-sai-navy mb-2">Streamlined Production</h3>
          <p className="text-gray-600">
            From design to delivery, we manage the entire production process
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
