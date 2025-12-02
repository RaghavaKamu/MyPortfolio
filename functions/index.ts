import * as functions from "firebase-functions";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Shared handler for contact form submissions
const handleContact = async (req: express.Request, res: express.Response) => {
  try {
    console.log("Contact API hit:", req.method, req.path);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Read SMTP configuration from Firebase Functions config or environment
    const cfg = functions.config() as any;
    const smtpHost = cfg.smtp?.host || process.env.SMTP_HOST;
    const smtpPort = Number(cfg.smtp?.port || process.env.SMTP_PORT || 587);
    const smtpUser = cfg.smtp?.user || process.env.SMTP_USER;
    const smtpPass = cfg.smtp?.pass || process.env.SMTP_PASS;
    const contactTo =
      (cfg.contact && cfg.contact.to) ||
      process.env.CONTACT_TO ||
      smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New message from ${name} <${email}>:\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error in contact form submission (functions):", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Support both "/api/contact" (via hosting rewrite) and "/contact" (direct)
app.post("/api/contact", handleContact);
app.post("/contact", handleContact);

// Export the Express app as a Firebase Function named "api"
export const api = functions.https.onRequest(app);
