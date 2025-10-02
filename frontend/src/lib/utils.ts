import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FileNode {
  [key: string]: FileNode | true;
}

export const buildFileTree = (files: { path: string }[]): FileNode => {
  const tree: FileNode = {};
  files.forEach((file) => {
    let currentLevel = tree;
    const pathParts = file.path.split("/");
    pathParts.forEach((part, index) => {
      if (index === pathParts.length - 1) {
        currentLevel[part] = true; // Mark as a file
      } else {
        currentLevel[part] = currentLevel[part] || {};
        currentLevel = currentLevel[part] as FileNode;
      }
    });
  });
  return tree;
};
