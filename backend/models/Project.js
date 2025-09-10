import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This creates a direct link to the User model
    required: true,
  },
  projectName: {
    type: String,
    required: [true, "Please provide a project name."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
  files: [
    {
      path: {
        type: String,
        required: true,
      },
      // Note: The 'content' is not stored here; it's in S3.
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
