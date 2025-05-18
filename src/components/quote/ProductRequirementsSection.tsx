
import React from 'react';
import { Upload, Check } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { FileInput } from '@/components/ui/file-input';
import FormSectionHeading from './FormSectionHeading';
import { FormData } from './types';

interface ProductRequirementsSectionProps {
  form: UseFormReturn<FormData>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
  fileError: string | null;
  allowedFileExtensions: string;
}

const ProductRequirementsSection: React.FC<ProductRequirementsSectionProps> = ({ 
  form, 
  handleFileChange, 
  selectedFile, 
  fileError,
  allowedFileExtensions
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
        <FormField
          control={form.control}
          name="targetPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Target Price Range (optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range (USD)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="budget">$50-100 per piece</SelectItem>
                  <SelectItem value="mid-range">$101-200 per piece</SelectItem>
                  <SelectItem value="premium">$201-500 per piece</SelectItem>
                  <SelectItem value="luxury">$500+ per piece</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Project Timeline *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (1-2 months)</SelectItem>
                  <SelectItem value="standard">Standard (3-4 months)</SelectItem>
                  <SelectItem value="relaxed">Relaxed (5-6 months)</SelectItem>
                  <SelectItem value="planning">Planning Phase (6+ months)</SelectItem>
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
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="h-5 w-5 text-sai-red" />
          <p className="font-medium text-gray-700">Reference Files (Secure Upload)</p>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          Upload design sketches, reference images, or technical specifications (PDF, PNG, JPG, ZIP - max file size in MB)
        </p>
        <FileInput 
          acceptedFileTypes={[]}
          maxSize={10}
          accept={allowedFileExtensions}
          onChange={handleFileChange}
        />
        {selectedFile && !fileError && (
          <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)}MB)</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRequirementsSection;
