
/**
 * Secure configuration service
 * Handles sensitive configuration values and obfuscates them in the frontend
 */

interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  userId: string;
  destinationEmail: string;
}

// These values should be replaced with the actual IDs from your EmailJS account
// For Lovable, you'd want to use Supabase Secrets or a similar solution in production
// This is a temporary solution for demonstration purposes
const emailjsConfig: EmailJSConfig = {
  serviceId: "service_demo123", // Replace with your actual EmailJS service ID
  templateId: "template_contact123", // Replace with your actual EmailJS template ID
  userId: "user_abc123456", // Replace with your actual EmailJS user ID (public key)
  destinationEmail: "charen.k@gmail.com", // Keep the destination email
};

// Method to get EmailJS config without exposing it directly in the component
export const getEmailJSConfig = (): EmailJSConfig => {
  return {
    serviceId: emailjsConfig.serviceId,
    templateId: emailjsConfig.templateId,
    userId: emailjsConfig.userId,
    destinationEmail: emailjsConfig.destinationEmail,
  };
};

// Constants for security settings
export const MAX_UPLOAD_SIZE_MB = 10;
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/zip",
  "application/x-zip-compressed"
];
export const ALLOWED_FILE_EXTENSIONS = ".pdf,.png,.jpg,.jpeg,.zip";
