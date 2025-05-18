
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeading from './FormSectionHeading';
import { FormData } from './types';

interface ConfidentialitySectionProps {
  form: UseFormReturn<FormData>;
}

const ConfidentialitySection: React.FC<ConfidentialitySectionProps> = ({ form }) => {
  return (
    <div>
      <FormSectionHeading number={4} title="Confidentiality & Privacy" />
      
      <div className="flex flex-row items-start space-x-3 space-y-0 mb-4">
        <FormField
          control={form.control}
          name="requestNDA"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-700">
                  I'd like this quote to be covered under a Non-Disclosure Agreement
                </FormLabel>
                <p className="text-sm text-gray-500">
                  We'll send you our standard NDA for your review before proceeding
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-700">
                  I agree to the privacy policy and terms of service
                </FormLabel>
                <p className="text-sm text-gray-500">
                  Your information will be securely processed and only shared with the Sai International team. 
                  We respect your privacy and will never share your data with third parties.
                </p>
              </div>
            </FormItem>
          )}
        />
        <FormMessage />
      </div>
    </div>
  );
};

export default ConfidentialitySection;
