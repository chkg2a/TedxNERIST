import { VERIFICATION_EMAIL_TEMPLATE } from "../utils/emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL;
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || "TEDxNERIST";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second base delay

/**
 * Core email sending function using the Brevo (Sendinblue) HTTP API.
 * Retries up to 3 times on failure with exponential backoff.
 *
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML body of the email
 * @returns {Promise<object>} - Brevo API response
 */
export const sendEmail = async (to, subject, htmlContent) => {
  const payload = {
    sender: {
      name: SMTP_FROM_NAME,
      email: SMTP_FROM_EMAIL,
    },
    to: [
      {
        email: to,
      },
    ],
    subject,
    htmlContent,
  };

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Brevo API error (${response.status}): ${errorBody}`
        );
      }

      const data = await response.json();
      console.log(
        `Email sent successfully to ${to} (attempt ${attempt}):`,
        data
      );
      return data;
    } catch (error) {
      lastError = error;
      console.error(
        `Email send attempt ${attempt}/${MAX_RETRIES} failed:`,
        error.message
      );

      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error(
    `All ${MAX_RETRIES} email send attempts failed for ${to}`
  );
  throw lastError;
};

/**
 * Send OTP verification email.
 */
export const sendOtp = async (userEmail, otp) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    otp
  );
  return sendEmail(userEmail, "OTP Verification Code", htmlContent);
};

/**
 * Send welcome email after successful registration.
 */
export const sendWelcomeEmail = async (email, name) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TEDxNERIST</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  
  <!-- Main Container -->
  <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header with TEDx Branding -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 50px 30px; text-align: center; position: relative;">
      <div style="display: inline-block; background-color: #EB0028; padding: 10px 24px; border-radius: 4px; margin-bottom: 20px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 1px;">TED<span style="font-size: 28px;">x</span>NERIST</h1>
      </div>
      <p style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 300; letter-spacing: 0.5px;">Welcome to Our Community</p>
      <div style="width: 80px; height: 3px; background-color: #EB0028; margin: 20px auto 0 auto; border-radius: 2px;"></div>
    </div>
    
    <!-- Content Section -->
    <div style="padding: 40px 35px; background-color: #ffffff;">
      
      <p style="color: #333; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">Hi ${name},</p>
      
      <p style="color: #666; font-size: 15px; margin: 0 0 20px 0; line-height: 1.7;">
        We're thrilled to welcome you to <strong>TEDxNERIST</strong> – a platform dedicated to spreading <strong>ideas worth spreading</strong> within our vibrant campus community!
      </p>
      
      <!-- Feature Highlights -->
      <div style="background: linear-gradient(to right, #f9f9f9, #ffffff); border-left: 4px solid #EB0028; padding: 25px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #000; font-size: 16px; margin: 0 0 15px 0; font-weight: 700;">What Awaits You:</h3>
        <ul style="color: #666; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.9;">
          <li><strong>Inspiring Talks:</strong> Access to thought-provoking presentations and speaker events</li>
          <li><strong>Engage & Connect:</strong> Network with innovators, thinkers, and changemakers at NERIST</li>
          <li><strong>Exclusive Updates:</strong> Stay informed about upcoming TEDx events and opportunities</li>
          <li><strong>Community Impact:</strong> Be part of a movement that celebrates ideas and innovation</li>
        </ul>
      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin: 35px 0;">
        <p style="color: #666; font-size: 14px; margin: 0 0 20px 0;">Ready to dive into the world of ideas?</p>
        <a href="{platformUrl}" style="display: inline-block; background-color: #EB0028; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background-color 0.3s;">Explore TEDxNERIST</a>
      </div>
      
      <!-- Support Section -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 30px 0 25px 0;">
        <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Have Questions?</p>
        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">
          We're here to help! Whether you want to attend an event, become a speaker, or get involved, feel free to <a href="mailto:neriststore@gmail.com" style="color: #EB0028; text-decoration: none; font-weight: 600;">reach out to us</a>.
        </p>
      </div>
      
      <!-- Quote Section -->
      <div style="border-left: 3px solid #EB0028; padding-left: 20px; margin: 30px 0;">
        <p style="color: #666; font-size: 14px; font-style: italic; margin: 0; line-height: 1.6;">
          "Ideas are the currency of the twenty-first century. Some people are really good at it, some people aren't."
        </p>
        <p style="color: #999; font-size: 12px; margin: 8px 0 0 0;">— Robert Metcalfe</p>
      </div>
      
      <p style="color: #333; font-size: 15px; margin: 25px 0 5px 0;">Welcome to the community of idea-spreaders!</p>
      <p style="color: #333; font-size: 15px; margin: 0;">
        Best regards,<br>
        <strong>The TEDxNERIST Team</strong>
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #000000; padding: 30px; text-align: center;">
      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Ideas Worth Spreading</p>
      <p style="color: #999; font-size: 12px; margin: 0 0 15px 0;">
        Join us in celebrating innovation, creativity, and meaningful conversations
      </p>
      <p style="color: #666; font-size: 11px; margin: 0;">
        © 2025 TEDxNERIST. This independent TEDx event is operated under license from TED.<br>
        All rights reserved.
      </p>
    </div>
    
  </div>
  
  <!-- Disclaimer -->
  <div style="text-align: center; margin-top: 20px; padding: 10px;">
    <p style="color: #888; font-size: 12px; margin: 0; line-height: 1.6;">
      You're receiving this email because you joined TEDxNERIST.<br>
      This is an automated message, please do not reply to this email.
    </p>
  </div>
  
</body>
</html>
`;
  return sendEmail(email, "Welcome to TEDxNERIST", htmlContent);
};
