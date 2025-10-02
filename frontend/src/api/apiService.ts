import axios from "axios";

// Define interfaces for our data structures
interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  _id: string;
  name: string;
  email: string;
}

const API_URL = "http://localhost:3001/api";
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth Service ---
export const register = (userData: any) =>
  api.post<AuthResponse>("/auth/register", userData);
export const login = (userData: any) =>
  api.post<AuthResponse>("/auth/login", userData);
export const getMe = () => api.get<User>("/auth/me");

// --- Project Service ---
export const generateProject = (projectData: any) =>
  api.post("/generation/generate", projectData);
export const getProjects = () => api.get("/projects");

export const deleteProject = (projectId: string) =>
  api.delete(`/projects/${projectId}`);

// Special function for downloading, as it expects a different response type
export const downloadProject = (projectId: string) =>
  api.get(`/projects/download/${projectId}`, {
    responseType: "blob", // Important for handling file downloads
  });

// Add these to src/api/apiService.ts
export const getProjectById = (projectId: string) =>
  api.get(`/projects/${projectId}`);
export const getFileContent = (projectId: string, filePath: string) =>
  api.get(`/projects/${projectId}/file?path=${encodeURIComponent(filePath)}`);
export const updateFileContent = (
  projectId: string,
  filePath: string,
  newContent: string
) => api.patch(`/projects/${projectId}/file`, { filePath, newContent });

export default api;
