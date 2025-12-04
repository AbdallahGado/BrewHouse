(()=>{var e={};e.id=483,e.ids=[483],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},77598:e=>{"use strict";e.exports=require("node:crypto")},97396:(e,r,o)=>{"use strict";o.r(r),o.d(r,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>f,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>u});var t={};o.r(t),o.d(t,{POST:()=>l});var a=o(42706),s=o(28203),i=o(45994),n=o(39187),d=o(14702);async function l(e){try{let{name:r,email:o,phone:t,date:a,time:s,guests:i}=await e.json();if(!r||!o||!t||!a||!s||!i)return n.NextResponse.json({error:"Missing required fields"},{status:400});let l=await (0,d.j)({name:r,email:o,phone:t,date:a,time:s,guests:i});if(!l.success)return n.NextResponse.json({error:"Failed to send confirmation email",details:l.error},{status:500});return n.NextResponse.json({success:!0,message:"Reservation confirmed! Check your email for details.",reservation:{name:r,email:o,date:a,time:s,guests:i}})}catch(e){return console.error("Reservation API error:",e),n.NextResponse.json({error:"Internal server error"},{status:500})}}let p=new a.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/reservations/route",pathname:"/api/reservations",filename:"route",bundlePath:"app/api/reservations/route"},resolvedPagePath:"D:\\Coffee Website Home Page\\src\\app\\api\\reservations\\route.ts",nextConfigOutput:"",userland:t}),{workAsyncStorage:c,workUnitAsyncStorage:u,serverHooks:f}=p;function g(){return(0,i.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:u})}},96487:()=>{},78335:()=>{},14702:(e,r,o)=>{"use strict";o.d(r,{j:()=>i,x:()=>n});var t=o(58072);let a=process.env.RESEND_API_KEY;if(!a)throw Error("RESEND_API_KEY is not set. Please check your environment variables.");let s=new t.u(a);async function i(e){try{let{data:r,error:o}=await s.emails.send({from:"BrewHouse <onboarding@resend.dev>",to:[e.email],subject:`Reservation Confirmation - ${e.date} at ${e.time}`,html:`
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
                <p>Dear ${e.name},</p>
                <p>Thank you for choosing BrewHouse! We're delighted to confirm your reservation.</p>
                
                <div class="details">
                  <h2 style="margin-top: 0; color: #78350f;">Reservation Details</h2>
                  <div class="detail-row">
                    <span class="label">Date:</span>
                    <span>${e.date}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Time:</span>
                    <span>${e.time}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Party Size:</span>
                    <span>${e.guests} ${1===e.guests?"guest":"guests"}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Contact:</span>
                    <span>${e.phone}</span>
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
                  <a href="tel:${e.phone}" class="button">Call Us</a>
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
      `});if(o)return{success:!1,error:o.message||"Unknown error"};return{success:!0,data:r}}catch(e){return console.error("Error sending email:",e),{success:!1,error:e}}}async function n(e){try{let{data:r,error:o}=await s.emails.send({from:"BrewHouse <onboarding@resend.dev>",to:[e.recipientEmail],subject:`You've Received a $${e.amount} BrewHouse Gift Card!`,html:`
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
                <p style="font-size: 16px;">Dear ${e.recipientName},</p>
                <p>Great news! ${e.senderName} has sent you a BrewHouse gift card. Treat yourself to our exceptional coffee, delicious pastries, or anything else from our menu!</p>
                
                ${e.message?`
                  <div class="message-box">
                    <p style="margin: 0 0 8px 0; font-weight: bold; color: #78350f;">Personal Message:</p>
                    <p style="margin: 0; font-style: italic; color: #44403c;">"${e.message}"</p>
                    <p style="margin: 10px 0 0 0; text-align: right; color: #78350f; font-weight: 500;">— ${e.senderName}</p>
                  </div>
                `:""}

                <div class="gift-card">
                  <h2 style="margin: 0 0 10px 0; font-size: 18px; opacity: 0.9;">Your Gift Card Value</h2>
                  <div class="amount">$${e.amount}</div>
                  
                  <div class="code-box">
                    <p style="margin: 0 0 8px 0; font-size: 14px; opacity: 0.8;">Your Redemption Code</p>
                    <div class="code">${e.code}</div>
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
                    <span>$${e.amount}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">From:</span>
                    <span>${e.senderName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Redemption Code:</span>
                    <span style="font-family: 'Courier New', monospace; font-weight: bold;">${e.code}</span>
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
      `});if(o)return{success:!1,error:o.message||"Unknown error"};return{success:!0,data:r}}catch(e){return console.error("Error sending gift card email:",e),{success:!1,error:e}}}}};var r=require("../../../webpack-runtime.js");r.C(e);var o=e=>r(r.s=e),t=r.X(0,[638,452,72],()=>o(97396));module.exports=t})();