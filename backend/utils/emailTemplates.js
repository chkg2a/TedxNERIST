export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>

<body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  
  <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center;">
      <div style="display: inline-block; background-color: #EB0028; padding: 8px 20px; border-radius: 4px; margin-bottom: 15px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
          TED<span style="font-size: 24px;">x</span>NERIST
        </h1>
      </div>
      <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 300;">Verify Your Email</p>
    </div>
    
    <!-- Content -->
    <div style="padding: 40px 30px; background-color: #ffffff;">
      
      <p style="color: #333; font-size: 16px; margin: 0 0 10px 0;">Hello,</p>
      <p style="color: #666; font-size: 15px; margin: 0 0 30px 0; line-height: 1.6;">
        Welcome to TEDxNERIST! To complete your registration, please use the verification code below:
      </p>
      
      <!-- OTP Box -->
      <div style="background: linear-gradient(to right, #f9f9f9, #ffffff); border-left: 4px solid #EB0028; padding: 26px; border-radius: 8px; text-align: center; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">
          Your Verification Code
        </p>
        
        <div style="
          font-size: 34px;
          font-weight: 800;
          letter-spacing: 5px;
          color: #000000;
          font-family: 'Courier New', monospace;
          margin: 8px 0;
          white-space: nowrap;
          word-break: keep-all;
          overflow: hidden;
          text-overflow: ellipsis;
        ">
          {verificationCode}
        </div>

        <div style="width: 60px; height: 3px; background-color: #EB0028; margin: 18px auto 0 auto; border-radius: 2px;"></div>
      </div>
      
      <!-- Instructions -->
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">Next Steps:</p>
        <ul style="color: #666; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>Enter this code on the verification page</li>
          <li>This code will expire in <strong>15 minutes</strong></li>
          <li>Keep this code confidential</li>
        </ul>
      </div>
      
      <!-- Security Notice -->
      <div style="background-color: #fff8f8; border-left: 4px solid #EB0028; padding: 20px; border-radius: 8px; margin-top: 25px;">
        <p style="color: #EB0028; font-size: 14px; margin: 0 0 8px 0; font-weight: 700;">Security Notice</p>
        <p style="color: #666; font-size: 13px; margin: 0; line-height: 1.6;">
          If you didn't create an account with us, please ignore this email. Your account will not be created without verification.
        </p>
      </div>
      
      <p style="color: #333; font-size: 15px; margin: 30px 0 0 0;">
        Best regards,<br>
        <strong>TEDxNERIST Team</strong>
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="background-color: #000000; padding: 25px; text-align: center;">
      <p style="color: #ffffff; margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Ideas Worth Spreading</p>
      <p style="color: #999; font-size: 12px; margin: 0;">
        © 2025 TEDxNERIST. This independent TEDx event is operated under license from TED.
      </p>
    </div>
    
  </div>
  
  <!-- Disclaimer -->
  <div style="text-align: center; margin-top: 20px; padding: 10px;">
    <p style="color: #888; font-size: 12px; margin: 0; line-height: 1.6;">
      This is an automated message, please do not reply to this email.
    </p>
  </div>
  
</body>
</html>
`;

export const WELCOME_TICKET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your TEDxNERIST Ticket</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>

<body style="font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);">
  
  <div style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.4);">
    
    <!-- Header Banner -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%); padding: 50px 30px; text-align: center; position: relative;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #EB0028, #ff4757, #EB0028);"></div>
      
      <div style="display: inline-block; background-color: #EB0028; padding: 12px 28px; border-radius: 6px; margin-bottom: 20px; box-shadow: 0 8px 25px rgba(235, 0, 40, 0.4);">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: 2px;">
          TED<span style="font-size: 26px; font-weight: 600;">x</span>NERIST
        </h1>
      </div>
      
      <p style="color: #ffffff; margin: 15px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 3px; font-weight: 500;">
        Ideas Worth Spreading
      </p>
    </div>
    
    <!-- Welcome Message -->
    <div style="padding: 40px 35px 20px 35px; text-align: center; background: linear-gradient(to bottom, #f8f8f8, #ffffff);">
      <div style="display: inline-block; background: linear-gradient(135deg, #EB0028 0%, #ff4757 100%); padding: 10px 25px; border-radius: 30px; margin-bottom: 20px;">
        <span style="color: #ffffff; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">🎉 Registration Confirmed</span>
      </div>
      
      <h2 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 10px 0;">
        Welcome, <span style="color: #EB0028;">{userName}</span>!
      </h2>
      
      <p style="color: #666; font-size: 16px; margin: 0; line-height: 1.7;">
        Your journey to experience ideas worth spreading begins now.<br>
        Here's your exclusive event ticket.
      </p>
    </div>
    
    <!-- Ticket Container -->
    <div style="padding: 25px 35px;">
      <div style="background: linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.2); position: relative;">
        
        <!-- Ticket Decorative Elements -->
        <div style="position: absolute; top: 50%; left: -12px; width: 24px; height: 24px; background-color: #ffffff; border-radius: 50%;"></div>
        <div style="position: absolute; top: 50%; right: -12px; width: 24px; height: 24px; background-color: #ffffff; border-radius: 50%;"></div>
        
        <!-- Ticket Header -->
        <div style="background: linear-gradient(90deg, #EB0028, #ff3d50); padding: 20px 25px; text-align: center;">
          <p style="color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin: 0 0 5px 0; font-weight: 500;">Event Ticket</p>
          <p style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: 1px;">TEDxNERIST 2025</p>
        </div>
        
        <!-- Ticket Body -->
        <div style="padding: 30px 25px;">
          
          <!-- Attendee Name -->
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 25px; border-bottom: 1px dashed rgba(255,255,255,0.15);">
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px 0;">Attendee</p>
            <p style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0;">{userName}</p>
          </div>
          
          <!-- Ticket Details Grid -->
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; width: 50%; vertical-align: top;">
                <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0;">📧 Email</p>
                <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0; word-break: break-all;">{userEmail}</p>
              </td>
              <td style="padding: 12px 0; width: 50%; vertical-align: top;">
                <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0;">📱 WhatsApp</p>
                <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0;">{userPhone}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; vertical-align: top;">
                <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0;">🏛️ Department</p>
                <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0;">{userDepartment}</p>
              </td>
              <td style="padding: 12px 0; vertical-align: top;">
                <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0;">📅 Year</p>
                <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0;">{userYear}</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px 0; vertical-align: top;">
                <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 5px 0;">🎓 Roll Number</p>
                <p style="color: #ffffff; font-size: 14px; font-weight: 500; margin: 0;">{userRollNo}</p>
              </td>
            </tr>
          </table>
          
          <!-- Ticket ID Section -->
          <div style="margin-top: 25px; padding-top: 25px; border-top: 1px dashed rgba(255,255,255,0.15); text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 10px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 10px 0;">🎫 Ticket ID</p>
            <div style="background: linear-gradient(135deg, rgba(235,0,40,0.2), rgba(255,61,80,0.1)); border: 2px solid rgba(235,0,40,0.5); border-radius: 12px; padding: 15px 20px; display: inline-block;">
              <p style="color: #EB0028; font-size: 22px; font-weight: 800; letter-spacing: 4px; margin: 0; font-family: 'Courier New', monospace;">{ticketId}</p>
            </div>
          </div>
          
        </div>
        
        <!-- Ticket Footer -->
        <div style="background: rgba(0,0,0,0.3); padding: 15px 25px; text-align: center;">
          <p style="color: rgba(255,255,255,0.6); font-size: 11px; margin: 0;">
            Present this ticket at the event entrance for check-in
          </p>
        </div>
        
      </div>
    </div>
    
    <!-- Event Details -->
    <div style="padding: 25px 35px;">
      <div style="background: linear-gradient(135deg, #f8f8f8 0%, #ffffff 100%); border-radius: 16px; padding: 25px; border: 1px solid rgba(0,0,0,0.05);">
        <h3 style="color: #1a1a1a; font-size: 18px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">
          📍 Event Information
        </h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 15px; vertical-align: top; width: 50%;">
              <div style="display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 10px;">📅</span>
                <div>
                  <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 3px 0;">Date</p>
                  <p style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0;">Coming Soon</p>
                </div>
              </div>
            </td>
            <td style="padding: 10px 15px; vertical-align: top; width: 50%;">
              <div style="display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 10px;">⏰</span>
                <div>
                  <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 3px 0;">Time</p>
                  <p style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0;">To Be Announced</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 10px 15px; vertical-align: top;">
              <div style="display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 10px;">🏟️</span>
                <div>
                  <p style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 3px 0;">Venue</p>
                  <p style="color: #1a1a1a; font-size: 14px; font-weight: 600; margin: 0;">NERIST, Nirjuli, Arunachal Pradesh</p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    
    <!-- Important Notes -->
    <div style="padding: 0 35px 30px 35px;">
      <div style="background: linear-gradient(135deg, #fff8f8 0%, #ffefef 100%); border-left: 4px solid #EB0028; border-radius: 12px; padding: 20px 25px;">
        <h4 style="color: #EB0028; font-size: 14px; font-weight: 700; margin: 0 0 12px 0;">
          ⚠️ Important Notes
        </h4>
        <ul style="color: #666; font-size: 13px; margin: 0; padding-left: 18px; line-height: 1.8;">
          <li>Please arrive <strong>30 minutes before</strong> the event starts</li>
          <li>Carry a <strong>valid ID proof</strong> for verification</li>
          <li>This ticket is <strong>non-transferable</strong></li>
          <li>Screenshot this email or show it on your phone at entry</li>
        </ul>
      </div>
    </div>
    
    <!-- Social Links -->
    <div style="padding: 0 35px 30px 35px; text-align: center;">
      <p style="color: #666; font-size: 13px; margin: 0 0 15px 0;">Stay connected with us:</p>
      <div>
        <a href="#" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 12px; font-weight: 600;">Instagram</a>
        <a href="#" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 12px; font-weight: 600;">LinkedIn</a>
        <a href="#" style="display: inline-block; margin: 0 8px; padding: 10px 20px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 25px; font-size: 12px; font-weight: 600;">Twitter</a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); padding: 35px 30px; text-align: center;">
      <div style="display: inline-block; background-color: #EB0028; padding: 6px 16px; border-radius: 4px; margin-bottom: 15px;">
        <p style="color: #ffffff; margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 1px;">
          TED<span style="font-size: 14px;">x</span>NERIST
        </p>
      </div>
      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Ideas Worth Spreading</p>
      <p style="color: #888; font-size: 12px; margin: 0;">
        © 2025 TEDxNERIST. This independent TEDx event is operated under license from TED.
      </p>
    </div>
    
  </div>
  
  <!-- Disclaimer -->
  <div style="text-align: center; margin-top: 25px; padding: 15px;">
    <p style="color: #999; font-size: 11px; margin: 0; line-height: 1.6;">
      This is an automated message. Please do not reply to this email.<br>
      For any queries, contact us at <a href="mailto:tedxnerist@gmail.com" style="color: #EB0028; text-decoration: none;">tedxnerist@gmail.com</a>
    </p>
  </div>
  
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
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
      
      <p style="color: #333; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">Hi \${name},</p>
      
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
