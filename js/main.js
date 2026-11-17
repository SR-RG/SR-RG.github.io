/**
 * ==============================================================================
 * PROJECT PROFILE & DOWNLOAD HUB - MAIN JAVASCRIPT
 * ==============================================================================
 * Handles dynamic rendering, search, category filtering, sorting,
 * modal dialogs, and interactive terminal UI features.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Current state
  let currentCategory = "all";
  let currentSearchQuery = "";
  let currentSort = "default";

  // Cache DOM Elements
  const headerNav = document.getElementById("header-nav");
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const backToTopBtn = document.getElementById("back-to-top");
  
  const projectsGrid = document.getElementById("projects-grid");
  const downloadsGrid = document.getElementById("downloads-grid");
  const categoryTabsWrap = document.getElementById("category-tabs");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");
  const resultsCounter = document.getElementById("results-counter");

  const modalOverlay = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-project-title");
  const modalBody = document.getElementById("modal-project-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  // 1. Initialize Profile Information
  function initProfile() {
    if (typeof PROFILE_CONFIG === "undefined") return;

    // Elements with data-profile attributes
    document.querySelectorAll("[data-profile]").forEach(el => {
      const key = el.getAttribute("data-profile");
      if (PROFILE_CONFIG[key]) {
        el.textContent = PROFILE_CONFIG[key];
      }
    });

    // Links with data-profile-href
    document.querySelectorAll("[data-profile-href]").forEach(el => {
      const key = el.getAttribute("data-profile-href");
      if (PROFILE_CONFIG[key]) {
        el.setAttribute("href", PROFILE_CONFIG[key]);
      }
    });

    // Populate Tech Skills
    const skillsWrap = document.getElementById("skills-wrap");
    if (skillsWrap && PROFILE_CONFIG.skills) {
      skillsWrap.innerHTML = PROFILE_CONFIG.skills
        .map(skill => `<span class="skill-chip">${escapeHtml(skill)}</span>`)
        .join("");
    }

    // Stats
    if (PROFILE_CONFIG.stats) {
      setElText("stat-projects", PROFILE_CONFIG.stats.totalProjects);
      setElText("stat-downloads", PROFILE_CONFIG.stats.totalDownloads);
      setElText("stat-repos", PROFILE_CONFIG.stats.activeRepositories);
      setElText("stat-uptime", PROFILE_CONFIG.stats.uptimeRate);
    }
  }

  // 1.B. Hardware GPU Probing via WebGL Context
  function initGPUDetection() {
    const gpuElem = document.getElementById("gpu-device-name");
    const modeElem = document.getElementById("gpu-render-mode");
    if (!gpuElem) return;

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || 
                 canvas.getContext("webgl") || 
                 canvas.getContext("experimental-webgl");

      if (gl) {
        const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
        let unmasked = "";
        if (debugInfo) {
          unmasked = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        } else {
          unmasked = gl.getParameter(gl.RENDERER);
        }

        if (unmasked) {
          // Bersihkan format string renderer jika ada prefix ANGLE berlebihan
          let cleanGPU = unmasked
            .replace(/^ANGLE\s*\([^,]+,\s*/i, "")
            .replace(/\s+Direct3D.*$/i, "")
            .replace(/\s+vs_\d+_\d+.*$/i, "")
            .replace(/\s*\([^)]*\)$/, "")
            .trim();

          gpuElem.textContent = cleanGPU || unmasked;
          if (modeElem) {
            modeElem.innerHTML = `<span class="text-green">GPU_HARDWARE_ACCEL</span> <span style="font-size:0.75rem; color:var(--accent-cyan);">(DirectX/Metal/Vulkan)</span>`;
          }
          return;
        }
      }
    } catch (e) {
      console.warn("GPU WebGL Probe Exception:", e);
    }

    gpuElem.textContent = "GPU ACCELERATED (OpenGL/D3D)";
    if (modeElem) {
      modeElem.textContent = "GPU_HARDWARE_ACCEL";
    }
  }

  // 1.C. Live Global Visitor Counter (visitorbadge.io + localStorage fallback)
  async function initVisitorCounter() {
    const specVisitorEl = document.getElementById("live-visitor-count");
    const statVisitorEl = document.getElementById("stat-visitors");
    const footerVisitorEl = document.getElementById("footer-visitor-count");

    // LocalStorage tracking
    let storedCount = parseInt(localStorage.getItem("srrg_visitor_count") || "1", 10);
    // Increment local visit if new session
    if (!sessionStorage.getItem("srrg_session_visited")) {
      storedCount += 1;
      localStorage.setItem("srrg_visitor_count", storedCount);
      sessionStorage.setItem("srrg_session_visited", "true");
    }

    function updateDisplays(count) {
      const num = parseInt(count, 10);
      if (isNaN(num)) return;
      const formatted = num.toLocaleString();
      const padded = String(num).padStart(6, "0");
      if (specVisitorEl) specVisitorEl.textContent = `${formatted} VISITORS`;
      if (statVisitorEl) statVisitorEl.textContent = padded;
      if (footerVisitorEl) footerVisitorEl.textContent = padded;
    }

    // Set immediate display with current count
    updateDisplays(storedCount);

    // Fetch live hit counter from global endpoint
    try {
      const endpoint = "https://api.visitorbadge.io/api/visitors?path=SR-RG.project-download-hub&label=VISITORS";
      const response = await fetch(endpoint);
      if (response.ok) {
        const svgText = await response.text();
        const match = svgText.match(/VISITORS:\s*([0-9,]+)/i);
        if (match && match[1]) {
          const liveCount = parseInt(match[1].replace(/,/g, ""), 10);
          if (!isNaN(liveCount) && liveCount > 0) {
            updateDisplays(liveCount);
            localStorage.setItem("srrg_visitor_count", liveCount);
          }
        }
      }
    } catch (err) {
      console.log("Visitor counter operating in offline/local cache mode.");
    }
  }

  // 1.D. Live GitHub Repositories Auto-Sync
  async function fetchLiveGitHubRepos() {
    const reposContainer = document.getElementById("github-repos-grid");
    if (!reposContainer) return;

    const username = (typeof PROFILE_CONFIG !== "undefined" && PROFILE_CONFIG.githubUsername) 
      ? PROFILE_CONFIG.githubUsername 
      : "SR-RG";

    const LANG_COLORS = {
      "C": "#555555",
      "C++": "#f34b7d",
      "Python": "#3572A5",
      "JavaScript": "#f1e05a",
      "TypeScript": "#3178c6",
      "Shell": "#89e051",
      "HTML": "#e34c26",
      "CSS": "#563d7c",
      "Assembly": "#6E4C13",
      "Makefile": "#427819"
    };

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (response.ok) {
        const repos = await response.json();
        const publicRepos = Array.isArray(repos) ? repos.filter(r => !r.fork) : [];

        if (publicRepos.length > 0) {
          // Update stats ribbon counter automatically
          setElText("stat-repos", publicRepos.length + "+");

          // Render exact live repositories from GitHub
          reposContainer.innerHTML = publicRepos.map(repo => {
            const lang = repo.language || "Code";
            const langColor = LANG_COLORS[lang] || "#00f0ff";
            const desc = repo.description || `Public repository by ${username}.`;
            const starsBadge = repo.stargazers_count > 0 
              ? `<span class="repo-meta-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ${repo.stargazers_count}</span>` 
              : "";

            return `
              <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="repo-card">
                <div>
                  <div class="repo-header">
                    <span class="repo-name">${escapeHtml(repo.name)}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                  <p class="repo-desc">${escapeHtml(desc)}</p>
                </div>
                <div class="repo-footer">
                  <span>
                    <span class="repo-lang-dot" style="background:${langColor};"></span>
                    ${escapeHtml(lang)}
                  </span>
                  <div class="repo-stats-footer">
                    ${starsBadge}
                    <span class="text-cyan">Live on GitHub</span>
                  </div>
                </div>
              </a>
            `;
          }).join("");
          return;
        }
      }
    } catch (err) {
      console.log("GitHub API live sync fallback to cached cards:", err);
    }
  }

  // 2. Render Project Showcase
  function renderProjects() {
    if (!projectsGrid) return;
    if (typeof PROJECTS_DATA === "undefined" || !Array.isArray(PROJECTS_DATA) || PROJECTS_DATA.length === 0) {
      projectsGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; padding: 40px 20px;">
          <div class="empty-icon mono">[ 0 // ARCHIVE_STANDBY ]</div>
          <p class="text-cyan mono" style="font-size: 1rem; margin-top: 10px;">PROJECTS_IN_PREPARATION</p>
          <p class="text-dim" style="font-size: 0.88rem; margin-top: 8px; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            Katalog proyek modifikasi dan tools sedang dalam tahap kurasi &amp; persiapan rilis. Proyek akan ditampilkan secara bertahap saat dirilis ke publik.
          </p>
        </div>
      `;
      return;
    }

    projectsGrid.innerHTML = PROJECTS_DATA.map(proj => {
      const statusClass = `status-${proj.statusType || "primary"}`;
      const tagsHtml = (proj.tags || [])
        .map(tag => `<span class="tag-badge">#${escapeHtml(tag)}</span>`)
        .join("");

      return `
        <article class="project-card" data-id="${proj.id}">
          <div>
            <div class="project-card-header">
              <span class="project-category-tag">[${escapeHtml(proj.categoryLabel || proj.category)}]</span>
              <span class="project-status ${statusClass}">${escapeHtml(proj.status)}</span>
            </div>
            <h3 class="project-title">${escapeHtml(proj.title)}</h3>
            <p class="project-description">${escapeHtml(proj.description)}</p>
            <div class="project-tags">${tagsHtml}</div>
          </div>
          <div class="project-card-footer">
            <span class="mono text-dim" style="font-size:0.8rem;">${escapeHtml(proj.version)}</span>
            <div style="display:flex; gap:8px;">
              <button class="btn-card-action btn-outline btn-open-modal" data-id="${proj.id}">
                <span>Spec</span>
              </button>
              <a href="${proj.downloadUrl}" class="btn-card-action btn-primary" download>
                <span>Download</span>
              </a>
              ${proj.githubUrl ? `
                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-cyan" title="GitHub Repository">
                  <span>Repo</span>
                </a>
              ` : ""}
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Bind Modal triggers
    document.querySelectorAll(".btn-open-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        const projId = btn.getAttribute("data-id");
        openProjectModal(projId);
      });
    });
  }

  // 3. Render Category Tabs
  function renderCategoryTabs() {
    if (!categoryTabsWrap || typeof DOWNLOAD_CATEGORIES === "undefined") return;

    categoryTabsWrap.innerHTML = DOWNLOAD_CATEGORIES.map(cat => {
      const isActive = cat.id === currentCategory ? "active" : "";
      return `
        <button class="cat-tab-btn ${isActive}" data-category="${cat.id}">
          ${escapeHtml(cat.label)}
        </button>
      `;
    }).join("");

    // Bind tab clicks
    document.querySelectorAll(".cat-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".cat-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category");
        renderDownloads();
      });
    });
  }

  // 4. Render Downloads List
  function renderDownloads() {
    if (!downloadsGrid || typeof getFilteredDownloads !== "function") return;

    const list = getFilteredDownloads(currentCategory, currentSearchQuery, currentSort);

    if (resultsCounter) {
      const total = DOWNLOADS_DATA ? DOWNLOADS_DATA.length : 0;
      resultsCounter.textContent = `Showing ${list.length} of ${total} files`;
    }

    if (list.length === 0) {
      const isSearchOrFilter = currentCategory !== "all" || currentSearchQuery.trim() !== "";
      downloadsGrid.innerHTML = `
        <div class="empty-state" style="padding: 40px 20px;">
          <div class="empty-icon mono">[ 0 // RELEASES_STANDBY ]</div>
          <p class="text-green mono" style="font-size: 1rem; margin-top: 10px;">${isSearchOrFilter ? "NO_FILES_MATCHED_QUERY" : "NO_FILES_PUBLISHED_YET"}</p>
          <p class="text-dim" style="font-size: 0.88rem; margin-top: 8px; max-width: 520px; margin-left: auto; margin-right: auto; line-height: 1.6;">
            ${isSearchOrFilter 
              ? "Tidak ada file yang cocok dengan kata kunci atau kategori yang Anda pilih." 
              : "Belum ada berkas unduhan publik yang diunggah. Modifikasi sistem dan script resmi akan muncul di sini segera setelah dirilis."}
          </p>
        </div>
      `;
      return;
    }

    downloadsGrid.innerHTML = list.map(item => {
      const fileExt = (item.fileType || "file").toUpperCase();
      const badgeHtml = item.badge ? `<span class="file-badge">${escapeHtml(item.badge)}</span>` : "";

      return `
        <div class="download-item-card" data-id="${item.id}">
          <div class="file-type-icon">
            <span>.${escapeHtml(fileExt)}</span>
          </div>
          <div class="file-info-col">
            <div class="file-name-row">
              <span class="file-title">${escapeHtml(item.name)}</span>
              ${badgeHtml}
              <span class="mono text-cyan" style="font-size:0.75rem;">${escapeHtml(item.version)}</span>
            </div>
            <p class="file-desc">${escapeHtml(item.description)}</p>
            <div class="file-meta-row">
              <span class="meta-item"><strong class="text-dim">File:</strong> ${escapeHtml(item.filename)}</span>
              <span class="meta-item"><strong class="text-dim">Size:</strong> ${escapeHtml(item.size)}</span>
              <span class="meta-item"><strong class="text-dim">Category:</strong> ${escapeHtml(item.categoryLabel)}</span>
              <span class="meta-item"><strong class="text-dim">Updated:</strong> ${escapeHtml(item.date)}</span>
            </div>
          </div>
          <div class="file-action-col">
            <a href="${item.downloadUrl}" class="btn-download" download title="Download ${item.filename}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>DOWNLOAD</span>
            </a>
          </div>
        </div>
      `;
    }).join("");
  }

  // 5. Project Details Modal
  function openProjectModal(projectId) {
    if (!modalOverlay || typeof PROJECTS_DATA === "undefined") return;
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    modalTitle.textContent = `[SPEC: ${proj.title}]`;
    modalBody.innerHTML = `
      <div style="font-family: var(--font-mono); margin-bottom: 16px;">
        <span class="text-green">> STATUS:</span> ${escapeHtml(proj.status)} | 
        <span class="text-cyan">> VERSION:</span> ${escapeHtml(proj.version)} | 
        <span class="text-purple">> CATEGORY:</span> ${escapeHtml(proj.categoryLabel)}
      </div>
      <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
        ${escapeHtml(proj.details || proj.description)}
      </p>
      <div style="margin-bottom: 24px;">
        <h4 class="mono" style="font-size: 0.85rem; color: #fff; margin-bottom: 8px;">TECHNOLOGY STACK:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${(proj.tags || []).map(t => `<span class="skill-chip">#${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
      <div style="display:flex; gap:12px; border-top:1px solid var(--border-dim); padding-top:20px;">
        <a href="${proj.downloadUrl}" class="btn btn-primary" download style="flex:1;">
          DOWNLOAD RELEASE
        </a>
        ${proj.githubUrl ? `
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="flex:1;">
            VIEW REPOSITORY
          </a>
        ` : ""}
      </div>
    `;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  // 6. Search Input Listener (Live Filter with debounce)
  let searchDebounceTimeout = null;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = setTimeout(() => {
        currentSearchQuery = e.target.value;
        renderDownloads();
      }, 150);
    });
  }

  // 7. Sort Dropdown Listener
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderDownloads();
    });
  }

  // 8. Mobile Menu Toggle
  if (mobileToggle && headerNav) {
    mobileToggle.addEventListener("click", () => {
      headerNav.classList.toggle("mobile-open");
      const isOpen = headerNav.classList.contains("mobile-open");
      mobileToggle.innerHTML = isOpen ? "[ &times; CLOSE ]" : "[ MENU ]";
    });

    // Close menu when clicking link
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        headerNav.classList.remove("mobile-open");
        mobileToggle.innerHTML = "[ MENU ]";
      });
    });
  }

  // 9. Back to Top Button & Scrollspy
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Header border toggle
    if (headerNav) {
      if (scrollPos > 40) {
        headerNav.classList.add("scrolled");
      } else {
        headerNav.classList.remove("scrolled");
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Helper Utility Functions
  function setElText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Boot Application
  initProfile();
  initGPUDetection();
  initVisitorCounter();
  fetchLiveGitHubRepos();
  renderProjects();
  renderCategoryTabs();
  renderDownloads();
});

