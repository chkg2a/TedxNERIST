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
