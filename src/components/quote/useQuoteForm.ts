
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
      additionalInfo: "",
      requestSample: false,
      shippingAddress: "",
    },
  });

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
      
      // Verify EmailJS configuration is valid
      if (!config.serviceId || !config.templateId || !config.userId) {
        console.error("EmailJS configuration is incomplete:", { 
          serviceId: !!config.serviceId,
          templateId: !!config.templateId,
          userId: !!config.userId
        });
        toast({
          title: "Configuration error",
          description: "There was a problem with the form configuration. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
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
        additionalInfo: sanitizeInput(data.additionalInfo || ''),
        shippingAddress: sanitizeInput(data.shippingAddress || ''),
      };
      
      // Create template params - Make sure to_email is set correctly
      const templateParams = {
        to_email: config.destinationEmail, // Set recipient email from config
        from_name: sanitizedData.fullName,
        company_name: sanitizedData.companyName,
        from_email: sanitizedData.email,
        phone: sanitizedData.phone || "Not provided",
        country: sanitizedData.country,
        product_type: sanitizedData.productType,
        leather_type: sanitizedData.leatherType,
        finish_type: sanitizedData.finishType,
        quantity: sanitizedData.quantity,
        additional_info: sanitizedData.additionalInfo || "None",
        request_sample: data.requestSample ? "Yes" : "No",
        shipping_address: sanitizedData.shippingAddress || "Not provided",
        reply_to: sanitizedData.email // Add reply_to parameter for better email delivery
      };

      console.log("Submitting form with EmailJS config:", {
        serviceId: config.serviceId,
        templateId: config.templateId,
        userIdLength: config.userId?.length || 0,
        destinationEmail: config.destinationEmail // Log the destination email
      });

      // Send email through EmailJS with error handling
      try {
        const response = await emailjs.send(
          config.serviceId,
          config.templateId,
          templateParams,
          config.userId
        );
        
        console.log("EmailJS response:", response);
        
        // Show success toast
        toast({
          title: "Quote request submitted securely",
          description: "Thank you for your interest. We'll get back to you within 2 business days.",
        });
        
        // Show the thank you message
        setIsSubmitted(true);
      } catch (emailJSError: any) {
        console.error("EmailJS error details:", emailJSError);
        
        // More specific error message based on the error type
        let errorMessage = "There was a problem submitting your form. Please try again or contact us directly.";
        
        if (emailJSError?.text) {
          console.log("EmailJS error text:", emailJSError.text);
        }
        
        if (emailJSError?.status === 413) {
          errorMessage = "There was an issue with your submission. Please try again.";
        } else if (emailJSError?.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (emailJSError?.status === 422) {
          errorMessage = "The form configuration appears to be invalid. Our team has been notified.";
          console.error("EmailJS 422 error - recipient configuration issue:", emailJSError);
        }
        
        toast({
          title: "Submission failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission failed:", error);
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
    onSubmit
  };
};
