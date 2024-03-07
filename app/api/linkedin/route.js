// pages/api/linkedinProfile.js

import axios from 'axios';

// Environment variables should be used for sensitive values like API keys
const LINKEDIN_API_KEY = '9fad4de06fmshb9ef7fb994db8dcp1e1241jsn6c9ca08436ee';
const LINKEDIN_API_HOST = 'linkedin-profiles1.p.rapidapi.com';

export default async function GET(req, res) {
  const { profileUrl } = req.query;
  if (!profileUrl) {
    return res.status(400).json({ error: 'Profile URL is required' });
  }
  const options = {
    method: 'GET',
    url: 'https://linkedin-profiles1.p.rapidapi.com/extract',
    params: { url: profileUrl, html: '1' },
    headers: {
      'X-RapidAPI-Key': LINKEDIN_API_KEY,
      'X-RapidAPI-Host': LINKEDIN_API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
