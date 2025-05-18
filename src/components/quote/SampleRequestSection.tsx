
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeading from './FormSectionHeading';
import { FormData } from './types';

interface SampleRequestSectionProps {
  form: UseFormReturn<FormData>;
  requestingSample: boolean;
  setRequestingSample: (value: boolean) => void;
}

const SampleRequestSection: React.FC<SampleRequestSectionProps> = ({ 
  form, 
  requestingSample, 
  setRequestingSample 
}) => {
  return (
    <div>
      <FormSectionHeading number={3} title="Sample Request (Optional)" />
      
      <div className="flex items-center space-x-2 mb-6">
        <Switch
          id="request-sample"
          checked={requestingSample}
          onCheckedChange={value => {
            setRequestingSample(value);
            if (!value) {
              form.setValue("shippingAddress", "");
            }
          }}
        />
        <label
          htmlFor="request-sample"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I'd like to request material swatches or a sample product
        </label>
      </div>
      
      {requestingSample && (
        <FormField
          control={form.control}
          name="shippingAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Shipping Address for Samples</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Full address including street, city, postal code, and country"
                  className="h-24" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default SampleRequestSection;
