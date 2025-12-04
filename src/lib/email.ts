import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error(
    "RESEND_API_KEY is not set. Please check your environment variables."
  );
}
const resend = new Resend(resendApiKey);

export async function sendReservationEmail(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "BrewHouse <onboarding@resend.dev>", // Replace with your verified domain email after verifying your domain on Resend
      to: [data.email],
      subject: `Reservation Confirmation - ${data.date} at ${data.time}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #78350f 0%, #92400e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
              .details { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
              .label { font-weight: bold; color: #78350f; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
              .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">☕ BrewHouse</h1>
                <p style="margin: 10px 0 0 0;">Your Table is Reserved!</p>
              </div>
              <div class="content">
                <p>Dear ${data.name},</p>
                <p>Thank you for choosing BrewHouse! We're delighted to confirm your reservation.</p>
                
                <div class="details">
                  <h2 style="margin-top: 0; color: #78350f;">Reservation Details</h2>
                  <div class="detail-row">
                    <span class="label">Date:</span>
                    <span>${data.date}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Time:</span>
                    <span>${data.time}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Party Size:</span>
                    <span>${data.guests} ${
        data.guests === 1 ? "guest" : "guests"
      }</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Contact:</span>
                    <span>${data.phone}</span>
                  </div>
                </div>

                <p><strong>What to expect:</strong></p>
                <ul>
                  <li>We'll have your table ready 10 minutes before your reservation time</li>
                  <li>Please arrive within 15 minutes of your reservation time</li>
                  <li>Our full menu will be available for your dining pleasure</li>
                </ul>

                <p>If you need to modify or cancel your reservation, please contact us at least 2 hours in advance.</p>

                <center>
                  <a href="tel:${data.phone}" class="button">Call Us</a>
                </center>
              </div>
              <div class="footer">
                <p><strong>BrewHouse Coffee</strong></p>
                <p>123 Coffee Street, Bean City, BC 12345</p>
                <p>Phone: (555) 123-4567 | Email: hello@brewhouse.com</p>
                <p style="margin-top: 15px; font-size: 12px;">This is an automated confirmation email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return { success: false, error: error.message || "Unknown error" };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export async function sendGiftCardEmail(data: {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  amount: number;
  code: string;
  message?: string;
}) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "BrewHouse <onboarding@resend.dev>", // Replace with your verified domain email after verifying your domain on Resend
      to: [data.recipientEmail],
      subject: `You've Received a $${data.amount} BrewHouse Gift Card!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #78350f 0%, #92400e 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
              .gift-icon { font-size: 48px; margin-bottom: 10px; }
              .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
              .gift-card { background: linear-gradient(135deg, #78350f 0%, #92400e 100%); color: white; padding: 30px; border-radius: 12px; margin: 25px 0; text-align: center; position: relative; overflow: hidden; }
              .gift-card::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200px; height: 200px; background: rgba(217, 119, 6, 0.2); border-radius: 50%; }
              .amount { font-size: 48px; font-weight: bold; color: #d97706; margin: 15px 0; }
              .code-box { background: rgba(255, 255, 255, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px dashed rgba(217, 119, 6, 0.5); }
              .code { font-size: 24px; font-weight: bold; letter-spacing: 3px; color: #fbbf24; font-family: 'Courier New', monospace; }
              .message-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d97706; }
              .details { margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; margin: 12px 0; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
              .label { font-weight: bold; color: #78350f; }
              .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #6b7280; font-size: 14px; }
              .button { display: inline-block; background: #d97706; color: white; padding: 14px 35px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
              .instructions { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="gift-icon">🎁</div>
                <h1 style="margin: 0; font-size: 32px;">You've Got a Gift!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A BrewHouse Gift Card is Waiting for You</p>
              </div>
              <div class="content">
                <p style="font-size: 16px;">Dear ${data.recipientName},</p>
                <p>Great news! ${
                  data.senderName
                } has sent you a BrewHouse gift card. Treat yourself to our exceptional coffee, delicious pastries, or anything else from our menu!</p>
                
                ${
                  data.message
                    ? `
                  <div class="message-box">
                    <p style="margin: 0 0 8px 0; font-weight: bold; color: #78350f;">Personal Message:</p>
                    <p style="margin: 0; font-style: italic; color: #44403c;">"${data.message}"</p>
                    <p style="margin: 10px 0 0 0; text-align: right; color: #78350f; font-weight: 500;">— ${data.senderName}</p>
                  </div>
                `
                    : ""
                }

                <div class="gift-card">
                  <h2 style="margin: 0 0 10px 0; font-size: 18px; opacity: 0.9;">Your Gift Card Value</h2>
                  <div class="amount">$${data.amount}</div>
                  
                  <div class="code-box">
                    <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.8;">Your Redemption Code</p>
                    <div class="code">${data.code}</div>
                  </div>
                  
                  <p style="margin: 15px 0 0 0; font-size: 13px; opacity: 0.7;">Present this code at checkout</p>
                </div>

                <div class="instructions">
                  <h3 style="margin: 0 0 15px 0; color: #065f46;">How to Redeem:</h3>
                  <ol style="margin: 0; padding-left: 20px; color: #065f46;">
                    <li style="margin-bottom: 8px;">Visit any BrewHouse location or shop online</li>
                    <li style="margin-bottom: 8px;">Choose your favorite items from our menu</li>
                    <li style="margin-bottom: 8px;">Show this code at checkout or enter it online</li>
                    <li style="margin-bottom: 8px;">Enjoy your treats on us!</li>
                  </ol>
                </div>

                <div class="details">
                  <div class="detail-row">
                    <span class="label">Gift Card Value:</span>
                    <span>$${data.amount}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">From:</span>
                    <span>${data.senderName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Redemption Code:</span>
                    <span style="font-family: 'Courier New', monospace; font-weight: bold;">${
                      data.code
                    }</span>
                  </div>
                  <div class="detail-row" style="border-bottom: none;">
                    <span class="label">Expiration:</span>
                    <span style="color: #10b981; font-weight: 600;">Never Expires!</span>
                  </div>
                </div>

                <center>
                  <a href="https://brewhouse.com/menu" class="button">Start Shopping</a>
                </center>

                <p style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
                  <strong>Note:</strong> This gift card can be used for any purchase at BrewHouse locations or online. 
                  Not redeemable for cash. Please keep this email safe for your records.
                </p>
              </div>
              <div class="footer">
                <p><strong>☕ BrewHouse Coffee</strong></p>
                <p>123 Coffee Street, Bean City, BC 12345</p>
                <p>Phone: (555) 123-4567 | Email: hello@brewhouse.com</p>
                <p style="margin-top: 15px; font-size: 12px;">This is an automated gift card delivery email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return { success: false, error: error.message || "Unknown error" };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Error sending gift card email:", error);
    return { success: false, error };
  }
}
