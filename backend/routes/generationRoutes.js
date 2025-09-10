import express from "express";
import { generateProject } from "../controllers/generationController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// This route is protected. The 'auth' middleware runs first.
// If the token is valid, it calls 'generateProject'.
router.post("/generate", auth, generateProject);

// You can add the /explain route here later
// router.post('/explain', auth, explainCode);

export default router;
