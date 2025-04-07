import { Resend } from "resend";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const emailConfig = {
  from: process.env.EMAIL_FROM || "contact-form@darlan-tane.fr",
  to: process.env.EMAIL_TO || "darlan.tane@gmail.com",
};

// Send email function
export async function sendEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = data;

  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to: emailConfig.to,
      subject: `New Contact Form Submission from ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #71B023;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <h3 style="margin-top: 20px;">Message:</h3>
  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
  <p style="margin-top: 20px; color: #666;">This message was sent from your portfolio website contact form.</p>
</div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Email sent successfully", data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
}
