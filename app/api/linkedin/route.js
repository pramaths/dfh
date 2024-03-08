// pages/api/linkedinProfile.js

import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
// Environment variables should be used for sensitive values like API keys
const LINKEDIN_API_KEY = '9fad4de06fmshb9ef7fb994db8dcp1e1241jsn6c9ca08436ee';
const LINKEDIN_API_HOST = 'linkedin-profiles1.p.rapidapi.com';

const OPENAI_API_KEY = "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"; 
export default async function GET(req, res) {
  const { profileUrl } = req.body;
  if (!profileUrl) {
    return res.status(400).json({ error: 'Profile URL is required' });
  }

  const linkedInOptions = {
    method: 'GET',
    url: 'https://linkedin-profiles1.p.rapidapi.com/extract',
    params: { url: profileUrl, html: '1' },
    headers: {
      'X-RapidAPI-Key': LINKEDIN_API_KEY,
      'X-RapidAPI-Host': LINKEDIN_API_HOST
    }
  };

  try {
    // Step 1: Retrieve LinkedIn profile data
    const linkedInResponse = await axios.request(linkedInOptions);
    const profileData = linkedInResponse.data; // Assume this contains the necessary profile details

    // Step 2: Generate career path guidelines via ChatGPT based on LinkedIn profile
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const prompt = `Based on the following LinkedIn profile details: ${JSON.stringify(profileData)}, generate career path guidelines.`;
    
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const careerGuidelines = {
      guidelines: gptResponse,
    };

    // Step 3: Return the career path guidelines to the client
    res.status(200).json(careerGuidelines);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}