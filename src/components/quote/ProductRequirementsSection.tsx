
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import FormSectionHeading from './FormSectionHeading';
import { FormData } from './types';

interface ProductRequirementsSectionProps {
  form: UseFormReturn<FormData>;
}

const ProductRequirementsSection: React.FC<ProductRequirementsSectionProps> = ({ 
  form 
}) => {
  return (
    <div>
      <FormSectionHeading number={2} title="Garment Requirements" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Product Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="jacket">Leather Jacket</SelectItem>
                  <SelectItem value="pants">Leather Pants</SelectItem>
                  <SelectItem value="skirt">Leather Skirt</SelectItem>
                  <SelectItem value="vest">Leather Vest</SelectItem>
                  <SelectItem value="coat">Leather Coat</SelectItem>
                  <SelectItem value="accessories">Leather Accessories</SelectItem>
                  <SelectItem value="other">Other (specify in notes)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leatherType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Leather Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leather type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-grain">Full-grain Leather</SelectItem>
                  <SelectItem value="top-grain">Top-grain Leather</SelectItem>
                  <SelectItem value="corrected-grain">Corrected-grain Leather</SelectItem>
                  <SelectItem value="nubuck">Nubuck</SelectItem>
                  <SelectItem value="suede">Suede</SelectItem>
                  <SelectItem value="patent">Patent Leather</SelectItem>
                  <SelectItem value="nappa">Nappa Leather</SelectItem>
                  <SelectItem value="other">Other (specify in notes)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finishType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Finish Type *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select finish type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="aniline">Aniline</SelectItem>
                  <SelectItem value="semi-aniline">Semi-aniline</SelectItem>
                  <SelectItem value="pigmented">Pigmented</SelectItem>
                  <SelectItem value="waxed">Waxed</SelectItem>
                  <SelectItem value="pull-up">Pull-up</SelectItem>
                  <SelectItem value="antiqued">Antiqued</SelectItem>
                  <SelectItem value="other">Other (specify in notes)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Estimated Quantity *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quantity range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="10-50">10-50 pieces</SelectItem>
                  <SelectItem value="51-100">51-100 pieces</SelectItem>
                  <SelectItem value="101-500">101-500 pieces</SelectItem>
                  <SelectItem value="501-1000">501-1000 pieces</SelectItem>
                  <SelectItem value="1000+">1000+ pieces</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="mt-6">
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Additional Requirements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide any specific requirements, color preferences, or design details." 
                  className="h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProductRequirementsSection;
