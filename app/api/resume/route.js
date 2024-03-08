// pages/api/analyzeResume.js
import axios from 'axios';

export default async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }
  const question = "What career paths are suitable based on the content of this resume?";
  const { pdfUrl } = req.body;

  const config = {
    headers: {
      "x-api-key": "sec_1A51ZrXpMZtpjuYIkkbDnuw0coLacwUc", // Store your API key in environment variables for security
      "Content-Type": "application/json",
    },
  };

  try {
    // Step 1: Add PDF URL
    let response = await axios.post("https://api.chatpdf.com/v1/sources/add-url", { url: pdfUrl }, config);
    const sourceId = response.data.sourceId;

    // Step 2: Ask a question based on the uploaded PDF
    response = await axios.post("https://api.chatpdf.com/v1/chats/message", {
      sourceId,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    }, config);

    // Assuming the response includes career path guidelines
    // Format the response to match your desired structure
    const careerPaths = response.data.messages.map(message => ({
      title: message.content, // Extract or transform this based on actual API response
      emoji: "🚀", // Assign emojis or handle dynamically based on content
    }));

    res.status(200).json({ careerPaths });
  } catch (error) {
    console.error("API call failed:", error.message);
    res.status(500).json({ error: error.message });
  }
}
