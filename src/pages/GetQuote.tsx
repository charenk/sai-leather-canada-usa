
import React from 'react';
import { Lock } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { 
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPES
} from '@/services/config';

import CustomerInformationSection from '@/components/quote/CustomerInformationSection';
import ProductRequirementsSection from '@/components/quote/ProductRequirementsSection';
import SampleRequestSection from '@/components/quote/SampleRequestSection';
import ConfidentialitySection from '@/components/quote/ConfidentialitySection';
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
    selectedFile,
    fileError,
    handleFileChange,
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
        requestedNDA={form.getValues('requestNDA')}
        onSubmitAnother={() => setIsSubmitted(false)}
      />
    );
  }

  return (
    <main className="pt-32 pb-16 bg-gray-50">
      <div className="section-container">
        <SecurityBanner fileSize={selectedFile?.size} />
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading
            subtitle="Request a Quote"
            title="Get a Personalized Quote"
          />
          <p className="text-lg text-gray-600">
            Request a personalized quote or sample. We're here to support your sourcing journey—confidentiality guaranteed.
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
                handleFileChange={handleFileChange}
                selectedFile={selectedFile}
                fileError={fileError}
                allowedFileExtensions={ALLOWED_FILE_EXTENSIONS}
              />
              
              {/* Sample Request Section */}
              <SampleRequestSection 
                form={form}
                requestingSample={requestingSample}
                setRequestingSample={setRequestingSample}
              />
              
              {/* Confidentiality Section */}
              <ConfidentialitySection form={form} />
              
              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="bg-sai-red hover:bg-sai-red/90 w-full md:w-auto text-lg py-6 px-8 flex items-center gap-2"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Request Quote & Sample Securely"}
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
