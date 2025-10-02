import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  FileText,
  Download,
  Trash2,
  FolderOpen,
  Code,
  Clock,
  ChevronRight,
  Search,
  Sparkles,
  Loader2,
  Zap,
  BarChart3,
  Users,
  ArrowUpRight,
  Rocket,
  Lightbulb,
  Copy,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getProjects,
  generateProject,
  downloadProject,
  deleteProject,
} from "@/api/apiService";

interface Project {
  _id: string;
  projectName: string;
  description: string;
  techStack: string[];
  files: { path: string }[];
  createdAt: string;
}

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [projectDescription, setProjectDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [projectName, setProjectName] = useState("");

  // Quick templates
  const quickTemplates = [
    {
      name: "React App",
      description: "Modern React app with Vite",
      tech: ["React", "Vite", "TypeScript"],
      prompt:
        "A modern React application with Vite, TypeScript, and Tailwind CSS for building responsive user interfaces",
    },
    {
      name: "Node.js API",
      description: "REST API with Express",
      tech: ["Node.js", "Express", "MongoDB"],
      prompt:
        "A RESTful API server with Express.js, MongoDB integration, JWT authentication, and error handling",
    },
    {
      name: "Full Stack",
      description: "React frontend + Node backend",
      tech: ["React", "Node.js", "PostgreSQL"],
      prompt:
        "A full-stack application with React frontend, Node.js backend, PostgreSQL database, and REST API",
    },
    {
      name: "Portfolio",
      description: "Personal portfolio site",
      tech: ["Next.js", "Tailwind", "Framer"],
      prompt:
        "A modern portfolio website with Next.js, Tailwind CSS, smooth animations, and project showcase",
    },
  ];

  const fetchProjects = async () => {
    setIsFetching(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleGenerateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const techStackArray = techStack.split(",").map((tech) => tech.trim());
      await generateProject({
        description: projectDescription,
        techStack: techStackArray,
        projectName: projectName || `Project-${Date.now()}`,
      });
      await fetchProjects();
      setProjectDescription("");
      setTechStack("");
      setProjectName("");
    } catch (error) {
      console.error("Error generating project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadProject = async (project: Project) => {
    try {
      const response = await downloadProject(project._id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${project.projectName}.zip`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading project:", error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        setProjects((prev) =>
          prev.filter((project) => project._id !== projectId)
        );
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleUseTemplate = (template: (typeof quickTemplates)[0]) => {
    setProjectName(`${template.name} Project`);
    setTechStack(template.tech.join(", "));
    setProjectDescription(template.prompt);

    // Scroll to generation form
    document.getElementById("generation-form")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalProjects: projects.length,
    totalFiles: projects.reduce(
      (acc, project) => acc + (project.files?.length || 0),
      0
    ),
    thisWeek: projects.filter(
      (project) =>
        new Date(project.createdAt) >
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white pt-20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-400 text-lg">
              Ready to build something amazing today?
            </p>
          </div>
        </div>

        {/* Main Content Grid - Generation First */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* LEFT COLUMN: Generation & Quick Actions (3/4 width) */}
          <div className="xl:col-span-3 space-y-8">
            {/* Hero Generation Card */}
            <Card
              className="bg-gray-800/50 border-gray-700 backdrop-blur-sm"
              id="generation-form"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white">Generate New Project</div>
                    <CardDescription className="text-lg mt-1">
                      Describe your idea and let AI create the perfect
                      boilerplate
                    </CardDescription>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="projectName"
                        className="text-gray-300 text-sm font-medium"
                      >
                        Project Name
                      </Label>
                      <Input
                        id="projectName"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="My Awesome App"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="techStack"
                        className="text-gray-300 text-sm font-medium"
                      >
                        Technologies
                      </Label>
                      <Input
                        id="techStack"
                        value={techStack}
                        onChange={(e) => setTechStack(e.target.value)}
                        placeholder="React, Node.js, MongoDB, Tailwind CSS"
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-gray-300 text-sm font-medium"
                    >
                      Project Description
                    </Label>
                    <Textarea
                      id="description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      placeholder="Describe what you want to build in detail... e.g., A full-stack e-commerce app with React frontend, Node.js backend, user authentication, product catalog, shopping cart, and payment integration..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 min-h-[120px] resize-vertical"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Be specific! The more details you provide, the better the
                      generated code will be.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3 text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Generating Project...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Rocket className="h-5 w-5" />
                        <span>Generate Project</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Templates Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Quick Start Templates
                </h3>
                <span className="text-sm text-gray-400">
                  {quickTemplates.length} templates
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTemplates.map((template, index) => (
                  <Card
                    key={index}
                    className="bg-gray-800/30 border-gray-700 hover:border-cyan-500/30 transition-all duration-200 cursor-pointer group"
                    onClick={() => handleUseTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-400 mt-1">
                            {template.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {template.tech.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="bg-gray-700 text-gray-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <p className="text-gray-400">Need Inspiration?</p>
                </CardTitle>
                <CardDescription>
                  Try these popular project ideas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "E-commerce platform with shopping cart and payments",
                    "Social media app with posts and comments",
                    "Task management dashboard with drag & drop",
                    "Real-time chat application with rooms",
                    "Weather app with location services",
                    "Blog platform with markdown support",
                  ].map((idea, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-start text-left h-auto py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 border border-gray-700"
                      onClick={() => setProjectDescription(idea)}
                    >
                      <span className="line-clamp-2">{idea}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Projects & Analytics (1/4 width) */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <div className="text-2xl font-bold text-cyan-400">
                      {stats.totalProjects}
                    </div>
                    <div className="text-sm text-gray-400">Total Projects</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="text-xl font-bold text-purple-400">
                        {stats.thisWeek}
                      </div>
                      <div className="text-xs text-gray-400">This Week</div>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="text-xl font-bold text-blue-400">
                        {stats.totalFiles}
                      </div>
                      <div className="text-xs text-gray-400">Files</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects Summary */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-cyan-400" />
                    <p className="text-white">Your Projects</p>
                    <Badge variant="secondary" className="ml-1">
                      {projects.length}
                    </Badge>
                  </CardTitle>

                  {/* View All Projects Link - Arrow Only */}
                  <Link
                    to="/projects"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors group"
                    title="View all projects"
                  >
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                {/* Project List */}
                {isFetching ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                ) : filteredProjects.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FolderOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {projects.length === 0
                        ? "No projects yet"
                        : "No projects found"}
                    </p>
                    {projects.length === 0 && (
                      <Button
                        onClick={() =>
                          document
                            .getElementById("generation-form")
                            ?.scrollIntoView({ behavior: "smooth" })
                        }
                        variant="outline"
                        size="sm"
                        className="mt-2"
                      >
                        Create Your First Project
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredProjects.slice(0, 6).map((project) => (
                      <div
                        key={project._id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-colors group"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                            <h4 className="font-medium text-sm text-white truncate">
                              {project.projectName}
                            </h4>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>{project.files?.length || 0} files</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadProject(project)}
                            className="h-7 w-7 text-gray-400 hover:text-cyan-400"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Link to={`/project/${project._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-400 hover:text-green-400"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View All Projects Button (alternative) */}
                {projects.length > 6 && (
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-400 hover:text-white hover:border-cyan-500/50 group"
                    asChild
                  >
                    <Link to="/projects">
                      View All Projects ({projects.length})
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-300">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Invite Team Members
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-white"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-400 hover:text-white"
                  asChild
                >
                  <Link to="/documentation">
                    <Copy className="h-4 w-4 mr-2" />
                    Documentation
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
