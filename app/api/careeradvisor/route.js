// pages/api/chatgpt.js
import { Configuration, OpenAIApi } from "openai";
import { NextResponse,NextRequest } from 'next/server';

export default async function GET(NextResponse,NextRequest) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { growth, hobby, interests, notinterests, workenv } = req.body;

  // Prepare the GPT prompt
  const prompt = `Given the user's details:
Growth: ${growth}
Hobby: ${hobby}
Interests: ${interests.join(', ')}
Not interests: ${notinterests.join(', ')}
Work Environment: ${workenv}

Generate a list of career paths and emojis related to the user's interest in a JSON format: with attirbute as title and emoji always generate minimum 10 objects if the interests are too generic generate 11-15 path`;

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-0125",
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 256,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0,
    });

    // Assume the response is in the expected format; in a real scenario, you would parse and validate this carefully.
    const careerPaths = JSON.parse(completion);
    
    res.status(200).json(careerPaths);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
  }
}
