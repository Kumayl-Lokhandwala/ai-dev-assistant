import Project from "../models/Project.js";
import {
  deleteFilesFromS3,
  getFileStreamFromS3,
  uploadFileToS3,
} from "../services/s3service.js";
import archiver from "archiver";

export const getProjects = async (req, res) => {
  try {
    // Find projects belonging to the user ID from the auth middleware
    const projects = await Project.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // Sort by most recent
      .select("-files"); // Exclude the detailed file list for this overview

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error while fetching projects." });
  }
};

export const deleteProject = async (req, res) => {
  try {
    // 1. Find the project in MongoDB
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id, // Ensure the project belongs to the logged-in user
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // 2. Delete associated files from S3
    const s3Keys = project.files.map(
      (file) => `projects/${project.user}/${project._id}/${file.path}`
    );
    await deleteFilesFromS3(s3Keys);

    // 3. Delete the project from MongoDB
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error while deleting project." });
  }
};

export const updateProjectFile = async (req, res) => {
  const { filePath, newContent } = req.body;
  const { id: projectId } = req.params;

  if (!filePath || newContent === undefined) {
    return res
      .status(400)
      .json({ message: "filePath and newContent are required." });
  }

  try {
    // 1. Verify the project exists and belongs to the user
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // 2. Check if the file path exists in the project's file list
    const fileExists = project.files.some((file) => file.path === filePath);
    if (!fileExists) {
      return res.status(404).json({
        message: `File with path '${filePath}' not found in this project.`,
      });
    }

    // 3. Construct the S3 key and overwrite the file
    const s3Key = `projects/${req.user._id}/${projectId}/${filePath}`;
    await uploadFileToS3(s3Key, newContent);

    res
      .status(200)
      .json({ message: `File '${filePath}' updated successfully.` });
  } catch (error) {
    console.error("Error updating file:", error);
    res.status(500).json({ message: "Server error while updating file." });
  }
};

// export const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findOne({
//       _id: req.params.id,
//       user: req.user._id,
//     }).lean();
//     if (!project) {
//       return res.status(404).json({ message: "Project not found." });
//     }
//     // Note: We don't fetch file content here for performance.
//     // The frontend can fetch individual files as needed.
//     res.status(200).json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error while fetching project." });
//   }
// };

export const createProject = async (req, res) => {
  const { projectName, description, techStack } = req.body;
  try {
    const newProject = new Project({
      projectName,
      description,
      techStack,
      user: req.user._id,
      files: [], // Starts with no files
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating project." });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectName, description } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { projectName, description } },
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating project." });
  }
};

export const addFileToProject = async (req, res) => {
  const { filePath, content } = req.body;
  const { id: projectId } = req.params;
  try {
    // Upload the new file to S3
    const s3Key = `projects/${req.user._id}/${projectId}/${filePath}`;
    await uploadFileToS3(s3Key, content);

    // Add the file path to the project in MongoDB
    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: req.user._id },
      { $push: { files: { path: filePath } } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while adding file." });
  }
};

export const deleteFileFromProject = async (req, res) => {
  const { filePath } = req.body; // Pass the file path to delete in the body
  const { id: projectId } = req.params;
  try {
    // Delete the file from S3
    const s3Key = `projects/${req.user._id}/${projectId}/${filePath}`;
    await deleteFilesFromS3([s3Key]);

    // Remove the file from the project's file list in MongoDB
    const project = await Project.findOneAndUpdate(
      { _id: projectId, user: req.user._id },
      { $pull: { files: { path: filePath } } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting file." });
  }
};

export const downloadProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Set the headers to trigger a file download
    res.attachment(`${project.projectName}.zip`);

    const archive = archiver("zip");
    archive.pipe(res);

    // Add each file from S3 to the archive
    for (const file of project.files) {
      const s3Key = `projects/${project.user}/${project._id}/${file.path}`;
      const fileStream = await getFileStreamFromS3(s3Key);
      archive.append(fileStream, { name: file.path });
    }

    await archive.finalize();
  } catch (error) {
    console.error("Error downloading project:", error);
    res
      .status(500)
      .json({ message: "Server error while downloading project." });
  }
};

const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
};

// GET /api/projects/:id - Fetch a single project with all file content
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).lean();
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Fetch the content for each file from S3 in parallel
    const filesWithContent = await Promise.all(
      project.files.map(async (file) => {
        const s3Key = `projects/${project.user}/${project._id}/${file.path}`;
        try {
          const stream = await getFileStreamFromS3(s3Key);
          const content = await streamToString(stream);
          return { ...file, content };
        } catch (error) {
          return {
            ...file,
            content: `// Error loading file: ${error.message}`,
          };
        }
      })
    );

    res.status(200).json({ ...project, files: filesWithContent });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching project." });
  }
};
