/**
 * ==============================================================================
 * PROJECT PROFILE & DOWNLOAD HUB - DATA CONFIGURATION
 * ==============================================================================
 * File ini adalah pusat pengelolaan seluruh data profil, proyek, dan file unduhan.
 * Untuk menambah, mengubah, atau menghapus file dan proyek, cukup edit array di bawah.
 * Anda TIDAK PERLU mengubah struktur index.html!
 * ==============================================================================
 */

// Konfigurasi Profil & Info Developer
const PROFILE_CONFIG = {
  developerName: "SR-RG",
  alias: "SR-RG",
  badge: "SYSTEM ONLINE // v2.4.0",
  tagline: "SR-RG // Developer, System Modder, and Retro-Computing Enthusiast",
  shortBio: "Pusat resmi berbagi karya proyek, modifikasi sistem, tools otomasi, dan repository publik oleh SR-RG.",
  aboutDescription: "Halo! Saya SR-RG, pengembang dan enthusiast modifikasi sistem. Melalui portal ini, saya mengarsipkan dan membagikan berbagai tools, script otomasi, patch sistem, dan perbaikan software yang dapat diakses serta diunduh secara bebas oleh komunitas.",
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
    totalProjects: 12,
    totalDownloads: 48,
    activeRepositories: 8,
    uptimeRate: "99.9%"
  }
};

// Kategori File yang Didukung
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

// Data Proyek Unggulan (Project Showcase)
const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "TenFourFox Modern ES2020 QuickJS Engine",
    category: "modification",
    categoryLabel: "Modification",
    version: "v1.0.0",
    status: "Stable",
    statusType: "success",
    featured: true,
    icon: "code",
    description: "Injeksi native engine QuickJS ES2020 ke dalam TenFourFox untuk Mac OS X 10.4 Tiger. Mengaktifkan Optional Chaining (?.), Nullish Coalescing (??), dan Google Mode AI secara on-device.",
    details: "Proyek ini memecahkan keterbatasan parser SpiderMonkey 45 pada Mac OS X Tiger dengan menyuntikkan QuickJS C99 runtime dan dynamic XPCOM bridge. Mendukung sintaks modern ES2020 dan merender Google modern layout beserta Mode AI.",
    tags: ["QuickJS", "C99", "Gecko", "XPCOM", "Mac OS X Tiger"],
    downloadId: "dl-1",
    downloadUrl: "./downloads/sample_patch_config.txt",
    githubUrl: "https://github.com/SR-RG/tenfourfox-quickjs-bridge"
  },
  {
    id: "proj-2",
    title: "Android System Tweaker & Debloat Tool",
    category: "android",
    categoryLabel: "Android",
    version: "v2.3.1",
    status: "Active",
    statusType: "primary",
    featured: true,
    icon: "smartphone",
    description: "Tool otomatis berbasis CLI/ADB untuk menghapus bloatware sistem Android, mengoptimalkan deep sleep baterai, dan membuka opsi developer tersembunyi.",
    details: "Script lengkap yang bekerja tanpa root menggunakan ADB shell. Mendukung berbagai vendor Android (Samsung, Xiaomi, Google Pixel, OnePlus) dengan safe-list terverifikasi.",
    tags: ["Android", "ADB", "Bash", "Optimization", "No-Root"],
    downloadId: "dl-2",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    githubUrl: "https://github.com/SR-RG/android-system-tweaker"
  },
  {
    id: "proj-3",
    title: "Retro Mac Native Media H.264 Enabler",
    category: "tools",
    categoryLabel: "Tools",
    version: "v3.0.0",
    status: "Stable",
    statusType: "success",
    featured: true,
    icon: "video",
    description: "Patch akselerasi hardware dan integrasi FFmpeg Cameron Kaiser untuk pemutaran video H.264 MP4 native pada browser legacy Mac OS X.",
    details: "Menyediakan codec dylib native untuk arsitektur Intel x86 dan PowerPC, memungkinkan pemutaran video YouTube dan streaming lancar pada sistem Mac lama tanpa lag.",
    tags: ["FFmpeg", "MediaCodec", "H.264", "Mac OS X", "C++"],
    downloadId: "dl-3",
    downloadUrl: "./downloads/sample_patch_config.txt",
    githubUrl: "https://github.com/SR-RG/retro-media-enabler"
  },
  {
    id: "proj-4",
    title: "Universal Flash & Recovery Automation Tool",
    category: "firmware",
    categoryLabel: "Firmware",
    version: "v1.4.2",
    status: "Beta",
    statusType: "warning",
    featured: false,
    icon: "cpu",
    description: "Script otomatisasi flashing firmware vendor, unbrick helper, dan pengelola partisi boot/vendor via Fastboot dan EDL mode.",
    details: "Dibuat dengan shell script interaktif yang memvalidasi checksum payload firmware sebelum flashing untuk mencegah kondisi hard-brick.",
    tags: ["Fastboot", "Firmware", "EDL", "Recovery", "Automation"],
    downloadId: "dl-4",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    githubUrl: "https://github.com/SR-RG/fastboot-recovery-tool"
  },
  {
    id: "proj-5",
    title: "Cross-Platform Backup & Archive Utility",
    category: "scripts",
    categoryLabel: "Scripts",
    version: "v1.1.0",
    status: "Active",
    statusType: "primary",
    featured: false,
    icon: "archive",
    description: "Script sinkronisasi cerdas dengan proteksi data eksternal, rotasi backup otomatis, dan kompresi terenkripsi.",
    details: "Dirancang khusus untuk menjaga integritas data pada storage eksternal dan workstation lokal secara otomatis dengan notifikasi terminal.",
    tags: ["Backup", "Automation", "Shell", "Rsync", "POSIX"],
    downloadId: "dl-5",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    githubUrl: "https://github.com/SR-RG/backup-utility"
  },
  {
    id: "proj-6",
    title: "Terminal Cyberpunk Modern Theme Pack",
    category: "applications",
    categoryLabel: "Applications",
    version: "v2.0.0",
    status: "Stable",
    statusType: "success",
    featured: false,
    icon: "layout",
    description: "Paket kustomisasi tema visual desktop bernuansa dark terminal futuristik dengan font developer dan ikon pixel retro modern.",
    details: "Menyediakan skin profil terminal, konfigurasi zsh/bash, skema warna Sublime/VS Code, dan paket ikon vektor resolusi tinggi.",
    tags: ["Theme", "UI/UX", "Cyberpunk", "Terminal", "Customization"],
    downloadId: "dl-6",
    downloadUrl: "./downloads/sample_patch_config.txt",
    githubUrl: "https://github.com/SR-RG/terminal-theme-pack"
  }
];

// Data File Download (Download Center)
const DOWNLOADS_DATA = [
  {
    id: "dl-1",
    name: "TenFourFox QuickJS ES2020 Engine Patch",
    filename: "tenfourfox-quickjs-bridge-v1.0.0.zip",
    fileType: "zip",
    category: "modification",
    categoryLabel: "Modification",
    version: "v1.0.0",
    size: "2.9 MB",
    sizeBytes: 3040871,
    date: "2026-11-15",
    description: "Paket lengkap injeksi library QuickJS (libquickjs.dylib, bridge, patch XPCOM) untuk TenFourFox Mac OS X Tiger.",
    downloadUrl: "./downloads/sample_patch_config.txt",
    sourceUrl: "https://github.com/SR-RG/tenfourfox-quickjs-bridge",
    isExternal: false,
    downloadCount: 342,
    badge: "Hot Fix"
  },
  {
    id: "dl-2",
    name: "Android System Debloater Script",
    filename: "android_debloat_tool.sh",
    fileType: "sh",
    category: "android",
    categoryLabel: "Android",
    version: "v2.3.1",
    size: "45 KB",
    sizeBytes: 46080,
    date: "2026-11-10",
    description: "Script ADB shell tanpa root untuk membersihkan aplikasi bloatware vendor dan meningkatkan efisiensi RAM/baterai.",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    sourceUrl: "https://github.com/SR-RG/android-system-tweaker",
    isExternal: false,
    downloadCount: 1280,
    badge: "Popular"
  },
  {
    id: "dl-3",
    name: "FFmpeg Cameron Kaiser Media Acceleration Enabler",
    filename: "t4f_media_ffmpeg_enabler.zip",
    fileType: "zip",
    category: "tools",
    categoryLabel: "Tools",
    version: "v3.0.0",
    size: "8.4 MB",
    sizeBytes: 8808038,
    date: "2026-11-14",
    description: "Kumpulan dynamic library MP4/H.264 hardware acceleration untuk browser legacy Gecko/Firefox.",
    downloadUrl: "./downloads/sample_patch_config.txt",
    sourceUrl: "https://github.com/SR-RG/retro-media-enabler",
    isExternal: false,
    downloadCount: 512,
    badge: "Essential"
  },
  {
    id: "dl-4",
    name: "Fastboot Universal Unbrick & Flasher Helper",
    filename: "fastboot_unbrick_helper.sh",
    fileType: "sh",
    category: "firmware",
    categoryLabel: "Firmware",
    version: "v1.4.2",
    size: "82 KB",
    sizeBytes: 83968,
    date: "2026-11-05",
    description: "Tool otomasi verifikasi dan flashing partisi boot/system/vendor dengan proteksi anti-brick.",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    sourceUrl: "https://github.com/SR-RG/fastboot-recovery-tool",
    isExternal: false,
    downloadCount: 620,
    badge: "Utility"
  },
  {
    id: "dl-5",
    name: "Developer Daily Workspace Automation Kit",
    filename: "dev_workspace_auto.sh",
    fileType: "sh",
    category: "scripts",
    categoryLabel: "Scripts",
    version: "v1.1.0",
    size: "28 KB",
    sizeBytes: 28672,
    date: "2026-11-12",
    description: "Kumpulan script terminal untuk sinkronisasi workspace, git batch operations, dan maintenance sistem.",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    sourceUrl: "https://github.com/SR-RG/backup-utility",
    isExternal: false,
    downloadCount: 410,
    badge: "Automation"
  },
  {
    id: "dl-6",
    name: "Dark Terminal Cyberpunk Icon & Color Assets",
    filename: "dark_terminal_theme_assets.zip",
    fileType: "zip",
    category: "applications",
    categoryLabel: "Applications",
    version: "v2.0.0",
    size: "15.2 MB",
    sizeBytes: 15938355,
    date: "2026-11-01",
    description: "Asset icon SVG, wallpaper minimalis, dan skema warna terminal gelap berformat JSON/YAML.",
    downloadUrl: "./downloads/sample_patch_config.txt",
    sourceUrl: "https://github.com/SR-RG/terminal-theme-pack",
    isExternal: false,
    downloadCount: 890,
    badge: "Creative"
  },
  {
    id: "dl-7",
    name: "AOSP Generic Vendor Bloatware Checklist",
    filename: "android_bloatware_list.txt",
    fileType: "txt",
    category: "other",
    categoryLabel: "Other Files",
    version: "v2026.11",
    size: "18 KB",
    sizeBytes: 18432,
    date: "2026-11-08",
    description: "Database daftar package name bloatware vendor Android yang aman di-disable atau dihapus.",
    downloadUrl: "./downloads/sample_patch_config.txt",
    sourceUrl: "https://github.com/SR-RG/",
    isExternal: false,
    downloadCount: 310,
    badge: "Reference"
  },
  {
    id: "dl-8",
    name: "Universal POSIX Cross-Compile Makefile Template",
    filename: "posix_c99_makefile.tar.gz",
    fileType: "tar.gz",
    category: "tools",
    categoryLabel: "Tools",
    version: "v1.0.4",
    size: "12 KB",
    sizeBytes: 12288,
    date: "2026-10-28",
    description: "Template Makefile modular untuk kompilasi C99 portabel di Darwin 8, Linux, dan BSD lama.",
    downloadUrl: "./downloads/sample_automation_tool.sh",
    sourceUrl: "https://github.com/SR-RG/",
    isExternal: false,
    downloadCount: 195,
    badge: "Developer"
  }
];

// Helper Function: Filter Downloads
function getFilteredDownloads(category = "all", searchQuery = "", sortBy = "default") {
  let list = [...DOWNLOADS_DATA];

  // 1. Filter Kategori
  if (category && category !== "all") {
    list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  // 2. Filter Pencarian Teks
  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.filename.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q)
    );
  }

  // 3. Sorting
  if (sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    list.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "date-newest") {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === "date-oldest") {
    list.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === "size-largest") {
    list.sort((a, b) => b.sizeBytes - a.sizeBytes);
  } else if (sortBy === "size-smallest") {
    list.sort((a, b) => a.sizeBytes - b.sizeBytes);
  }

  return list;
}

