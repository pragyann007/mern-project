import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()


const transport = nodemailer.createTransport({
    service:"Gmail",
    port:465,
    secure:true,
   auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
   }
});

export const sendOtpMail = async (to, otp, appName = "Vingo") => {
    await transport.sendMail({
      from: process.env.EMAIL,
      to,
      subject: `${appName}: Reset Your Password`,
      html: `
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your ${appName} password reset code is ${otp}. It expires soon.
  </div>
  
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f7fb;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e9edf5;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:28px 24px;background:#111827;">
              <h1 style="margin:0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:22px;line-height:28px;color:#ffffff;">
                ${appName}
              </h1>
            </td>
          </tr>
  
          <!-- Hero -->
          <tr>
            <td align="left" style="padding:28px 28px 12px 28px;">
              <h2 style="margin:0 0 10px 0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:20px;line-height:28px;color:#111827;">
                Reset your password
              </h2>
              <p style="margin:0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#4b5563;">
                Use the one-time code below to continue. For your security, this code will expire in <strong>10 minutes</strong>.
              </p>
            </td>
          </tr>
  
          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding:18px 28px 6px 28px;">
              <div style="display:inline-block;padding:14px 22px;border-radius:10px;border:1px solid #ffe0d9;background:#fff6f4;">
                <span style="font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:26px;letter-spacing:4px;font-weight:700;color:#ff4d2d;">
                  ${otp}
                </span>
              </div>
            </td>
          </tr>
  
          <!-- Button (optional: link to reset page) -->
          <tr>
            <td align="center" style="padding:6px 28px 22px 28px;">
              <a href="#" 
                 style="display:inline-block;text-decoration:none;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;padding:12px 18px;border-radius:10px;background:#ff4d2d;color:#ffffff;">
                Open reset page
              </a>
            </td>
          </tr>
  
          <!-- Help text -->
          <tr>
            <td align="left" style="padding:0 28px 22px 28px;">
              <p style="margin:0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:20px;color:#6b7280;">
                Didn’t request this? You can safely ignore this email. Someone might have entered your email by mistake.
              </p>
            </td>
          </tr>
  
          <!-- Divider -->
          <tr>
            <td style="padding:0 28px;">
              <hr style="border:none;border-top:1px solid #e9edf5;margin:0;">
            </td>
          </tr>
  
          <!-- Footer -->
          <tr>
            <td align="left" style="padding:18px 28px 26px 28px;">
              <p style="margin:0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#94a3b8;">
                This email was sent by ${appName}. Please don’t share your OTP with anyone.
              </p>
              <p style="margin:6px 0 0 0;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#94a3b8;">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
  
        <!-- Tiny spacer -->
        <div style="height:16px;">&nbsp;</div>
  
        <!-- Accessibility fallback -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;">
          <tr>
            <td align="center" style="font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:16px;color:#9ca3af;">
              Having trouble? Copy your code manually: <span style="font-family:SFMono-Regular,Menlo,Monaco,Consolas,monospace;color:#6b7280;">${otp}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
      `,
    });
  };
  