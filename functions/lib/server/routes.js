"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
async function registerRoutes(app) {
    // Contact form API endpoint
    app.post("/api/contact", async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;
            // Validate input
            if (!name || !email || !subject || !message) {
                return res.status(400).json({ message: "All fields are required" });
            }
            // In a real app, we would save the form data to a database
            // or send an email, but for this demo we'll just return success
            res.status(200).json({ message: "Message sent successfully" });
        }
        catch (error) {
            console.error("Error in contact form submission:", error);
            res.status(500).json({ message: "Failed to send message" });
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}
