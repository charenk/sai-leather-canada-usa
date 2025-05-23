
import React from 'react';
import { Lock, CalendarDays } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import CustomerInformationSection from '@/components/quote/CustomerInformationSection';
import ProductRequirementsSection from '@/components/quote/ProductRequirementsSection';
import SampleRequestSection from '@/components/quote/SampleRequestSection';
import SecurityBanner from '@/components/quote/SecurityBanner';
import SuccessMessage from '@/components/quote/SuccessMessage';
import TrustSection from '@/components/quote/TrustSection';
import { useQuoteForm } from '@/components/quote/useQuoteForm';

const GetQuote = () => {
  const {
    form,
    isSubmitted,
    setIsSubmitted,
    requestingSample,
    setRequestingSample,
    isLoading,
    onSubmit
  } = useQuoteForm();

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "France", 
    "Germany", "Italy", "Spain", "India", "Japan", "South Korea", "China",
    "Brazil", "Mexico", "Sweden", "Switzerland", "Netherlands", "Belgium"
  ];

  if (isSubmitted) {
    return (
      <SuccessMessage 
        requestedSample={form.getValues('requestSample')}
        requestedNDA={false}
        onSubmitAnother={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <main className="pt-32 pb-16 bg-gray-50">
      <div className="section-container">
        <SecurityBanner />
        
        {/* Hero Section - Updated for better centering */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            title="Get a Personalized Quote"
            alignment="center"
            className="mb-4"
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Request a personalized quote or sample. We're here to support your sourcing journey.
          </p>
        </div>
        
        {/* Calendar Call-out Section - Moved above the form section with adjusted width */}
        <div className="max-w-4xl mx-auto mb-8 bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-4">
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
        
        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 space-y-8">
              {/* Your Information Section */}
              <CustomerInformationSection form={form} countries={countries} />
              
              {/* Product Requirements Section */}
              <ProductRequirementsSection 
                form={form} 
              />
              
              {/* Sample Request Section */}
              <SampleRequestSection 
                form={form}
                requestingSample={requestingSample}
                setRequestingSample={setRequestingSample}
              />
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-sai-red hover:bg-sai-red/90 w-full md:w-auto text-lg py-6 px-8 flex items-center gap-2"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Request Quote & Sample"}
                  <Lock className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Trust Section */}
        <TrustSection />
      </div>
    </main>
  );
};

export default GetQuote;
