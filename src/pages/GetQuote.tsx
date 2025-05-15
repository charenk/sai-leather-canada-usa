import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from "@/hooks/use-toast";
import SectionHeading from '@/components/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormSecureField } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Upload, Check, ShieldCheck, Clock, CalendarCheck, Shield, Lock } from 'lucide-react';
import emailjs from 'emailjs-com';
import { FileInput } from '@/components/ui/file-input';
import { getEmailJSConfig, MAX_UPLOAD_SIZE_MB, ALLOWED_FILE_TYPES, ALLOWED_FILE_EXTENSIONS } from '@/services/config';

// Maximum file size for uploads (in MB)
const MAX_FILE_SIZE = MAX_UPLOAD_SIZE_MB * 1024 * 1024; // 10MB

// Zod form schema with file validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  companyName: z.string().min(1, { message: "Company name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  country: z.string().min(1, { message: "Please select your country." }),
  productType: z.string().min(1, { message: "Please select a product type." }),
  leatherType: z.string().min(1, { message: "Please select a leather type." }),
  finishType: z.string().min(1, { message: "Please select a finish type." }),
  quantity: z.string().min(1, { message: "Quantity is required." }),
  targetPrice: z.string().optional(),
  timeline: z.string().min(1, { message: "Please select a timeline." }),
  additionalInfo: z.string().optional(),
  requestSample: z.boolean().default(false),
  shippingAddress: z.string().optional(),
  requestNDA: z.boolean().default(false),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and privacy policy.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const GetQuote = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestingSample, setRequestingSample] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "",
      productType: "",
      leatherType: "",
      finishType: "",
      quantity: "",
      targetPrice: "",
      timeline: "",
      additionalInfo: "",
      requestSample: false,
      shippingAddress: "",
      requestNDA: false,
      agreeToTerms: false,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFileError(null);
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File is too large. Maximum size is ${MAX_UPLOAD_SIZE_MB}MB.`);
        setSelectedFile(null);
        return;
      }
      
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Invalid file type. Please upload PDF, PNG, JPG, or ZIP files only.");
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
    }
  };
  
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const config = getEmailJSConfig();
      
      let fileData = null;
      if (selectedFile) {
        try {
          fileData = await readFileAsBase64(selectedFile);
        } catch (error) {
          console.error("Error reading file:", error);
          toast({
            title: "File processing error",
            description: "There was a problem processing your file. Please try again with a different file.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }
      
      // Create template params
      const templateParams = {
        to_email: config.destinationEmail,
        from_name: data.fullName,
        company_name: data.companyName,
        from_email: data.email,
        phone: data.phone || "Not provided",
        country: data.country,
        product_type: data.productType,
        leather_type: data.leatherType,
        finish_type: data.finishType,
        quantity: data.quantity,
        target_price: data.targetPrice || "Not specified",
        timeline: data.timeline,
        additional_info: data.additionalInfo || "None",
        request_sample: data.requestSample ? "Yes" : "No",
        shipping_address: data.shippingAddress || "Not provided",
        request_nda: data.requestNDA ? "Yes" : "No",
        file_attachment: fileData,
        file_name: selectedFile ? selectedFile.name : "No file attached"
      };

      // Send email through EmailJS
      await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.userId
      );
      
      // Show success toast
      toast({
        title: "Quote request submitted securely",
        description: "Thank you for your interest. We'll get back to you within 2 business days.",
      });
      
      // Show the thank you message
      setIsSubmitted(true);
    } catch (error) {
      console.error("Email sending failed:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your form. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "France", 
    "Germany", "Italy", "Spain", "India", "Japan", "South Korea", "China",
    "Brazil", "Mexico", "Sweden", "Switzerland", "Netherlands", "Belgium"
  ];

  if (isSubmitted) {
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
              {form.getValues('requestSample') && " Since you requested samples, we'll follow up about shipping arrangements."}
              {form.getValues('requestNDA') && " We'll also prepare an NDA document based on your request."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
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
  }

  return (
    <main className="pt-32 pb-16 bg-gray-50">
      <div className="section-container">
        {/* Security Banner */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <Shield className="h-6 w-6 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">
            <span className="font-semibold">Secure Form:</span> Your information is protected and will only be sent to our authorized team. We never share your data with third parties.
          </p>
        </div>
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-sai-navy mb-6">
            Request a Custom Leather Quote
          </h1>
          <p className="text-lg text-gray-600">
            Tell us what you need. We'll respond within 2 business days.
          </p>
        </div>
        
        {/* Form Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-10 space-y-8">
              {/* Your Information Section */}
              <div>
                <h3 className="text-xl font-bold text-sai-navy mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red">1</span>
                  Your Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-1">
                          Email Address *
                          <Lock className="h-3 w-3 text-green-600" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 flex items-center gap-1">
                          Phone Number (optional)
                          <Lock className="h-3 w-3 text-green-600" />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Include country code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className="text-gray-700">Country *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Product Requirements Section */}
              <div>
                <h3 className="text-xl font-bold text-sai-navy mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red">2</span>
                  Garment Requirements
                </h3>
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
                    Upload design sketches, reference images, or technical specifications (PDF, PNG, JPG, ZIP - {MAX_UPLOAD_SIZE_MB}MB max)
                  </p>
                  <FileInput 
                    acceptedFileTypes={ALLOWED_FILE_TYPES}
                    maxSize={MAX_UPLOAD_SIZE_MB}
                    accept={ALLOWED_FILE_EXTENSIONS}
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
              
              {/* Sample Request Section */}
              <div>
                <h3 className="text-xl font-bold text-sai-navy mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red">3</span>
                  Sample Request (Optional)
                </h3>
                
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
              
              {/* Confidentiality Section */}
              <div>
                <h3 className="text-xl font-bold text-sai-navy mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-sai-red/10 rounded-full flex items-center justify-center text-sai-red">4</span>
                  Confidentiality & Privacy
                </h3>
                
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
          
          <div className="mt-12 text-center">
            <p className="text-lg font-medium text-sai-navy">Trusted by global fashion brands</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="/src/assets/logos/gerard-darel.png" alt="Gerard Darel" className="h-10 object-contain" />
              </div>
              <div className="flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="/src/assets/logos/caroll.png" alt="Caroll" className="h-10 object-contain" />
              </div>
              <div className="flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="/src/assets/logos/maison123.png" alt="Maison123" className="h-10 object-contain" />
              </div>
              <div className="flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <img src="/src/assets/logos/burberry.png" alt="Burberry" className="h-10 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GetQuote;
