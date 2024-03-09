// pages/api/chatgpt.js
import { OpenAI } from "openai";

export async function POST(req, res) {
  const body = await req.json();
  console.log(body);

  // Assuming 'label' is the node label sent in the request body
  const { label } = body;

  // Adjust the prompt to request detailed information about the career path
  const prompt = `Provide a detailed description for the career path titled "${label}". Include insights about what the career entails, necessary qualifications, typical work environments, and possible growth opportunities. All the opurtunities and response should be about female and girls only`;

  const openai = new OpenAI({
    apiKey: "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", // Use an environment variable for the API key
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.6,
      max_tokens: 1000,
    });

    // Logging the completion response for debugging purposes
    console.log(completion.choices[0].message.content);

    // Directly returning the response from OpenAI to the client.
    // You might want to format or sanitize this response depending on your needs.
    return Response.json({ details: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return Response.json({ error: 'Failed to fetch data from OpenAI' });
  }
}
