import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Eye,
  Trash2,
  FolderOpen,
  FileText,
  Clock,
  ChevronRight,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { getProjects, downloadProject, deleteProject } from "@/api/apiService";

interface Project {
  _id: string;
  projectName: string;
  description: string;
  techStack: string[];
  files: { path: string }[];
  createdAt: string;
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deletingProjects, setDeletingProjects] = useState<Set<string>>(
    new Set()
  );

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
      setDeletingProjects((prev) => new Set(prev).add(projectId));
      try {
        await deleteProject(projectId);
        setProjects((prev) =>
          prev.filter((project) => project._id !== projectId)
        );
      } catch (error) {
        console.error("Error deleting project:", error);
      } finally {
        setDeletingProjects((prev) => {
          const newSet = new Set(prev);
          newSet.delete(projectId);
          return newSet;
        });
      }
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech =
      selectedTech === "all" || project.techStack?.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  const allTechStacks = [
    ...new Set(projects.flatMap((project) => project.techStack || [])),
  ];

  const stats = {
    totalProjects: projects.length,
    totalFiles: projects.reduce(
      (acc, project) => acc + (project.files?.length || 0),
      0
    ),
    filteredCount: filteredProjects.length,
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading your projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white pt-20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">All Projects</h1>
            <p className="text-gray-400">
              Manage and organize all your generated projects
            </p>
          </div>

          <Button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 whitespace-nowrap"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-cyan-400">
              {stats.totalProjects}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Projects</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">
              {stats.filteredCount}
            </div>
            <div className="text-xs text-gray-400 mt-1">Showing</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">
              {stats.totalFiles}
            </div>
            <div className="text-xs text-gray-400 mt-1">Total Files</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-11"
              />
            </div>

            {/* Tech Filter */}
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full pl-10 bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-cyan-500 focus:outline-none h-11 appearance-none"
              >
                <option value="all">All Technologies</option>
                {allTechStacks.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-600 rounded-lg p-1 h-11">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`px-3 ${
                viewMode === "grid"
                  ? "bg-gray-600"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`px-3 ${
                viewMode === "list"
                  ? "bg-gray-600"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Projects Grid/List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
            <FolderOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {projects.length === 0 ? "No projects yet" : "No projects found"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {projects.length === 0
                ? "Get started by generating your first project with AI"
                : "Try adjusting your search criteria or filters to find what you're looking for."}
            </p>
            {projects.length === 0 && (
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Project
              </Button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 group backdrop-blur-sm"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                        <FileText className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {project.projectName}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.slice(0, 3).map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-700 text-gray-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-gray-700 text-gray-300 text-xs"
                      >
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      <span>{project.files?.length || 0} files</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <Link
                      to={`/project/${project._id}`}
                      className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Code
                      <ChevronRight className="h-4 w-4" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadProject(project)}
                        className="h-8 w-8 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20"
                        title="Download as ZIP"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProject(project._id)}
                        disabled={deletingProjects.has(project._id)}
                        className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                        title="Delete project"
                      >
                        {deletingProjects.has(project._id) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-white text-lg truncate">
                            {project.projectName}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {project.techStack
                              ?.slice(0, 3)
                              .map((tech, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-gray-700 text-gray-300 text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            {project.techStack &&
                              project.techStack.length > 3 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-700 text-gray-300 text-xs"
                                >
                                  +{project.techStack.length - 3}
                                </Badge>
                              )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{project.files?.length || 0} files</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link to={`/project/${project._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 whitespace-nowrap"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Code
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadProject(project)}
                        className="h-9 w-9 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20"
                        title="Download as ZIP"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProject(project._id)}
                        disabled={deletingProjects.has(project._id)}
                        className="h-9 w-9 text-gray-400 hover:text-red-400 hover:bg-red-500/20"
                        title="Delete project"
                      >
                        {deletingProjects.has(project._id) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {filteredProjects.length > 0 && (
          <div className="mt-8 text-center text-gray-400 text-sm">
            Showing {filteredProjects.length} of {projects.length} projects
            {searchQuery && ` for "${searchQuery}"`}
            {selectedTech !== "all" && ` in ${selectedTech}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
