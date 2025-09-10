import axios from "axios";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SYSTEM_PROMPT = `You are an expert AI developer assistant. Your task is to take a user's project description and a specified tech stack, then generate a complete boilerplate file structure in a single JSON object.

You MUST follow these rules:
1.  You MUST respond with ONLY a valid JSON object that adheres to the required schema.
2.  You MUST include a "README.md" file in the "files" array.
3.  The "README.md" file must contain the project title, a brief description, and clear, step-by-step instructions on how to install dependencies and run the project.

The JSON schema is:
{
  "projectTitle": "string",
  "description": "string",
  "stack": {
    "framework": "string",
    "database": "string | null"
  },
  "files": [
    { "path": "string", "content": "string" }
  ],
  "notes": "string"
}`;

/**
 * Calls the Gemini API to generate project boilerplate.
 * @param {string} prompt - The combined user prompt.
 * @returns {Promise<object>} The parsed JSON object from the AI.
 */
export async function generateBoilerplate(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      response_mime_type: "application/json",
    },
  };

  try {
    const response = await axios.post(url, requestBody, { timeout: 30000 });
    const responseJsonText = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(responseJsonText);
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to get a response from the AI model.");
  }
}
