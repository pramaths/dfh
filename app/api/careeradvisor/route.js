// pages/api/chatgpt.js
import {  OpenAI } from "openai";
import { NextResponse,NextRequest } from 'next/server';

export  async function POST(req,res) {
  // if (req.method !== 'POST') {
  //   return res.status(405).end('Method Not Allowed');
  // }
  const body = await req.json();
  console.log(body);

  const { growth, hobby, interests, notinterests, workenv } = body;
  console.log(growth);
  const prompt = `Given the user's details:
Growth: ${growth}
Hobby: ${hobby}
Interests: ${interests}
Not interests: ${notinterests}
Work Environment: ${workenv}
Generate a list of career paths and emojis related to the user's interest in a JSON format: with attirbute as title and emoji always generate minimum 10 objects if the interests are too generic generate 11-15 path just give json output dont mention anything iwth that like json and all`;

const openai = new OpenAI({
  apiKey: "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", // Always use environment variables for API keys
});
 
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.6,
      max_tokens: 1000,
    });
    console.log(completion.choices[0].message.content);

    // Assume the response is in the expected format; in a real scenario, you would parse and validate this carefully.
    const careerPaths = (completion.choices[0].message.content);
    console.log(careerPaths)
   return  Response.json(JSON.parse(careerPaths));
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return  Response.json({ error: 'Failed to fetch data from OpenAI' });
  }
}
