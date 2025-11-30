import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
      from: 'BrewHouse <onboarding@resend.dev>', // Use your verified domain
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
                    <span>${data.guests} ${data.guests === 1 ? 'guest' : 'guests'}</span>
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
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
