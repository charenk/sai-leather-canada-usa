
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Globe, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import emailjs from 'emailjs-com';
import { getEmailJSConfig } from '@/services/config';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    
    try {
      const config = getEmailJSConfig();
      
      // Validate the EmailJS config
      if (!config.serviceId || !config.templateId || !config.userId) {
        throw new Error("EmailJS configuration is incomplete. Please set up your EmailJS credentials.");
      }
      
      // Create template params
      const templateParams = {
        to_email: config.destinationEmail,
        from_name: formData.name,
        company_name: formData.company || "Not provided",
        from_email: formData.email,
        phone: formData.phone || "Not provided",
        subject: formData.subject,
        message: formData.message
      };

      console.log("Sending email with params:", templateParams);
      console.log("Using EmailJS config:", {
        serviceId: config.serviceId,
        templateId: config.templateId,
        userId: "HIDDEN" // Don't log the actual userId for security
      });

      // Send email through EmailJS
      await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams,
        config.userId
      );
      
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
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-sai-red hover:bg-sai-red/90 w-full"
                  size="lg"
                  disabled={isSubmitting}
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
