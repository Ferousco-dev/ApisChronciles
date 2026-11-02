/* ==========================================================================
   THE PUBLIC APIS CHRONICLE — APPLICATION CONTROLLER (app.js)
   Aesthetics: 1990s Antique Newspaper / Aged Parchment / Library Archive
   ========================================================================== */

(function () {
  'use strict';

  /* ==========================================================================
     Archive Flagship Pinned APIs (Displayed First & Highlighted)
     ========================================================================== */
  const PINNED_NAMES = [
    "SKDL Movie & TV Resolution Service",
    "MovieBox Python API SDK (Simatwa)",
    "MovieBox REST API"
  ];

  /* ==========================================================================
     IndexedDB High-Speed Client-Side Caching Layer
     ========================================================================== */
  const DB_NAME = "FreePublicApisDB";
  const DB_VERSION = 6;
  const STORE_NAME = "apis_store";
  const CACHE_KEY = "apis_data_v6";

  function openDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function getCachedApis() {
    try {
      const db = await openDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(CACHE_KEY);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn("IndexedDB unavailable, falling back:", e);
      return null;
    }
  }

  async function setCachedApis(data) {
    try {
      const db = await openDB();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(data, CACHE_KEY);
    } catch (e) {
      console.warn("Could not save to IndexedDB:", e);
    }
  }

  async function clearCache() {
    try {
      const db = await openDB();
      if (!db) return;
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).clear();
    } catch (e) {}
  }

  /* ==========================================================================
     Hugeicons Vector Icons (Zero Emojis)
     ========================================================================== */
  const HugeIcons = {
    star: `<svg class="hugeicon hugeicon-star" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12.7972 2.90494C13.2554 3.57043 13.9479 4.70769 14.6514 6.04507C15.1942 7.07701 15.4657 7.59298 15.8551 7.86959C16.2444 8.14621 16.812 8.2313 17.9472 8.40149C19.5204 8.63736 20.6806 8.89214 21.3467 9.05516C21.735 9.15017 21.9976 9.50036 21.9976 9.9001C21.9976 10.1262 21.9127 10.344 21.7606 10.5113C21.0637 11.2777 20.3487 12.0836 19.4701 12.961C18.605 13.8249 18.1724 14.2569 18.0253 14.7261C17.8781 15.1954 17.9834 15.7792 18.1939 16.9469C18.3735 17.9433 18.5569 19.1306 18.6921 20.4219C18.7528 21.0024 18.2921 21.5 17.7085 21.5C17.6522 21.5 17.5967 21.4962 17.542 21.4824C17.0502 21.3578 15.919 20.7845 14.1246 19.7243C13.0722 19.1025 12.5461 18.7917 11.9993 18.7917C11.4526 18.7917 10.9265 19.1026 9.87427 19.7244C8.08025 20.7845 6.94977 21.3578 6.45797 21.4824C6.40334 21.4962 6.34784 21.5 6.29148 21.5C5.70788 21.5 5.24716 21.0024 5.30793 20.4219C5.44314 19.1306 5.6265 17.9433 5.80612 16.9469C6.01661 15.7792 6.12186 15.1954 5.97471 14.7261C5.82756 14.2569 5.395 13.8249 4.52987 12.961C3.65132 12.0836 2.93633 11.2777 2.23944 10.5113C2.08729 10.344 2.00244 10.1262 2.00244 9.9001C2.00244 9.50036 2.265 9.15017 2.65328 9.05516C3.31945 8.89214 4.4796 8.63736 6.05284 8.40149C7.18801 8.2313 7.75559 8.14621 8.14498 7.86958C8.53437 7.59295 8.80577 7.07698 9.34859 6.04505C10.0521 4.70768 10.7445 3.57044 11.2026 2.90495C11.3825 2.64364 11.6827 2.5 11.9999 2.5C12.3171 2.5 12.6173 2.64364 12.7972 2.90494Z"/></svg>`,
    externalLink: `<svg class="hugeicon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"/></svg>`,
    copy: `<svg class="hugeicon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"/></svg>`,
    sun: `<svg class="hugeicon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"/><path d="M12 2C11.6227 2.33333 11.0945 3.2 12 4M12 20C12.3773 20.3333 12.9055 21.2 12 22M19.5 4.50271C18.9685 4.46982 17.9253 4.72293 18.0042 5.99847M5.49576 17.5C5.52865 18.0315 5.27555 19.0747 4 18.9958M5.00271 4.5C4.96979 5.03202 5.22315 6.0763 6.5 5.99729M18 17.5026C18.5315 17.4715 19.5747 17.7108 19.4958 18.9168M22 12C21.6667 11.6227 20.8 11.0945 20 12M4 11.5C3.66667 11.8773 2.8 12.4055 2 11.5"/></svg>`,
    moon: `<svg class="hugeicon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"/></svg>`,
    refresh: `<svg class="hugeicon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.4879 15C19.2524 18.4956 15.9187 21 12 21C7.02943 21 3 16.9706 3 12C3 7.02943 7.02943 3 12 3C15.7292 3 18.9286 5.26806 20.2941 8.5"/><path d="M15 9H18C19.4142 9 20.1213 9 20.5607 8.56066C21 8.12132 21 7.41421 21 6V3"/></svg>`
  };

  /* ==========================================================================
     Theme Management (Daylight Paper vs. Midnight Archive)
     ========================================================================== */
  const THEME_STORAGE_KEY = "vintage_archive_theme";

  function updateThemeUI(theme) {
    const fabIconEl = document.getElementById("fabThemeIcon");
    const fabBtn = document.getElementById("themeToggleFab");
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.name = "theme-color";
      document.head.appendChild(metaThemeColor);
    }

    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      metaThemeColor.setAttribute("content", "#1a1612");
      if (fabIconEl) fabIconEl.innerHTML = HugeIcons.sun;
      if (fabBtn) fabBtn.setAttribute("title", "Switch to Daylight Paper Theme");
    } else {
      document.documentElement.removeAttribute("data-theme");
      metaThemeColor.setAttribute("content", "#f4ecdc");
      if (fabIconEl) fabIconEl.innerHTML = HugeIcons.moon;
      if (fabBtn) fabBtn.setAttribute("title", "Switch to Midnight Archive Theme");
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    updateThemeUI(newTheme);
    showToast(newTheme === "dark" ? "Switched to Midnight Archive theme" : "Switched to Daylight Paper theme");
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) {
      updateThemeUI(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      updateThemeUI(prefersDark ? "dark" : "light");
    }
  }

  /* ==========================================================================
     Scroll to Top FAB
     ========================================================================== */
  const scrollToTopFab = document.getElementById("scrollToTopFab");
  if (scrollToTopFab) {
    scrollToTopFab.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 280) {
        scrollToTopFab.classList.add("visible");
      } else {
        scrollToTopFab.classList.remove("visible");
      }
    }, { passive: true });
  }

  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);

  const themeToggleFab = document.getElementById("themeToggleFab");
  if (themeToggleFab) themeToggleFab.addEventListener("click", toggleTheme);

  /* ==========================================================================
     Application State & Relevance Ranking Engine
     ========================================================================== */
  let ALL_APIS = [];
  let filteredList = [];
  let currentAuth = "ALL";
  let selectedCategory = "";
  let allCategoriesList = [];
  let visibleCount = 60;
  let searchDebounceTimer = null;

  // Typo tolerance calculation (Damerau-Levenshtein)
  function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (Math.abs(a.length - b.length) > 1) return 99;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Description & Markdown Sanitizer (Guarantees zero unparsed HTML/markdown)
  function cleanDescription(text) {
    if (!text) return "";
    let t = String(text);
    t = t.replace(/<[^>]+>/g, " ");
    t = t.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, " ");
    t = t.replace(/!\[.*?\]\(.*?\)/g, " ");
    t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    t = t.replace(/\s+/g, " ").trim();
    return t;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // High-accuracy relevance scoring and ranking engine with Pinned Priority
  function filterAPIs() {
    const t0 = performance.now();
    const rawQuery = (document.getElementById('searchInput').value || '').trim().toLowerCase();
    const queryTokens = rawQuery ? rawQuery.split(/\s+/).filter(Boolean) : [];

    const scoredResults = [];

    // Check if query is empty
    if (queryTokens.length === 0) {
      // Natural order with Pinned APIs prioritized at the top
      const pinnedMatches = [];
      const regularMatches = [];

      for (let i = 0; i < ALL_APIS.length; i++) {
        const api = ALL_APIS[i];
        if (currentAuth !== "ALL" && api.auth_group !== currentAuth) continue;
        if (selectedCategory && api.category !== selectedCategory) continue;

        if (PINNED_NAMES.includes(api.name)) {
          pinnedMatches.push(api);
        } else {
          regularMatches.push(api);
        }
      }

      // Sort pinned matches in explicit order of PINNED_NAMES
      pinnedMatches.sort((a, b) => PINNED_NAMES.indexOf(a.name) - PINNED_NAMES.indexOf(b.name));
      filteredList = [...pinnedMatches, ...regularMatches];
    } else {
      // Token-based search with relevance scoring
      for (let i = 0; i < ALL_APIS.length; i++) {
        const api = ALL_APIS[i];

        if (currentAuth !== "ALL" && api.auth_group !== currentAuth) continue;
        if (selectedCategory && api.category !== selectedCategory) continue;

        const nameLower = (api.name || '').toLowerCase();
        const catLower = (api.category || '').toLowerCase();
        const descLower = (api.description || '').toLowerCase();

        const nameWords = nameLower.split(/[\s\-_,./\\]+/);
        const catWords = catLower.split(/[\s\-_,./\\]+/);

        let score = 0;
        let allTokensMatched = true;

        // Exact & prefix matches
        if (nameLower === rawQuery) {
          score += 2000;
        } else if (nameLower.startsWith(rawQuery)) {
          score += 1200;
        } else if (nameLower.includes(rawQuery)) {
          score += 700;
        } else if (catLower === rawQuery) {
          score += 500;
        } else if (catLower.includes(rawQuery)) {
          score += 250;
        } else if (descLower.includes(rawQuery)) {
          score += 120;
        }

        // Token matches
        for (let j = 0; j < queryTokens.length; j++) {
          const tok = queryTokens[j];
          let tokMatched = false;

          if (nameWords.includes(tok)) {
            score += 350;
            tokMatched = true;
          } else if (nameWords.some(w => w.startsWith(tok))) {
            score += 200;
            tokMatched = true;
          } else if (nameLower.includes(tok)) {
            score += 150;
            tokMatched = true;
          }

          if (catWords.includes(tok)) {
            score += 100;
            tokMatched = true;
          } else if (catLower.includes(tok)) {
            score += 60;
            tokMatched = true;
          }

          if (descLower.includes(tok)) {
            score += 30;
            tokMatched = true;
          }

          // Typo tolerance for tokens >= 4 chars
          if (!tokMatched && tok.length >= 4) {
            for (let k = 0; k < nameWords.length; k++) {
              const w = nameWords[k];
              if (w.length >= 3 && Math.abs(w.length - tok.length) <= 1) {
                if (levenshtein(tok, w) <= 1) {
                  score += 70;
                  tokMatched = true;
                  break;
                }
              }
            }
            if (!tokMatched) {
              for (let k = 0; k < catWords.length; k++) {
                const w = catWords[k];
                if (w.length >= 3 && Math.abs(w.length - tok.length) <= 1) {
                  if (levenshtein(tok, w) <= 1) {
                    score += 40;
                    tokMatched = true;
                    break;
                  }
                }
              }
            }
          }

          if (!tokMatched) {
            allTokensMatched = false;
            break;
          }
        }

        if (allTokensMatched && score > 0) {
          if (PINNED_NAMES.includes(api.name)) {
            score += 1500; // Flagship pinned priority boost
          } else if (nameLower.includes("moviebox") || nameLower.includes("skdl") || nameLower.includes("freepublicapis")) {
            score += 80;
          }
          scoredResults.push({ api, score });
        }
      }

      scoredResults.sort((a, b) => b.score - a.score);
      filteredList = scoredResults.map(item => item.api);
    }

    const elapsed = (performance.now() - t0).toFixed(1);
    const speedEl = document.getElementById('searchSpeed');
    if (speedEl) speedEl.textContent = `Catalog consulted in ${elapsed} ms`;
    visibleCount = 60;
    render();
  }

  /* ==========================================================================
     Animated Empty State Mascot (x x eye with unrolled empty scroll)
     ========================================================================== */
  function renderEmptyState(query) {
    return `
      <div class="empty-state-card">
        <div class="empty-mascot-container">
          <img src="mascot.png" alt="Archivist Mascot" class="empty-mascot-img" width="160" height="160">
        </div>
        <h3 class="empty-state-title">No Archival Records Found</h3>
        <p class="empty-state-desc">The catalog yielded zero documents matching &ldquo;<strong>${escapeHtml(query)}</strong>&rdquo;. The archivist searched the vaults but the scroll remains entirely blank.</p>
        <button type="button" class="empty-state-clear-btn" id="emptyStateClearBtn">
          ${HugeIcons.refresh}
          <span>Clear Search & Consult All Entries</span>
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     Rendering & Card Construction
     ========================================================================== */
  function render() {
    const grid = document.getElementById('apiGrid');
    const countEl = document.getElementById('resultsCount');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const rawQuery = (document.getElementById('searchInput').value || '').trim();

    if (filteredList.length === 0) {
      countEl.innerHTML = `Displaying records <strong>0</strong> of <strong>0</strong> catalogued entries`;
      grid.innerHTML = renderEmptyState(rawQuery);
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';

      // Attach clear listener
      const clearBtn = document.getElementById('emptyStateClearBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', clearSearchAndReset);
      }
      return;
    }

    countEl.innerHTML = `Displaying records <strong>1</strong> through <strong>${Math.min(visibleCount, filteredList.length).toLocaleString()}</strong> of <strong>${filteredList.length.toLocaleString()}</strong> catalogued entries`;

    const slice = filteredList.slice(0, visibleCount);
    grid.innerHTML = slice.map(api => {
      let authBadgeClass = "badge-other";
      if (api.auth_group === "No Authentication") authBadgeClass = "badge-no-auth";
      else if (api.auth_group === "API Key") authBadgeClass = "badge-api-key";
      else if (api.auth_group === "OAuth") authBadgeClass = "badge-oauth";

      const isPinned = PINNED_NAMES.includes(api.name);
      const isFeatured = isPinned || api.name.toLowerCase().includes("moviebox") || api.name.toLowerCase().includes("skdl") || api.name.toLowerCase().includes("freepublicapis");
      const cleanDesc = cleanDescription(api.description);
      const safeAuth = (api.auth && !api.auth.includes("<img") && !api.auth.includes("[")) ? api.auth : (api.auth_group || "No Auth");

      return `
        <article class="card ${isPinned ? 'pinned-card featured-card' : (isFeatured ? 'featured-card' : '')}">
          <div class="card-top">
            <div class="card-title-row">
              <h3 class="card-title">
                ${isFeatured ? HugeIcons.star : ''}
                <span>${escapeHtml(api.name)}</span>
              </h3>
            </div>
            <div class="badges">
              <span class="badge badge-cat">${escapeHtml(api.category)}</span>
              <span class="badge ${authBadgeClass}">${escapeHtml(safeAuth)}</span>
              ${api.https === "Yes" ? '<span class="badge badge-flag">HTTPS</span>' : ''}
              ${api.cors === "Yes" ? '<span class="badge badge-flag">CORS</span>' : ''}
              ${isPinned ? '<span class="badge badge-pinned">ARCHIVE HIGHLIGHT</span>' : (isFeatured ? '<span class="badge badge-featured">FEATURED</span>' : '')}
            </div>
            <p class="card-desc" title="${escapeHtml(cleanDesc)}">${escapeHtml(cleanDesc)}</p>
          </div>
          <div class="card-actions">
            <a href="${escapeHtml(api.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit">
              <span>Consult Docs</span>
              ${HugeIcons.externalLink}
            </a>
            <button class="btn-copy-prompt" onclick='window.copyAgentPrompt(${JSON.stringify(api).replace(/'/g, "&apos;")})' title="Copy AI prompt for coding assistant">
              ${HugeIcons.copy}
              <span>Copy Prompt</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    if (loadMoreBtn) {
      loadMoreBtn.style.display = (filteredList.length > visibleCount) ? 'block' : 'none';
    }
  }

  /* ==========================================================================
     Clear Search & Reset Filter State
     ========================================================================== */
  function clearSearchAndReset() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    currentAuth = "ALL";
    selectedCategory = "";

    // Reset Auth tabs
    document.querySelectorAll('.tab-btn').forEach(b => {
      if (b.getAttribute('data-auth') === "ALL") {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Reset category dropdown label
    const categoryLabel = document.getElementById("customSelectLabel");
    if (categoryLabel) categoryLabel.textContent = "All Categories (50+)";

    filterAPIs();
    if (searchInput) searchInput.focus();
  }
  window.clearSearchAndReset = clearSearchAndReset;

  /* ==========================================================================
     Custom Dropdown Component Logic
     ========================================================================== */
  const categoryWrapper = document.getElementById("customCategoryWrapper");
  const categoryTrigger = document.getElementById("customSelectTrigger");
  const categoryDropdown = document.getElementById("customSelectDropdown");
  const categoryLabel = document.getElementById("customSelectLabel");
  const categoryFilterInput = document.getElementById("categoryFilterInput");
  const categoryOptionsContainer = document.getElementById("customSelectOptions");

  function toggleCategoryDropdown(open) {
    if (!categoryDropdown || !categoryWrapper || !categoryTrigger) return;
    const isCurrentlyOpen = categoryDropdown.style.display !== "none";
    const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;

    if (shouldOpen) {
      categoryDropdown.style.display = "block";
      categoryWrapper.classList.add("open");
      categoryTrigger.setAttribute("aria-expanded", "true");
      if (categoryFilterInput) {
        categoryFilterInput.value = "";
        renderCategoryOptions("");
        setTimeout(() => categoryFilterInput.focus(), 40);
      }
    } else {
      categoryDropdown.style.display = "none";
      categoryWrapper.classList.remove("open");
      categoryTrigger.setAttribute("aria-expanded", "false");
    }
  }

  if (categoryTrigger) {
    categoryTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCategoryDropdown();
    });
  }

  if (categoryDropdown) {
    categoryDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  document.addEventListener("click", () => {
    toggleCategoryDropdown(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggleCategoryDropdown(false);
    }
  });

  if (categoryFilterInput) {
    categoryFilterInput.addEventListener("input", (e) => {
      renderCategoryOptions(e.target.value.trim().toLowerCase());
    });
  }

  function selectCategory(catName) {
    selectedCategory = catName;
    if (!catName) {
      if (categoryLabel) categoryLabel.textContent = "All Categories (50+)";
    } else {
      const item = allCategoriesList.find(c => c.name === catName);
      if (categoryLabel) {
        categoryLabel.textContent = item ? `${item.name} (${item.count.toLocaleString()})` : catName;
      }
    }
    toggleCategoryDropdown(false);
    filterAPIs();
  }
  window.selectCategory = selectCategory;

  function renderCategoryOptions(filterText = "") {
    if (!categoryOptionsContainer) return;
    const filtered = allCategoriesList.filter(item => {
      if (!filterText) return true;
      return item.name.toLowerCase().includes(filterText);
    });

    if (filtered.length === 0) {
      categoryOptionsContainer.innerHTML = `<div class="custom-select-no-results">No classifications found matching "${escapeHtml(filterText)}"</div>`;
      return;
    }

    let html = "";
    if (!filterText || "all categories".includes(filterText)) {
      const isAllSelected = (selectedCategory === "");
      html += `
        <div class="custom-select-option ${isAllSelected ? 'selected' : ''}" onclick="window.selectCategory('')">
          <span>All Categories</span>
          <span class="custom-select-option-count">${ALL_APIS.length.toLocaleString()}</span>
        </div>
      `;
    }

    filtered.forEach(item => {
      const isSelected = (selectedCategory === item.name);
      html += `
        <div class="custom-select-option ${isSelected ? 'selected' : ''}" onclick="window.selectCategory('${escapeHtml(item.name).replace(/'/g, "\\'")}')">
          <span>${escapeHtml(item.name)}</span>
          <span class="custom-select-option-count">${item.count.toLocaleString()}</span>
        </div>
      `;
    });

    categoryOptionsContainer.innerHTML = html;
  }

  /* ==========================================================================
     AI Coding Agent Prompt Generator & Toast Notification
     ========================================================================== */
  window.copyAgentPrompt = function(api) {
    const cleanDesc = cleanDescription(api.description);
    const prompt = `Use the ${api.name} API (${api.url}) to build a feature.
Category: ${api.category}
Authentication: ${api.auth || 'No key needed'}
HTTPS Supported: ${api.https} | CORS Supported: ${api.cors}
Description: ${cleanDesc}

Please write a clean, production-grade integration in JavaScript/TypeScript (or Python):
1. Demonstrate how to construct the request, handle authentication headers, and manage rate limits.
2. Provide resilient error handling and response validation.
3. Show a practical working example displaying the returned data.`;

    navigator.clipboard.writeText(prompt).then(() => {
      showToast(`Copied "${api.name}" prompt for coding agent!`);
    }).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(`Copied "${api.name}" prompt!`);
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastMessage');
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }
  window.showToast = showToast;

  /* ==========================================================================
     Programmatic Export for AI Coding Agents & Headless Tools
     ========================================================================== */
  window.AgentAPI = {
    version: "1.0.0",
    datasetCount: () => ALL_APIS.length,
    getAllApis: () => ALL_APIS,
    getFilteredApis: () => filteredList,
    getStats: () => ({
      total: ALL_APIS.length,
      filtered: filteredList.length,
      categories: allCategoriesList,
      authGroups: {
        noAuth: ALL_APIS.filter(a => a.auth_group === "No Authentication").length,
        apiKey: ALL_APIS.filter(a => a.auth_group === "API Key").length,
        oAuth: ALL_APIS.filter(a => a.auth_group === "OAuth").length,
        other: ALL_APIS.filter(a => a.auth_group === "Other Headers").length
      }
    }),
    search: (query) => {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        searchInput.value = query;
        filterAPIs();
      }
    },
    filterByCategory: (categoryName) => {
      selectCategory(categoryName);
    },
    filterByAuth: (authGroupName) => {
      currentAuth = authGroupName || "ALL";
      document.querySelectorAll('.tab-btn').forEach(b => {
        if (b.getAttribute('data-auth') === currentAuth) b.classList.add('active');
        else b.classList.remove('active');
      });
      filterAPIs();
    },
    exportFilteredCsv: () => {
      const exportBtn = document.getElementById('downloadFilteredCsvBtn');
      if (exportBtn) exportBtn.click();
    },
    refreshCache: () => {
      const refreshBtn = document.getElementById('refreshCacheBtn');
      if (refreshBtn) refreshBtn.click();
    }
  };

  const downloadFilteredCsvBtn = document.getElementById('downloadFilteredCsvBtn');
  if (downloadFilteredCsvBtn) {
    downloadFilteredCsvBtn.addEventListener('click', () => {
      if (!filteredList.length) {
        showToast("No APIs currently match your filter!");
        return;
      }
      const headers = ["auth_group", "category", "name", "url", "description", "auth", "https", "cors"];
      const csvRows = [headers.join(",")];

      filteredList.forEach(a => {
        const row = [
          `"${(a.auth_group || '').replace(/"/g, '""')}"`,
          `"${(a.category || '').replace(/"/g, '""')}"`,
          `"${(a.name || '').replace(/"/g, '""')}"`,
          `"${(a.url || '').replace(/"/g, '""')}"`,
          `"${(cleanDescription(a.description) || '').replace(/"/g, '""')}"`,
          `"${(a.auth || '').replace(/"/g, '""')}"`,
          `"${(a.https || '').replace(/"/g, '""')}"`,
          `"${(a.cors || '').replace(/"/g, '""')}"`
        ];
        csvRows.push(row.join(","));
      });

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `filtered_apis_${filteredList.length}.csv`;
      link.click();
      showToast(`Exported ${filteredList.length.toLocaleString()} APIs to CSV!`);
    });
  }

  /* ==========================================================================
     Data Loading & Initialization Pipeline
     ========================================================================== */
  async function loadDataset(forceRefresh = false) {
    const cacheStatus = document.getElementById('cacheStatusText');
    const cacheDot = document.getElementById('cacheDot');
    const loadingView = document.getElementById('loadingView');
    const apiGrid = document.getElementById('apiGrid');

    let apis = null;

    if (!forceRefresh) {
      apis = await getCachedApis();
      if (apis && Array.isArray(apis) && apis.length > 5000) {
        if (cacheStatus) cacheStatus.textContent = `Instant Loaded from IndexedDB (${apis.length.toLocaleString()} APIs)`;
        if (cacheDot) cacheDot.style.background = "#255220";
      }
    }

    if (!apis) {
      if (cacheStatus) cacheStatus.textContent = "Fetching apis.json from local file...";
      if (cacheDot) cacheDot.style.background = "#754614";
      try {
        const resp = await fetch("apis.json");
        if (!resp.ok) throw new Error(`HTTP error ${resp.status}`);
        apis = await resp.json();
        await setCachedApis(apis);
        if (cacheStatus) cacheStatus.textContent = `Cached in IndexedDB (${apis.length.toLocaleString()} APIs)`;
        if (cacheDot) cacheDot.style.background = "#255220";
      } catch (e) {
        if (cacheStatus) cacheStatus.textContent = `Error loading JSON: ${e.message}`;
        if (cacheDot) cacheDot.style.background = "#8f2619";
        console.error("Failed to load apis.json:", e);
        if (loadingView) {
          loadingView.innerHTML = `
            <p style="color:#8f2619; font-weight:bold;">Could not load apis.json</p>
            <p style="font-size:0.9rem; margin-top:0.5rem;">Ensure folder is served via a local web server (e.g. <code>python3 -m http.server</code>).</p>
          `;
        }
        return;
      }
    }

    ALL_APIS = apis;
    if (loadingView) loadingView.style.display = 'none';
    if (apiGrid) apiGrid.style.display = 'grid';

    // Update Tab Counts
    const totalAll = ALL_APIS.length;
    const noAuthCount = ALL_APIS.filter(a => a.auth_group === "No Authentication").length;
    const apiKeyCount = ALL_APIS.filter(a => a.auth_group === "API Key").length;
    const oAuthCount = ALL_APIS.filter(a => a.auth_group === "OAuth").length;
    const otherCount = ALL_APIS.filter(a => a.auth_group === "Other Headers").length;

    const tabCountAll = document.getElementById('tabCountAll');
    const tabCountNoAuth = document.getElementById('tabCountNoAuth');
    const tabCountApiKey = document.getElementById('tabCountApiKey');
    const tabCountOAuth = document.getElementById('tabCountOAuth');
    const tabCountOther = document.getElementById('tabCountOther');

    if (tabCountAll) tabCountAll.textContent = totalAll.toLocaleString();
    if (tabCountNoAuth) tabCountNoAuth.textContent = noAuthCount.toLocaleString();
    if (tabCountApiKey) tabCountApiKey.textContent = apiKeyCount.toLocaleString();
    if (tabCountOAuth) tabCountOAuth.textContent = oAuthCount.toLocaleString();
    if (tabCountOther) tabCountOther.textContent = otherCount.toLocaleString();

    // Populate Categories List
    const categoryCounts = {};
    ALL_APIS.forEach(a => {
      categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
    });
    const sortedCats = Object.keys(categoryCounts).sort();
    allCategoriesList = sortedCats.map(cat => ({
      name: cat,
      count: categoryCounts[cat]
    }));

    renderCategoryOptions("");
    filterAPIs();
  }

  // Refresh Cache Button Listener
  const refreshCacheBtn = document.getElementById('refreshCacheBtn');
  if (refreshCacheBtn) {
    refreshCacheBtn.addEventListener('click', async () => {
      showToast("Clearing cache and reloading fresh data...");
      await clearCache();
      await loadDataset(true);
      showToast("Dataset cache refreshed!");
    });
  }

  // Search Input with Debounce
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(filterAPIs, 80);
    });
  }

  // Auth Group Tabs
  const authTabs = document.getElementById('authTabs');
  if (authTabs) {
    authTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAuth = btn.getAttribute('data-auth');
        filterAPIs();
      }
    });
  }

  // Load More Pagination Button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 60;
      render();
    });
  }

  // Bootstrapping
  initTheme();
  loadDataset();

})();
