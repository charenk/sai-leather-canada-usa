
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

// These values should be replaced with environment variables in a production setup
// For Lovable, you'd want to use Supabase Secrets or a similar solution
// This is a temporary solution for demonstration purposes
const emailjsConfig: EmailJSConfig = {
  serviceId: "SERVICE_ID", // Replace with your EmailJS service ID
  templateId: "TEMPLATE_ID", // Replace with your EmailJS template ID
  userId: "USER_ID", // Replace with your EmailJS user ID (public key)
  destinationEmail: "your-receiving-email@example.com", // Change to your email
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
