/**
 * ==============================================================================
 * PROJECT PROFILE & DOWNLOAD HUB - DATA CONFIGURATION
 * ==============================================================================
 * Central configuration module for developer profile, projects, and downloads.
 * ==============================================================================
 */

// Developer Profile Configuration
const PROFILE_CONFIG = {
  developerName: "SR-RG",
  alias: "SR-RG",
  badge: "SYSTEM ONLINE // v2.4.0",
  tagline: "SR-RG // Developer, System Modder, and Retro-Computing Enthusiast",
  shortBio: "Official project showcase, system modding archive, and public download hub by SR-RG.",
  aboutDescription: "Hello! I am SR-RG, an independent software developer and system modification enthusiast. Through this portal, I archive and distribute specialized tools, automation scripts, firmware patches, and legacy system enhancements freely accessible to the global community.",
  githubUrl: "https://github.com/SR-RG",
  githubUsername: "SR-RG",
  email: "developer@example.com",
  skills: [
    "System Modification & Patching",
    "Reverse Engineering",
    "Android ROM & Kernel Tooling",
    "Shell & Bash Automation",
    "C / C99 / Assembly",
    "Retro Computing & Porting",
    "Python Scripts",
    "JavaScript & Web Tech"
  ],
  stats: {
    totalProjects: 0,
    totalDownloads: 0,
    activeRepositories: 1,
    uptimeRate: "100%"
  }
};

// Supported File Categories
const DOWNLOAD_CATEGORIES = [
  { id: "all", label: "All Files", icon: "folder" },
  { id: "android", label: "Android", icon: "smartphone" },
  { id: "firmware", label: "Firmware", icon: "cpu" },
  { id: "modification", label: "Modification", icon: "tool" },
  { id: "tools", label: "Tools", icon: "box" },
  { id: "scripts", label: "Scripts", icon: "terminal" },
  { id: "applications", label: "Applications", icon: "grid" },
  { id: "other", label: "Other Files", icon: "file" }
];

// Featured Projects Showcase
// Empty by default. Add objects here when ready to showcase projects.
const PROJECTS_DATA = [];

// Download Center Files
// Empty by default. Add objects here when ready to release download packages.
const DOWNLOADS_DATA = [];

// Helper Function: Filter Downloads
function getFilteredDownloads(category = "all", searchQuery = "", sortBy = "default") {
  if (!Array.isArray(DOWNLOADS_DATA)) return [];
  let list = [...DOWNLOADS_DATA];

  // 1. Filter Kategori
  if (category && category !== "all") {
    list = list.filter(item => item.category && item.category.toLowerCase() === category.toLowerCase());
  }

  // 2. Filter Pencarian Teks
  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item =>
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.filename && item.filename.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q))
    );
  }

  // 3. Sorting
  if (sortBy === "name-asc") {
    list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  } else if (sortBy === "name-desc") {
    list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
  } else if (sortBy === "date-newest") {
    list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  } else if (sortBy === "date-oldest") {
    list.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  } else if (sortBy === "size-largest") {
    list.sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0));
  } else if (sortBy === "size-smallest") {
    list.sort((a, b) => (a.sizeBytes || 0) - (b.sizeBytes || 0));
  }

  return list;
}
