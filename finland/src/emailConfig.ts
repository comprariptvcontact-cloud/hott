/**
 * EmailJS configuration for customer registration notifications.
 *
 * Setup steps:
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
 * 3. Create an Email Template with these variables:
 *    {{from_name}}, {{from_email}}, {{phone}}, {{plan}}, {{message}}, {{timestamp}}
 * 4. Copy the Template ID and your Public Key (Account → API Keys)
 * 5. Replace the values below
 */

export const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
export const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
export const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
