// pages/api/linkedinProfile.js

import axios from 'axios';
import { OpenAI } from "openai";
import { NextResponse,NextRequest } from 'next/server';
const LINKEDIN_API_KEY = 'a29cd4d4aemsh17a00a65d88a2fap12ef9cjsn2223da4cf6a7';
const LINKEDIN_API_HOST = 'linkedin-profiles1.p.rapidapi.com';

export async function POST(req, res) {
  const body = await req.json();
  console.log(body)
  const { profileUrl } = body;
  console.log(profileUrl)
    if (!profileUrl) {
    return new NextResponse.json({ error: 'Profile URL is required' },{status:400});
  }

  const linkedInOptions = {
    method: 'GET',
    url: 'https://linkedin-profiles1.p.rapidapi.com/extract',
    params: { url: profileUrl },
    headers: {
      'X-RapidAPI-Key': LINKEDIN_API_KEY,
      'X-RapidAPI-Host': LINKEDIN_API_HOST
    }
  };
  const openai = new OpenAI({
    apiKey: "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", // Always use environment variables for API keys
  });
  try {
    // Step 1: Retrieve LinkedIn profile data
    const linkedInResponse = await axios.request(linkedInOptions);
    const profileData = linkedInResponse.data.extractor; // Assume this contains the necessary profile details
console.log(profileData)
const prompt = `
Given the LinkedIn profile details: 
${profileData}
Please generate career path guidelines in the following format:
- For each career suggestion, provide the job title and an associated emoji.
The expected format for each suggestion is: { "title": "Job Title", "emoji": "Emoji" }

Example output:
careerPaths:[
 { "title": "Mechanical Engineer", "emoji": "🔧" }
 { "title": "Software Developer", "emoji": "💻" }
{ "title": "Civil Services", "emoji": "🏛️" },
{ "title": "Fashion Designer", "emoji": "👗" }
];
Note: The job titles and emojis should align with the profile's skills, experiences, and interests. Atleast generate minimum 10 career path. Always ensure that we always follow proper json structure without error and dont mention anything like hello this is your data
`;
    
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'system', content: prompt }],
      temperature: 0.6,
      max_tokens: 1000,
  
    });

    const careerGuidelines = {
      guidelines: JSON.stringify(gptResponse.choices[0].message.content),
    };
    console.log(gptResponse.choices[0].message.content)
    const res=(gptResponse.choices[0].message.content)
    // console.log(careerGuidelines)
    return new NextResponse((res), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' })
  }
}