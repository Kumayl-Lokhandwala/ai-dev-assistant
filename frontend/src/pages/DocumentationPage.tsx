import React, { useState, useMemo, type JSX } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Lock,
  Target,
  Code,
  Folder,
  File as FileIcon,
  Save,
  Search,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  ExternalLink,
  BookOpen,
  Download,
  Edit,
  Trash2,
  Plus,
  Key,
  User,
  Server,
  Database,
  Cloud,
} from "lucide-react";

// --- Type Definitions ---
interface SidebarItem {
  id: string;
  title: string;
  icon: JSX.Element;
  category?: string;
}
interface ContentSection {
  title: string;
  description: string;
  Content: React.FC;
}

// --- Content Components ---

const IntroductionContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      Welcome to the official documentation for CodeSmith. Our mission is to
      supercharge your development workflow by eliminating the repetitive task
      of setting up boilerplate code. Describe your vision, and our AI will
      build the foundation for you.
    </p>

    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-cyan-400 mb-2">
        🚀 Quick Start
      </h3>
      <p className="text-gray-300">
        New to CodeSmith? Check out the "Your First Project" guide to get
        started in minutes.
      </p>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Core Features</h3>
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <h4 className="font-semibold text-white">AI-Powered Generation</h4>
        </div>
        <p className="text-gray-300 text-sm">
          Leverages the Google Gemini API to create context-aware,
          production-ready code.
        </p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Server className="h-5 w-5 text-green-400" />
          </div>
          <h4 className="font-semibold text-white">Full-Stack Support</h4>
        </div>
        <p className="text-gray-300 text-sm">
          Generate both frontend and backend projects in a variety of modern
          tech stacks.
        </p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Cloud className="h-5 w-5 text-blue-400" />
          </div>
          <h4 className="font-semibold text-white">Secure Cloud Storage</h4>
        </div>
        <p className="text-gray-300 text-sm">
          All your generated projects are saved securely to AWS S3, linked to
          your account.
        </p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Database className="h-5 w-5 text-purple-400" />
          </div>
          <h4 className="font-semibold text-white">Project Management</h4>
        </div>
        <p className="text-gray-300 text-sm">
          Complete RESTful API to manage projects, edit files, and download your
          work.
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Getting Help</h3>
    <p className="text-gray-300 mb-4">
      Need assistance? Here are some resources:
    </p>
    <ul className="list-disc list-inside space-y-2 text-gray-300">
      <li>Check the API reference for detailed endpoint documentation</li>
      <li>Use the search functionality to find specific topics</li>
      <li>Follow the step-by-step guides for common workflows</li>
    </ul>
  </>
);

const AuthenticationContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      CodeSmith uses JWT-based authentication. A Bearer Token is required in the
      `Authorization` header for all protected routes.
    </p>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 text-yellow-400 mb-2">
        <Key className="h-4 w-4" />
        <span className="font-semibold">Important</span>
      </div>
      <p className="text-yellow-300 text-sm">
        Always keep your token secure and never expose it in client-side code.
      </p>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Register</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        POST /api/auth/register
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "password123"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Login</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        POST /api/auth/login
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Success Response (includes your token)
{
  "_id": "60d0fe4f5311236168a109ca",
  "name": "Test User",
  "email": "test@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Using the Token</h3>
    <p className="text-gray-300 mb-4">
      Include the token in the Authorization header for all subsequent requests:
    </p>
    <SyntaxHighlighter
      language="javascript"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Example using fetch
fetch('/api/projects', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})`}
    </SyntaxHighlighter>
  </>
);

const FirstProjectContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      Generating your first project is a simple, three-step process through the
      API.
    </p>

    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 text-green-400 mb-2">
        <Sparkles className="h-4 w-4" />
        <span className="font-semibold">Pro Tip</span>
      </div>
      <p className="text-green-300 text-sm">
        Start with a simple project description and gradually add complexity as
        you get familiar with the system.
      </p>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Step 1: Authenticate
    </h3>
    <p className="text-gray-300 mb-4">
      First, use the{" "}
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        /api/auth/login
      </code>{" "}
      endpoint to get your JWT Bearer token.
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Step 2: Send a Generate Request
    </h3>
    <p className="text-gray-300 mb-2">
      Make a{" "}
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">POST</code>{" "}
      request to{" "}
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        /api/generate
      </code>{" "}
      with your token in the Authorization header.
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "description": "A full-stack blog application with user authentication and comments",
  "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"]
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Step 3: Check Your Projects
    </h3>
    <p className="text-gray-300 mb-4">
      Make a{" "}
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">GET</code>{" "}
      request to{" "}
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        /api/projects
      </code>
      . You will see your newly created project in the list.
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Example Project Ideas
    </h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h4 className="font-semibold text-white mb-2">Simple Todo App</h4>
        <p className="text-gray-300 text-sm">
          Perfect for testing - includes CRUD operations and local storage.
        </p>
      </div>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
        <h4 className="font-semibold text-white mb-2">Weather Dashboard</h4>
        <p className="text-gray-300 text-sm">
          Great for API integration practice with external weather data.
        </p>
      </div>
    </div>
  </>
);

const GenerateProjectContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      This is the core endpoint of the application. It generates a new project
      based on a description and tech stack.
    </p>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 text-blue-400 mb-2">
        <Code className="h-4 w-4" />
        <span className="font-semibold">AI Generation</span>
      </div>
      <p className="text-blue-300 text-sm">
        The AI analyzes your description and tech stack to create a complete,
        structured project.
      </p>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Endpoint</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        POST /api/generate
      </code>{" "}
      (Protected Route)
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "description": "A real-time chat application backend with rooms and user presence",
  "techStack": ["Node.js", "Express", "Socket.io", "MongoDB"]
}`}
    </SyntaxHighlighter>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Success Response
{
  "message": "Project generated successfully!",
  "projectId": "60d0fe4f5311236168a109cb",
  "estimatedCompletionTime": "2-3 minutes"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Best Practices</h3>
    <ul className="list-disc list-inside space-y-3 text-gray-300">
      <li>Be specific about features and architecture in your description</li>
      <li>Choose compatible technologies in your tech stack</li>
      <li>Start with smaller projects to understand the generation patterns</li>
      <li>
        Include key requirements like authentication, database, or API needs
      </li>
    </ul>
  </>
);

const ProjectManagementContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      Manage your projects with these standard CRUD endpoints. All endpoints
      require authentication.
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Get All Projects
    </h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        GET /api/projects
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Response
{
  "projects": [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "projectName": "Blog Application",
      "description": "A full-stack blog application...",
      "techStack": ["Next.js", "TypeScript", "Node.js"],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Get a Single Project
    </h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        GET /api/projects/:id
      </code>
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Update Project Metadata
    </h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        PATCH /api/projects/:id
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "projectName": "My Awesome New Project Name",
  "description": "Updated project description"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Delete a Project
    </h3>
    <p className="text-gray-300">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        DELETE /api/projects/:id
      </code>
    </p>
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4">
      <div className="flex items-center gap-2 text-red-400 mb-2">
        <Trash2 className="h-4 w-4" />
        <span className="font-semibold">Warning</span>
      </div>
      <p className="text-red-300 text-sm">
        This action is irreversible and will permanently delete the project and
        all associated files.
      </p>
    </div>
  </>
);

const FileOperationsContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      Manage individual files within a specific project. All file paths are
      relative to the project root.
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Add a New File</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        POST /api/projects/:id/file
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "filePath": "src/components/NewComponent.tsx",
  "content": "export const NewComponent = () => <div>Hello World</div>;"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Update a File</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        PATCH /api/projects/:id/file
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "filePath": "src/components/NewComponent.tsx",
  "newContent": "export const NewComponent = () => <div>Hello Universe</div>;"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Delete a File</h3>
    <p className="text-gray-300 mb-2">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        DELETE /api/projects/:id/file
      </code>
    </p>
    <SyntaxHighlighter
      language="json"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Request Body
{
  "filePath": "src/components/NewComponent.tsx"
}`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      File Structure Tips
    </h3>
    <ul className="list-disc list-inside space-y-2 text-gray-300">
      <li>Use forward slashes (/) for file paths, even on Windows</li>
      <li>Paths are relative to the project root directory</li>
      <li>Nested directories are created automatically if they don't exist</li>
      <li>File extensions should match the intended language/format</li>
    </ul>
  </>
);

const ExportDownloadContent = () => (
  <>
    <p className="text-gray-300 mb-6">
      Download your entire project as a single `.zip` file containing all
      generated files and structure.
    </p>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 text-purple-400 mb-2">
        <Download className="h-4 w-4" />
        <span className="font-semibold">Instant Download</span>
      </div>
      <p className="text-purple-300 text-sm">
        Projects are typically ready for download within 2-3 minutes of
        generation.
      </p>
    </div>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">
      Download Project Endpoint
    </h3>
    <p className="text-gray-300">
      <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">
        GET /api/projects/download/:id
      </code>
    </p>
    <p className="text-gray-300 mt-4">
      This endpoint initiates a file download. When called, the server will
      fetch all associated files from AWS S3, create a zip archive in memory,
      and stream it directly to the client.
    </p>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">Usage Example</h3>
    <SyntaxHighlighter
      language="javascript"
      style={vscDarkPlus}
      customStyle={{
        background: "#1f2937",
        borderRadius: "0.5rem",
        margin: "1rem 0",
      }}
    >
      {`// Example using fetch
fetch('/api/projects/download/60d0fe4f5311236168a109cb', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(response => response.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'project.zip';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
})`}
    </SyntaxHighlighter>

    <h3 className="text-2xl font-bold mt-8 mb-4 text-white">What's Included</h3>
    <ul className="list-disc list-inside space-y-2 text-gray-300">
      <li>Complete project file structure</li>
      <li>All source code files</li>
      <li>Configuration files (package.json, .env.example, etc.)</li>
      <li>README with setup instructions</li>
      <li>Any generated assets or documentation</li>
    </ul>
  </>
);

// --- Main Documentation Page Component ---
const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarSections: SidebarItem[] = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <Rocket size={16} />,
      category: "Getting Started",
    },
    {
      id: "authentication",
      title: "Authentication",
      icon: <Lock size={16} />,
      category: "Getting Started",
    },
    {
      id: "first-project",
      title: "Your First Project",
      icon: <Target size={16} />,
      category: "Getting Started",
    },
    {
      id: "generate-project",
      title: "Generate Project",
      icon: <Code size={16} />,
      category: "Core Features",
    },
    {
      id: "project-management",
      title: "Project Management",
      icon: <Folder size={16} />,
      category: "Core Features",
    },
    {
      id: "file-operations",
      title: "File Operations",
      icon: <FileIcon size={16} />,
      category: "Core Features",
    },
    {
      id: "export-download",
      title: "Export & Download",
      icon: <Download size={16} />,
      category: "Core Features",
    },
  ];

  const contentSections: Record<string, ContentSection> = {
    introduction: {
      title: "Introduction",
      description: "Learn about CodeSmith's mission and core features.",
      Content: IntroductionContent,
    },
    authentication: {
      title: "Authentication",
      description: "How to register, log in, and manage API tokens.",
      Content: AuthenticationContent,
    },
    "first-project": {
      title: "Your First Project",
      description: "A step-by-step guide to generating your first app.",
      Content: FirstProjectContent,
    },
    "generate-project": {
      title: "Generate Project",
      description: "Using the core AI generation endpoint.",
      Content: GenerateProjectContent,
    },
    "project-management": {
      title: "Project Management",
      description: "Endpoints for managing your projects.",
      Content: ProjectManagementContent,
    },
    "file-operations": {
      title: "File Operations",
      description: "Endpoints for managing individual files.",
      Content: FileOperationsContent,
    },
    "export-download": {
      title: "Export & Download",
      description: "How to download your project as a zip file.",
      Content: ExportDownloadContent,
    },
  };

  const allItems = useMemo(() => sidebarSections, [sidebarSections]);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return allItems;
    return allItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allItems]);

  const activeItemIndex = allItems.findIndex(
    (item) => item.id === activeSection
  );

  const handleNext = () => {
    if (activeItemIndex < allItems.length - 1) {
      setActiveSection(allItems[activeItemIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeItemIndex > 0) {
      setActiveSection(allItems[activeItemIndex - 1].id);
    }
  };

  const currentContent = contentSections[activeSection] || {
    title: "Not Found",
    description: "Select a topic to get started.",
    Content: () => <p>Please select a topic from the sidebar.</p>,
  };

  // Group items by category for the sidebar
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                Documentation
              </h1>
              <p className="text-xl text-gray-400">
                Everything you need to know about using CodeSmith API and
                features
              </p>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 backdrop-blur-sm min-w-64">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">API Status</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="text-white font-semibold">
                      All Systems Operational
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Search Bar with Quick Links */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 pl-12 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/20 transition-all group">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">API Reference</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="flex items-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all group">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Quick Start</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-28">
              <nav className="space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
                      {category}
                    </div>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                              activeSection === item.id
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                            }`}
                          >
                            <div
                              className={`transition-transform group-hover:scale-110 ${
                                activeSection === item.id ? "scale-110" : ""
                              }`}
                            >
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-lg text-gray-400 mb-6">
                    {currentContent.description}
                  </div>
                  <h1 className="text-4xl font-bold mb-8 text-white">
                    {currentContent.title}
                  </h1>
                  <div className="space-y-6">
                    <currentContent.Content />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-gray-700 flex justify-between">
                <button
                  onClick={handlePrev}
                  disabled={activeItemIndex === 0}
                  className="flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-gray-400 rounded-lg border border-gray-700 hover:border-cyan-500/50 disabled:hover:border-gray-700"
                >
                  <ChevronLeft size={20} />
                  <span>
                    {activeItemIndex > 0
                      ? allItems[activeItemIndex - 1].title
                      : "Previous"}
                  </span>
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeItemIndex === allItems.length - 1}
                  className="flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50 disabled:hover:text-gray-400 rounded-lg border border-gray-700 hover:border-cyan-500/50 disabled:hover:border-gray-700"
                >
                  <span>
                    {activeItemIndex < allItems.length - 1
                      ? allItems[activeItemIndex + 1].title
                      : "Next"}
                  </span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
