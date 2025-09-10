import Project from "../models/Project.js";
import { generateBoilerplate } from "../services/aiService.js";
import { uploadFileToS3 } from "../services/s3service.js";

/**
 * @desc    Generate a new project, save it, and upload files to S3
 * @route   POST /api/generate
 * @access  Private
 */
export const generateProject = async (req, res) => {
  const { description, techStack } = req.body;
  const userId = req.user._id;

  if (!description || !techStack) {
    return res
      .status(400)
      .json({ message: "Description and techStack are required." });
  }

  try {
    const finalPrompt = `Project Description: ${description}. Tech Stack: ${techStack.join(
      ", "
    )}.`;

    // 1. Call the AI service directly
    const generatedData = await generateBoilerplate(finalPrompt);

    // 2. Save project metadata to MongoDB
    const newProject = new Project({
      user: userId,
      projectName: generatedData.projectTitle,
      description: generatedData.description,
      techStack: techStack,
      files: generatedData.files.map((f) => ({ path: f.path })),
    });
    const savedProject = await newProject.save();
    const projectId = savedProject._id;

    // 3. Upload each file to S3
    const uploadPromises = generatedData.files.map((file) => {
      const s3Key = `projects/${userId}/${projectId}/${file.path}`;
      return uploadFileToS3(s3Key, file.content);
    });
    await Promise.all(uploadPromises);

    res.status(201).json({
      message: "Project generated successfully!",
      projectId: projectId,
    });
  } catch (error) {
    console.error("Generation Controller Error:", error);
    res
      .status(500)
      .json({ message: "Failed to generate project.", error: error.message });
  }
};
