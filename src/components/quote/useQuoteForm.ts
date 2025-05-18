
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';
import { getQuoteEmailJSConfig } from '@/services/config';
import { formSchema, FormData } from './types';

export const useQuoteForm = () => {
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

  // Maximum file size for uploads (in MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Rate limiting implementation
  const checkRateLimit = (): boolean => {
    const now = new Date().getTime();
    const submissions = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
    
    // Filter out old submissions outside the timeframe
    const recentSubmissions = submissions.filter(
      (timestamp: number) => now - timestamp < 3600000 // 1 hour
    );
    
    // Check if we've reached the limit
    if (recentSubmissions.length >= 5) {
      return false; // Rate limited
    }
    
    // Store the submission time
    localStorage.setItem('quoteSubmissions', JSON.stringify([...recentSubmissions, now]));
    return true; // Not rate limited
  };

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string): string => {
    if (!input) return '';
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;')
      .replace(/\//g, '&#47;');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFileError(null);
    
    if (files && files.length > 0) {
      const file = files[0];
      
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File is too large. Maximum size is 10MB.`);
        setSelectedFile(null);
        return;
      }
      
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "application/zip",
        "application/x-zip-compressed"
      ];
      
      if (!allowedTypes.includes(file.type)) {
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
      // Check rate limiting first
      if (!checkRateLimit()) {
        toast({
          title: "Submission limit reached",
          description: "You've made too many requests. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Get the quote-specific EmailJS config
      const config = getQuoteEmailJSConfig();
      
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
      
      // Sanitize inputs before sending
      const sanitizedData = {
        fullName: sanitizeInput(data.fullName),
        companyName: sanitizeInput(data.companyName),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone || ''),
        country: sanitizeInput(data.country),
        productType: sanitizeInput(data.productType),
        leatherType: sanitizeInput(data.leatherType),
        finishType: sanitizeInput(data.finishType),
        quantity: sanitizeInput(data.quantity),
        targetPrice: sanitizeInput(data.targetPrice || ''),
        timeline: sanitizeInput(data.timeline),
        additionalInfo: sanitizeInput(data.additionalInfo || ''),
        shippingAddress: sanitizeInput(data.shippingAddress || ''),
      };
      
      // Create template params
      const templateParams = {
        to_email: config.destinationEmail, 
        from_name: sanitizedData.fullName,
        company_name: sanitizedData.companyName,
        from_email: sanitizedData.email,
        phone: sanitizedData.phone || "Not provided",
        country: sanitizedData.country,
        product_type: sanitizedData.productType,
        leather_type: sanitizedData.leatherType,
        finish_type: sanitizedData.finishType,
        quantity: sanitizedData.quantity,
        target_price: sanitizedData.targetPrice || "Not specified",
        timeline: sanitizedData.timeline,
        additional_info: sanitizedData.additionalInfo || "None",
        request_sample: data.requestSample ? "Yes" : "No",
        shipping_address: sanitizedData.shippingAddress || "Not provided",
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

  return {
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
  };
};
