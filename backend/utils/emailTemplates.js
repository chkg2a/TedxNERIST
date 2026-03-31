export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>Verify Your Email - TEDxNERIST</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .outer-pad { padding: 16px 12px !important; }
      .header-pad { padding: 28px 20px 24px 20px !important; }
      .body-pad { padding: 28px 20px !important; }
      .section-pad { padding: 0 20px 20px 20px !important; }
      .footer-pad { padding: 20px !important; }
      .otp-code { font-size: 30px !important; letter-spacing: 10px !important; padding: 14px 20px !important; }
      .otp-wrap { padding: 24px 16px !important; }
    }
  </style>
</head>

<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" class="outer-pad" style="padding:32px 16px;">

        <!-- Email Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;">

          <!-- Header -->
          <tr>
            <td align="center" class="header-pad" style="background-color:#0a0a0a;padding:32px 30px 28px 30px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="background-color:#EB0028;padding:8px 20px;border-radius:4px;">
                          <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">TED</span><span style="color:#ffffff;font-size:18px;font-weight:600;font-family:'Helvetica Neue',Arial,sans-serif;">x</span><span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:1px;font-family:'Helvetica Neue',Arial,sans-serif;">NERIST</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top:14px;">
                    <p style="color:rgba(255,255,255,0.55);margin:0;font-size:12px;font-weight:500;letter-spacing:2px;text-transform:uppercase;">Email Verification</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- OTP — shown FIRST for immediate mobile visibility -->
          <tr>
            <td align="center" class="otp-wrap" style="padding:36px 30px 28px 30px;background-color:#ffffff;border-bottom:1px solid #f0f0f0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="color:#888888;font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 20px 0;font-weight:600;">Your Verification Code</p>
                    <div class="otp-code" style="
                      display:inline-block;
                      font-size:38px;
                      font-weight:700;
                      letter-spacing:14px;
                      color:#0a0a0a;
                      font-family:'Courier New','Lucida Console',monospace;
                      background-color:#fafafa;
                      border:1.5px solid #e0e0e0;
                      border-radius:6px;
                      padding:16px 32px;
                    ">{verificationCode}</div>
                    <p style="color:#EB0028;font-size:12px;font-weight:600;margin:16px 0 0 0;">Expires in 15 minutes</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting + Context -->
          <tr>
            <td class="body-pad" style="padding:28px 36px 8px 36px;">
              <p style="color:#1a1a1a;font-size:16px;margin:0 0 10px 0;font-weight:600;">Hello,</p>
              <p style="color:#555555;font-size:14px;margin:0;line-height:1.7;">
                Thank you for registering with TEDxNERIST. Enter the code above on the verification page to activate your account.
              </p>
            </td>
          </tr>

          <!-- Steps -->
          <tr>
            <td class="section-pad" style="padding:20px 36px 24px 36px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f8f8f8;border-radius:6px;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="color:#1a1a1a;font-size:13px;font-weight:700;margin:0 0 12px 0;text-transform:uppercase;letter-spacing:0.8px;">How to verify</p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding:5px 0;vertical-align:top;width:26px;">
                          <span style="display:inline-block;width:20px;height:20px;background-color:#EB0028;color:#ffffff;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;">1</span>
                        </td>
                        <td style="padding:5px 0 5px 8px;color:#444444;font-size:13px;line-height:1.5;vertical-align:top;">
                          Open the verification page in your browser
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;vertical-align:top;width:26px;">
                          <span style="display:inline-block;width:20px;height:20px;background-color:#EB0028;color:#ffffff;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;">2</span>
                        </td>
                        <td style="padding:5px 0 5px 8px;color:#444444;font-size:13px;line-height:1.5;vertical-align:top;">
                          Enter the 6-digit code shown above
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;vertical-align:top;width:26px;">
                          <span style="display:inline-block;width:20px;height:20px;background-color:#EB0028;color:#ffffff;border-radius:50%;text-align:center;line-height:20px;font-size:10px;font-weight:700;">3</span>
                        </td>
                        <td style="padding:5px 0 5px 8px;color:#444444;font-size:13px;line-height:1.5;vertical-align:top;">
                          Your account will be activated immediately
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td class="section-pad" style="padding:0 36px 28px 36px;">
              <p style="color:#999999;font-size:12px;margin:0;line-height:1.6;border-top:1px solid #f0f0f0;padding-top:20px;">
                If you did not create a TEDxNERIST account, please ignore this email. Do not share this code with anyone.
              </p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td class="section-pad" style="padding:0 36px 32px 36px;">
              <p style="color:#333333;font-size:14px;margin:0;line-height:1.6;">
                Best regards,<br>
                <strong style="color:#0a0a0a;">TEDxNERIST Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="footer-pad" style="background-color:#0a0a0a;padding:24px 30px;">
              <p style="color:rgba(255,255,255,0.9);margin:0 0 4px 0;font-size:12px;font-weight:600;letter-spacing:0.5px;">Metamorphosis: Transform, Transcend, Triumph</p>
              <p style="color:rgba(255,255,255,0.35);font-size:11px;margin:0;">&copy; 2025 TEDxNERIST &middot; Operated under license from TED</p>
            </td>
          </tr>

        </table>
        <!-- End Email Card -->

        <!-- Below-card disclaimer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;">
          <tr>
            <td align="center" style="padding:16px 15px;">
              <p style="color:#aaaaaa;font-size:11px;margin:0;line-height:1.6;">
                This is an automated message &mdash; please do not reply.<br>
                For support, contact <a href="mailto:tedxnerist@gmail.com" style="color:#EB0028;text-decoration:none;">tedxnerist@gmail.com</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

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
        Metamorphosis: Transform, Transcend, Triumph
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
        Your journey to experience Transform, Transcend, Triumph begins now.<br>
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
      <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Metamorphosis: Transform, Transcend, Triumph</p>
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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Welcome to TEDxNERIST</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }

    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .outer-pad { padding: 18px 12px !important; }
      .header-pad { padding: 34px 22px !important; }
      .content-pad { padding: 28px 22px !important; }
      .section-pad { padding: 0 22px 22px !important; }
      .footer-pad { padding: 24px 22px !important; }
      .brand-text { font-size: 30px !important; }
      .hero-title { font-size: 24px !important; }
      .body-copy { font-size: 13px !important; line-height: 1.65 !important; }
      .list-copy { font-size: 13px !important; line-height: 1.6 !important; }
      .quote-copy { font-size: 13px !important; line-height: 1.6 !important; }
      .closing-copy { font-size: 12px !important; line-height: 1.65 !important; }
      .cta-link { display: block !important; padding: 12px 18px !important; font-size: 13px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#080808;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellspacing="0" cellpadding="0" style="width:100%;background-color:#080808;">
    <tr>
      <td align="center" class="outer-pad" style="padding:32px 16px;">
        <table width="100%" cellspacing="0" cellpadding="0" class="email-container" style="max-width:600px;background-color:#111111;border-radius:16px;overflow:hidden;border:1px solid #232323;">
          
          <!-- Header -->
          <tr>
            <td align="center" class="header-pad" style="background:linear-gradient(180deg,#050505 0%,#111111 100%);padding:44px 38px;">
              <h1 class="brand-text" style="margin:0;color:#EB0028;font-size:34px;font-weight:800;letter-spacing:1px;">
                TED<span style="color:#ffffff;">x</span><span style="color:#ffffff;font-weight:500;">NERIST</span>
              </h1>
              <p style="margin-top:12px;color:rgba(255,255,255,0.62);font-size:12px;letter-spacing:2px;text-transform:uppercase;">
                Welcome to the TEDxNERIST community
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content-pad" style="padding:34px 40px 24px;background-color:#111111;">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.56);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
                Registration confirmed
              </p>
              <h2 class="hero-title" style="margin:0 0 14px;color:#ffffff;font-size:28px;font-weight:700;line-height:1.25;">
                Welcome, \${name}
              </h2>

              <p class="body-copy" style="margin:0 0 14px;color:rgba(255,255,255,0.82);font-size:14px;line-height:1.75;">
                Thank you for joining <strong style="color:#ffffff;">TEDxNERIST</strong>, an independently organized TEDx event hosted at the North Eastern Regional Institute of Science and Technology.
              </p>

              <p class="body-copy" style="margin:0 0 14px;color:rgba(255,255,255,0.82);font-size:14px;line-height:1.75;">
                We bring together students, faculty, and thinkers through curated talks, fresh perspectives, and conversations that matter.
              </p>

              <p class="body-copy" style="margin:0;color:rgba(255,255,255,0.82);font-size:14px;line-height:1.75;">
                Your registration is confirmed, and we are excited to have you as part of the TEDxNERIST journey.
              </p>

              <!-- Divider -->
              <table width="100%" style="margin:26px 0 24px;">
                <tr>
                  <td height="1" style="background-color:#262626;"></td>
                </tr>
              </table>

              <!-- Benefits -->
              <p style="margin:0 0 12px;color:#ffffff;font-size:14px;font-weight:600;">
                As a member of TEDxNERIST, you will have access to:
              </p>

              <ul class="list-copy" style="margin:0;padding-left:20px;color:rgba(255,255,255,0.82);font-size:13px;line-height:1.75;">
                <li style="padding-bottom:8px;">Institute-hosted TEDx talks and speaker sessions</li>
                <li style="padding-bottom:8px;">Early invitations to TEDxNERIST flagship events</li>
                <li style="padding-bottom:8px;">Opportunities to engage with peers, faculty, and guest speakers</li>
                <li>A platform to explore and contribute innovative ideas</li>
              </ul>

              <!-- CTA -->
              <div style="text-align:center;margin-top:30px;">
                <a href="\${platformUrl}" class="cta-link" style="display:inline-block;background-color:#EB0028;color:#ffffff;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.3px;">
                  Explore TEDxNERIST
                </a>
              </div>
            </td>
          </tr>

          <!-- Quote -->
          <tr>
            <td class="section-pad" style="padding:0 40px 26px;background-color:#111111;">
              <div style="background-color:#0d0d0d;border-left:4px solid #EB0028;border-radius:12px;padding:18px 20px;">
                <p class="quote-copy" style="margin:0;font-style:italic;color:#ffffff;font-size:14px;line-height:1.7;">
                  "Ideas are the currency of the twenty-first century."
                </p>
                <p style="margin-top:8px;font-size:11px;color:rgba(255,255,255,0.5);font-weight:700;letter-spacing:0.4px;">
                  — Robert Metcalfe
                </p>
              </div>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td class="section-pad" style="padding:0 40px 36px;background-color:#111111;">
              
              <p class="closing-copy" style="margin:0;color:rgba(255,255,255,0.76);font-size:13px;line-height:1.8;">
                Should you require any assistance, please feel free to contact us at
                <a href="mailto:tedxnerist@gmail.com" style="color:#ffffff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.24);">
                  tedxnerist@gmail.com
                </a>.
              </p>

              <p class="closing-copy" style="margin:14px 0 0;color:rgba(255,255,255,0.76);font-size:13px;line-height:1.8;">
                We look forward to your active participation in TEDxNERIST initiatives.
              </p>

              <p class="closing-copy" style="margin-top:18px;color:#ffffff;font-size:13px;line-height:1.8;">
                Warm regards,<br>
                <strong style="color:#ffffff;">Team TEDxNERIST</strong><br>
                <span style="font-size:11px;color:rgba(255,255,255,0.5);">
                  North Eastern Regional Institute of Science and Technology (NERIST)
                </span>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="footer-pad" style="background-color:#090909;padding:28px 40px;border-top:1px solid #1f1f1f;">
              <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:0.8px;">
                TEDxNERIST
              </p>
              <p style="margin-top:8px;color:rgba(255,255,255,0.4);font-size:11px;line-height:1.6;">
                This independently organized TEDx event is operated under license from TED.<br>
                © 2026 TEDxNERIST. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

        <!-- Disclaimer -->
        <table width="100%" cellspacing="0" cellpadding="0" class="email-container" style="max-width:600px;">
          <tr>
            <td align="center" style="padding:16px 10px 0;color:#7f7f7f;font-size:11px;line-height:1.6;">
              You are receiving this email because you registered through the official TEDxNERIST platform.<br>
              North Eastern Regional Institute of Science and Technology (NERIST)
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
