// pages/api/analyzeResume.js
import axios from 'axios';
import { NextRequest,NextResponse } from 'next/server';
export async function POST(req, res) {
  // if (req.method !== 'POST') {
  //   return res.status(405).end('Method Not Allowed');
  // }
 

  const body=await req.json()

  console.log(body)
  const { pdfUrl:resumePdfUrl} = body;
  const driveFileIdMatch = resumePdfUrl.match(/file\/d\/(.*?)\//);
console.log(driveFileIdMatch)

  const question = `What career paths are suitable based on the content of this resume?
  Example output:
  careerPaths:[
    { "title": "Mechanical Engineer", "emoji": "🔧" },
    { "title": "Software Developer", "emoji": "💻" },
    { "title": "Civil Services", "emoji": "🏛️" },
    { "title": "Fashion Designer", "emoji": "👗" }
  ]; this is just an example you should give proper career path personalized based on the resume minimum 10-15 and alwasy shouls be json career path you have to give json objects in json and dont give extra text just give json`;

  if (!driveFileIdMatch) {
    return new NextResponse.json({ error: 'Invalid Google Drive URL' });
  }

  const pdfUrl = `https://drive.google.com/uc?export=download&id=${driveFileIdMatch[1]}`;
console.log(pdfUrl)
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
console.log(sourceId)
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

    const careerOptions = JSON.parse(response.data.content);
    console.log(careerOptions);

    // Directly return the JSON career options
    return new Response(JSON.stringify(careerOptions), {
      headers: { "Content-Type": "application/json" },
    });

return  Response.json({ res });
  } catch (error) {
    console.error("API call failed:", error.message);
 return Response.json({ error: error.message });
  }
}
