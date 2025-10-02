import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import toast from "react-hot-toast";
import {
  downloadProject,
  getProjectById,
  updateFileContent,
} from "@/api/apiService";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Save,
  Loader2,
  ArrowLeft,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Download,
  Share2,
} from "lucide-react";

// --- Type Definitions ---
interface ProjectFile {
  path: string;
  content: string;
  type: "file";
}

interface ProjectFolder {
  path: string;
  name: string;
  type: "folder";
  children: (ProjectFile | ProjectFolder)[];
}

interface Project {
  _id: string;
  projectName: string;
  files: ProjectFile[];
}

// Helper function to build folder structure from file paths
const buildFolderStructure = (files: ProjectFile[]): ProjectFolder[] => {
  const root: ProjectFolder = {
    path: "",
    name: "",
    type: "folder",
    children: [],
  };

  files.forEach((file) => {
    const parts = file.path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // This is the file
        current.children.push({
          ...file,
          type: "file" as const,
        });
      } else {
        // This is a folder
        let folder = current.children.find(
          (child) => child.type === "folder" && child.name === part
        ) as ProjectFolder | undefined;

        if (!folder) {
          folder = {
            path: parts.slice(0, index + 1).join("/"),
            name: part,
            type: "folder",
            children: [],
          };
          current.children.push(folder);
        }
        current = folder;
      }
    });
  });

  return root.children.filter(
    (child) => child.type === "folder"
  ) as ProjectFolder[];
};

const ProjectDetailPage = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [folderStructure, setFolderStructure] = useState<ProjectFolder[]>([]);
  const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;
      setIsLoading(true);
      try {
        const response = await getProjectById(projectId);
        setProject(response.data);

        // Build folder structure from files
        const structure = buildFolderStructure(response.data.files || []);
        setFolderStructure(structure);

        // Expand all folders by default
        const allFolders = new Set<string>();
        const collectFolders = (folders: ProjectFolder[]) => {
          folders.forEach((folder) => {
            allFolders.add(folder.path);
            collectFolders(
              folder.children.filter(
                (child) => child.type === "folder"
              ) as ProjectFolder[]
            );
          });
        };
        collectFolders(structure);
        setExpandedFolders(allFolders);

        // Automatically select the first file to display
        if (response.data.files && response.data.files.length > 0) {
          setActiveFile(response.data.files[0]);
          setEditorContent(response.data.files[0].content);
        }
      } catch (error) {
        console.error("Failed to fetch project details", error);
        toast.error("Failed to load project");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const handleFileClick = (file: ProjectFile) => {
    setActiveFile(file);
    setEditorContent(file.content);
  };

  const handleSave = async () => {
    if (!projectId || !activeFile) return;

    setIsSaving(true);
    const savePromise = updateFileContent(
      projectId,
      activeFile.path,
      editorContent
    );

    toast.promise(savePromise, {
      loading: "Saving file...",
      success: <b>File saved successfully!</b>,
      error: <b>Failed to save file.</b>,
    });

    try {
      await savePromise;
      // Update the local state so the file content is up-to-date
      setActiveFile({ ...activeFile, content: editorContent });
    } catch (error) {
      console.error("Failed to save file", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadProject = async () => {
    if (!projectId || !project) return;

    try {
      const response = await downloadProject(project._id);
      // Create a temporary URL from the file blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${project.projectName}.zip`);

      // Trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download project", error);
      toast.error("Failed to download project");
    }
  };

  // Recursive component for rendering folder structure
  const RenderFolder = ({
    folder,
    depth = 0,
  }: {
    folder: ProjectFolder;
    depth?: number;
  }) => {
    const isExpanded = expandedFolders.has(folder.path);
    const FolderIcon = isExpanded ? FolderOpen : Folder;

    return (
      <div>
        <button
          onClick={() => toggleFolder(folder.path)}
          className="w-full text-left px-2 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-zinc-700 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <ChevronRight
            size={16}
            className={`transition-transform ${
              isExpanded ? "rotate-90" : ""
            } text-zinc-400`}
          />
          <FolderIcon size={16} className="text-blue-400 flex-shrink-0" />
          <span className="text-zinc-300 truncate">{folder.name}</span>
        </button>

        {isExpanded && (
          <div className="ml-2">
            {folder.children.map((child, index) => {
              if (child.type === "folder") {
                return (
                  <RenderFolder
                    key={child.path}
                    folder={child}
                    depth={depth + 1}
                  />
                );
              } else {
                return (
                  <button
                    key={child.path}
                    onClick={() => handleFileClick(child)}
                    className={`w-full text-left px-2 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-zinc-700 transition-colors ${
                      activeFile?.path === child.path
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-zinc-400"
                    }`}
                    style={{ paddingLeft: `${(depth + 1) * 12 + 20}px` }}
                  >
                    <FileText
                      size={16}
                      className="text-green-400 flex-shrink-0"
                    />
                    <span className="truncate">
                      {child.path.split("/").pop()}
                    </span>
                  </button>
                );
              }
            })}
          </div>
        )}
      </div>
    );
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    const iconClass = "flex-shrink-0";

    switch (extension) {
      case "js":
      case "jsx":
        return (
          <FileText size={16} className={`${iconClass} text-yellow-400`} />
        );
      case "ts":
      case "tsx":
        return <FileText size={16} className={`${iconClass} text-blue-400`} />;
      case "html":
        return (
          <FileText size={16} className={`${iconClass} text-orange-400`} />
        );
      case "css":
        return <FileText size={16} className={`${iconClass} text-blue-500`} />;
      case "json":
        return (
          <FileText size={16} className={`${iconClass} text-yellow-500`} />
        );
      case "md":
        return <FileText size={16} className={`${iconClass} text-gray-400`} />;
      default:
        return <FileText size={16} className={`${iconClass} text-gray-400`} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="text-center text-gray-400">
          <p className="text-lg mb-2">Project not found</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* File Explorer Sidebar */}
      <aside className="w-80 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-white truncate">
              {project.projectName}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadProject}
              className="text-xs text-gray-400 hover:text-white"
            >
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-gray-400 hover:text-white"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {folderStructure.map((folder) => (
              <RenderFolder key={folder.path} folder={folder} />
            ))}

            {/* Root level files */}
            {project.files
              ?.filter((file) => !file.path.includes("/"))
              .map((file) => (
                <button
                  key={file.path}
                  onClick={() => handleFileClick(file)}
                  className={`w-full text-left px-2 py-1 rounded-md text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors ${
                    activeFile?.path === file.path
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "text-gray-400"
                  }`}
                >
                  {getFileIcon(file.path)}
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="w-full justify-start gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </div>
      </aside>

      {/* Main Content: Editor */}
      <main className="flex-1 flex flex-col">
        {activeFile ? (
          <>
            <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm p-3 border-b border-gray-700">
              <div className="flex items-center gap-2">
                {getFileIcon(activeFile.path)}
                <span className="text-sm text-gray-300 font-medium">
                  {activeFile.path}
                </span>
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                theme="vs-dark"
                path={activeFile.path}
                value={editorContent}
                onChange={(value) => setEditorContent(value || "")}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  wordWrap: "on",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <p className="text-lg mb-2">Select a file to begin editing</p>
              <p className="text-sm text-gray-400">
                Choose a file from the explorer to start coding
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetailPage;
