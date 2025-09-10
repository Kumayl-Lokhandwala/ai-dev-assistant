#!/usr/bin/env node

import fs from "fs";
import path from "path";
import axios from "axios";
import "dotenv/config";

// --- (Configuration like GEMINI_API_KEY and SYSTEM_PROMPT remains the same) ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("Error: GEMINI_API_KEY is not defined in your .env file.");
  process.exit(1);
}
const SYSTEM_PROMPT = `...`; // Your full system prompt here

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generateProjectStructure(prompt) {
  // Use console.error for logging so it goes to stderr
  console.error("🤖 Sending prompt to AI. Please wait...");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;
  // ... (requestBody is the same)
  const requestBody = {
    /* ... */
  };

  // This function can remain largely the same, but ensure logs go to stderr
  try {
    const response = await axios.post(url, requestBody);
    const responseJsonText = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(responseJsonText);
  } catch (error) {
    console.error("❌ Error calling the AI model:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    // Return null to indicate failure
    return null;
  }
}

function createProjectFiles(projectData) {
  const rootDir = projectData.projectTitle.replace(/\s+/g, "-").toLowerCase();
  if (fs.existsSync(rootDir)) {
    console.error(
      `⚠️ Directory "${rootDir}" already exists. Files may be overwritten.`
    );
  } else {
    fs.mkdirSync(rootDir);
    console.error(`📁 Created project directory: ${rootDir}`);
  }

  projectData.files.forEach((file) => {
    const filePath = path.join(rootDir, file.path);
    const dirName = path.dirname(filePath);

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(filePath, file.content);
    console.error(`   ✔️  Created file: ${file.path}`);
  });

  console.error("\n✨ Project generation complete! ✨");
  console.error("\n📝 Notes from the AI:");
  console.error(projectData.notes);
}

async function main() {
  const inputFilePath = process.argv[2];
  // ... (Input validation is the same)
  if (!inputFilePath) {
    /* ... */
  }

  // ... (File reading and parsing is the same)
  let inputData;
  try {
    /* ... */
  } catch (error) {
    /* ... */
  }

  const { description, techStack } = inputData;
  // ... (Input data validation is the same)
  if (!description || !techStack || techStack.length === 0) {
    /* ... */
  }

  const finalPrompt = `Project Description: ${description}. Tech Stack: ${techStack.join(
    ", "
  )}.`;

  console.error(`\n🚀 Starting project generation...`); // Log to stderr

  const projectData = await generateProjectStructure(finalPrompt);

  if (projectData) {
    // This is the CRITICAL CHANGE: Write the final JSON to stdout
    process.stdout.write(JSON.stringify(projectData, null, 2));

    // The createProjectFiles function is now just for local side-effects
    // In a server environment, you might not even need to call this.
    // The server will handle saving to S3 based on the stdout JSON.
    // createProjectFiles(projectData);
  } else {
    console.error("Could not generate project structure. Aborting.");
    process.exit(1); // Exit with an error code
  }
}

main();
