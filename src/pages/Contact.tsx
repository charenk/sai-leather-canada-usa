
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Globe, MapPin, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import emailjs from 'emailjs-com';
import { getEmailJSConfig, SUBMISSION_LIMIT, SUBMISSION_TIMEFRAME_MS } from '@/services/config';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Check rate limiting on component mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    const submissionHistory = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const now = Date.now();
    
    // Filter out submissions older than the timeframe
    const recentSubmissions = submissionHistory.filter(
      (timestamp: number) => now - timestamp < SUBMISSION_TIMEFRAME_MS
    );
    
    // Update storage with only recent submissions
    localStorage.setItem('contactSubmissions', JSON.stringify(recentSubmissions));
    
    // Check if user is rate limited
    if (recentSubmissions.length >= SUBMISSION_LIMIT) {
      setIsRateLimited(true);
      setFormError(`Maximum submission limit reached. Please try again later.`);
    }
  };

  const updateSubmissionHistory = () => {
    const submissionHistory = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const updatedHistory = [...submissionHistory, Date.now()];
    localStorage.setItem('contactSubmissions', JSON.stringify(updatedHistory));
    
    // Re-check rate limit
    checkRateLimit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow empty phone (it's optional) or validate if provided
    if (!phone) return true;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const sanitizeInput = (input: string): string => {
    // Basic sanitization - remove script tags and HTML
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    
    // Check rate limiting first
    if (isRateLimited) {
      setFormError("Maximum submission limit reached. Please try again later.");
      setIsSubmitting(false);
      return;
    }
    
    // Validate inputs
    if (!validateEmail(formData.email)) {
      setFormError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      setFormError("Please enter a valid phone number or leave it blank");
      setIsSubmitting(false);
      return;
    }
    
    try {
      const config = getEmailJSConfig();
      
      // Validate the EmailJS config
      if (!config.serviceId || !config.templateId || !config.userId) {
        throw new Error("EmailJS configuration is incomplete. Please contact support.");
      }
      
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: formData.email.trim().toLowerCase(), // Email needs special handling
        company: sanitizeInput(formData.company),
        phone: sanitizeInput(formData.phone),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };
      
      // Create template params
      const templateParams = {
        to_email: config.destinationEmail,
        from_name: sanitizedData.name,
        company_name: sanitizedData.company || "Not provided",
        from_email: sanitizedData.email,
        phone: sanitizedData.phone || "Not provided",
        subject: sanitizedData.subject,
        message: sanitizedData.message
      };

      console.log("Sending email with params:", templateParams);
      
      // Send email through EmailJS
      await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.userId
      );
      
      // Update submission history for rate limiting
      updateSubmissionHistory();
      
      setFormSuccess("Thank you for your message. We'll get back to you soon!");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormError("There was a problem sending your message. Please try again or contact us directly.");
      toast({
        title: "Submission failed",
        description: "There was a problem sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-16">
      <div className="section-container">
        <SectionHeading 
          title="Contact Us" 
          subtitle="We're excited to hear from you. Reach out to discuss how we can meet your leather manufacturing needs."
          alignment="center"
        />
        
        <div className="mt-12 flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="w-full lg:w-1/3 space-y-10">
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-sai-navy">Contact Information</h3>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-sai-red mt-1 mr-3" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+919840060444" className="text-gray-600 hover:text-sai-red">
                    +91 9840060444
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-sai-red mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:raju@saiintl.co.in" className="text-gray-600 hover:text-sai-red">
                    raju@saiintl.co.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-sai-red mt-1 mr-3" />
                <div>
                  <p className="font-medium">Website</p>
                  <a href="https://www.saiintl.co.in" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sai-red">
                    www.saiintl.co.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-sai-red mt-1 mr-3" />
                <div>
                  <p className="font-medium">Address</p>
                  <address className="text-gray-600 not-italic">
                    17/5 NAVANEETHAMMAL STREET AMINJIKARAI<br />
                    Chennai, Tamil Nadu 600029<br />
                    India
                  </address>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-sai-navy mb-4">North America Office</h3>
              <address className="text-gray-600 not-italic">
                456 Fashion Avenue<br />
                Suite 789<br />
                Toronto, ON M5V 2T6<br />
                Canada
              </address>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-sai-navy mb-6">Send us a Message</h3>
              
              {formError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              
              {formSuccess && (
                <Alert variant="success" className="mb-6">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{formSuccess}</AlertDescription>
                </Alert>
              )}
              
              {isRateLimited && (
                <Alert variant="warning" className="mb-6">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Rate Limit Reached</AlertTitle>
                  <AlertDescription>You've reached the maximum number of form submissions. Please try again later.</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input 
                      id="name"
                      placeholder="Enter your name"
                      required
                      maxLength={100}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      maxLength={100}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company Name
                    </label>
                    <Input 
                      id="company"
                      placeholder="Enter your company name"
                      maxLength={100}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      placeholder="Enter your phone number"
                      maxLength={20}
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input 
                    id="subject"
                    placeholder="What is this regarding?"
                    required
                    maxLength={200}
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="How can we help you?"
                    rows={6}
                    required
                    maxLength={2000}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-sai-red hover:bg-sai-red/90 w-full"
                  size="lg"
                  disabled={isSubmitting || isRateLimited}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
