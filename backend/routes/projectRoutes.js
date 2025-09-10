import express from "express";
import {
  getProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  addFileToProject,
  updateProjectFile,
  deleteFileFromProject,
  downloadProject,
} from "../controllers/projectController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// --- Project Level Routes ---
router.get("/", auth, getProjects);
router.post("/", auth, createProject);
router.get("/:id", auth, getProjectById);
router.patch("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);
router.post("/:id/file", auth, addFileToProject);
router.patch("/:id/file", auth, updateProjectFile);
router.delete("/:id/file", auth, deleteFileFromProject);
router.get("/download/:id", auth, downloadProject);

export default router;
