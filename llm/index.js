#!/usr/bin/env node

// create-project.js
import fs from "fs";
import path from "path";
import axios from "axios";
import "dotenv/config";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}

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
}

The "content" for each file must be a single string, with newlines represented as \\n. Ensure all code is contextually aware and works together. Do not add any text or markdown formatting before or after the JSON object.`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateProjectStructure(prompt, retries = 3, delay = 2000) {
  console.log("🤖 Sending prompt to AI. Please wait...");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
    },
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(url, requestBody);
      const responseJsonText =
        response.data.candidates[0].content.parts[0].text;
      return JSON.parse(responseJsonText);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn(
          `⚠️ Rate limit exceeded. Retrying in ${delay / 1000} seconds... (${
            i + 1
          }/${retries})`
        );
        await sleep(delay);
        delay *= 2; // Exponential backoff
      } else {
        console.error("❌ Error calling the AI model:");
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
          console.error(error.message);
        }
        return null;
      }
    }
  }

  console.error(
    `❌ Failed to get a response after ${retries} retries. Please try again later.`
  );
  return null;
}

function createProjectFiles(projectData) {
  const rootDir = projectData.projectTitle.replace(/\s+/g, "-").toLowerCase();
  if (fs.existsSync(rootDir)) {
    console.warn(
      `⚠️ Directory "${rootDir}" already exists. Files may be overwritten.`
    );
  } else {
    fs.mkdirSync(rootDir);
    console.log(`📁 Created project directory: ${rootDir}`);
  }

  projectData.files.forEach((file) => {
    const filePath = path.join(rootDir, file.path);
    const dirName = path.dirname(filePath);

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(filePath, file.content);
    console.log(`   ✔️  Created file: ${file.path}`);
  });

  console.log("\n✨ Project generation complete! ✨");
  console.log("\n📝 Notes from the AI:");
  console.log(projectData.notes);
}

async function main() {
  const inputFilePath = process.argv[2];

  if (!inputFilePath) {
    console.error("❌ Error: Please provide the path to your input JSON file.");
    console.log("\nUsage Example:");
    console.log("node create-project.js input.json");
    return;
  }

  let inputData;
  try {
    const fileContent = fs.readFileSync(inputFilePath, "utf8");
    inputData = JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Error reading or parsing the file: ${inputFilePath}`);
    console.error(error.message);
    return;
  }

  const { description, techStack } = inputData;

  if (!description || !techStack || techStack.length === 0) {
    console.error(
      "❌ Error: The JSON file must contain a 'description' string and a non-empty 'techStack' array."
    );
    return;
  }

  const techStackString = techStack.join(", ");
  const finalPrompt = `Project Description: ${description}. Tech Stack: ${techStackString}.`;

  console.log(`\n🚀 Starting project generation...`);
  console.log(`   - Description: "${description}"`);
  console.log(`   - Tech Stack: [${techStackString}]`);
  const projectData = await generateProjectStructure(finalPrompt);
  if (projectData) {
    createProjectFiles(projectData);
  } else {
    console.error("Could not generate project structure. Aborting.");
  }
}

main();
