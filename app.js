/**
 * TarkStudio Application & APK Distribution Portal
 * Production Client-Side Controller
 */

import { PROJECTS_DATA } from './projects-data.js';

// Application State
let currentMode = 'all'; // 'all' | 'online' | 'offline'
let currentType = 'all'; // 'all' | 'apk' | 'website'
let searchQuery = '';

/**
 * Filter projects based on currentMode, currentType, and searchQuery
 */
export function getFilteredProjects() {
  return PROJECTS_DATA.filter((project) => {
    // 1. Mode condition
    const modeMatches = currentMode === 'all' || project.mode === currentMode;

    // 2. Type condition
    const typeMatches = currentType === 'all' || project.type === currentType;

    // 3. Search query condition
    let searchMatches = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(q);
      const inDesc = project.description.toLowerCase().includes(q);
      const inCategory = (project.category || '').toLowerCase().includes(q);
      const inBadge = (project.badge || '').toLowerCase().includes(q);
      searchMatches = inTitle || inDesc || inCategory || inBadge;
    }

    return modeMatches && typeMatches && searchMatches;
  });
}

/**
 * Render Project Cards inside #appsGrid
 */
export function renderGrid() {
  const container = document.getElementById('appsGrid');
  if (!container) return;

  const filtered = getFilteredProjects();

  // Update Dynamic Counter Badge
  const counterEl = document.getElementById('productCounter');
  if (counterEl) {
    counterEl.innerHTML = `Showing <span class="counter-count-bold">${filtered.length}</span> of ${PROJECTS_DATA.length} products`;
  }

  // Handle Empty State
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-results-box">
        <div class="empty-results-icon">🔍</div>
        <h3 class="empty-results-title">No matching tools found</h3>
        <p class="empty-results-text">
          No software artifacts match your current criteria (Mode: <strong>${currentMode}</strong>, Type: <strong>${currentType}</strong>${searchQuery ? `, Query: "${searchQuery}"` : ''}).
        </p>
        <button id="resetFiltersEmptyBtn" class="btn-reset-filters">Reset All Filters</button>
      </div>
    `;

    const resetBtn = document.getElementById('resetFiltersEmptyBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }
    return;
  }

  // Render cards
  container.innerHTML = filtered.map((item) => renderCardMarkup(item)).join('');

  // Attach interactive listeners for simulated downloads/launches
  container.querySelectorAll('[data-action-apk]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const title = btn.getAttribute('data-action-apk');
      const url = btn.getAttribute('data-url');
      handleApkClick(e, title, url);
    });
  });

  container.querySelectorAll('[data-action-web]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const title = btn.getAttribute('data-action-web');
      const url = btn.getAttribute('data-url');
      handleWebClick(e, title, url);
    });
  });
}

/**
 * Project Icon Provider
 */
function getProjectIcon(item) {
  const id = item.id || '';
  if (id === 'storeready') {
    return {
      bgClass: 'icon-theme-teal',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`
    };
  }
  if (id === 'flashdrop') {
    return {
      bgClass: 'icon-theme-amber',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
    };
  }
  if (id === 'chota-hathi') {
    return {
      bgClass: 'icon-theme-sky',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><rect width="20" height="12" x="2" y="6" rx="6"/><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/></svg>`
    };
  }
  if (id === 'mental-math-academy') {
    return {
      bgClass: 'icon-theme-purple',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`
    };
  }
  if (id === 'bagh-chal') {
    return {
      bgClass: 'icon-theme-emerald',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>`
    };
  }
  if (id === 'apex-monitor') {
    return {
      bgClass: 'icon-theme-cyan',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.48 12H2"/></svg>`
    };
  }
  if (id === 'omni-relay-client') {
    return {
      bgClass: 'icon-theme-indigo',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`
    };
  }
  if (id === 'tark-vault-sync') {
    return {
      bgClass: 'icon-theme-rose',
      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><rect width="8" height="5" x="8" y="11" rx="1"/><path d="M10 11V9a2 2 0 1 1 4 0v2"/></svg>`
    };
  }
  return {
    bgClass: 'icon-theme-teal',
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="card-svg-icon"><circle cx="12" cy="12" r="10"/><polygon points="12 6 12 12 16 14"/></svg>`
  };
}

/**
 * Generate HTML string for an individual project card
 */
function renderCardMarkup(item) {
  const isLocked = item.status === 'locked';
  const hasApk = Boolean(item.apkUrl) || item.type === 'apk';
  const hasWeb = Boolean(item.webUrl) || item.type === 'website';
  const hasBoth = Boolean(item.apkUrl) && Boolean(item.webUrl);
  const iconInfo = getProjectIcon(item);

  // Operational Mode Badge
  let modeBadgeMarkup = '';
  if (item.mode === 'offline') {
    modeBadgeMarkup = `<span class="badge badge-mode-offline">⚡ Offline / Local</span>`;
  } else if (item.mode === 'online') {
    modeBadgeMarkup = `<span class="badge badge-mode-online">🟢 Online Cloud</span>`;
  } else {
    modeBadgeMarkup = `<span class="badge badge-mode-online">🔄 Hybrid</span>`;
  }

  // Type Badge
  const typeBadgeMarkup = `<span class="badge badge-type">${item.type === 'apk' ? '📱 Android APK' : '💻 Web Tool'}</span>`;

  // Custom Tag Badge
  const customBadgeMarkup = item.badge ? `<span class="badge badge-custom">${escapeHtml(item.badge)}</span>` : '';

  // Locked Badge
  const lockedBadgeMarkup = isLocked ? `<span class="badge badge-locked">🔒 Locked</span>` : '';

  // Compact Mobile Status Pill
  let compactStatusPill = '';
  if (isLocked) {
    compactStatusPill = `<span class="mobile-status-pill badge-locked">🔒 Locked</span>`;
  } else if (item.mode === 'offline') {
    compactStatusPill = `<span class="mobile-status-pill badge-mode-offline">⚡ Offline</span>`;
  } else if (item.mode === 'online') {
    compactStatusPill = `<span class="mobile-status-pill badge-mode-online">🟢 Online</span>`;
  } else {
    compactStatusPill = `<span class="mobile-status-pill badge-mode-online">🔄 Hybrid</span>`;
  }

  // Action Buttons Generation with Dual Mobile/Desktop Text
  let actionsMarkup = '';

  if (isLocked) {
    actionsMarkup = `
      <div class="single-action-row">
        <button class="action-btn btn-locked" disabled aria-disabled="true">
          <span class="btn-text-mobile">🔒 Locked</span>
          <span class="btn-text-desktop">🔒 Coming Soon</span>
        </button>
      </div>
    `;
  } else if (hasBoth) {
    actionsMarkup = `
      <div class="dual-action-row">
        <a 
          href="${item.webUrl}" 
          class="action-btn btn-web-open"
          target="_blank"
          rel="noopener noreferrer"
          data-action-web="${escapeHtml(item.title)}"
          data-url="${item.webUrl}"
        >
          <span class="btn-text-mobile">Open ↗</span>
          <span class="btn-text-desktop">🌐 Open Tool</span>
        </a>
        <a 
          href="${item.apkUrl}" 
          class="action-btn btn-apk-download"
          download="${item.apkUrl.split('/').pop() || 'release.apk'}"
          data-action-apk="${escapeHtml(item.title)}"
          data-url="${item.apkUrl}"
        >
          <span class="btn-text-mobile">⬇ APK</span>
          <span class="btn-text-desktop">⬇ APK</span>
        </a>
      </div>
    `;
  } else if (hasApk) {
    actionsMarkup = `
      <div class="single-action-row">
        <a 
          href="${item.apkUrl || '#'}" 
          class="action-btn btn-apk-download"
          download="${(item.apkUrl && item.apkUrl.split('/').pop()) || 'release.apk'}"
          data-action-apk="${escapeHtml(item.title)}"
          data-url="${item.apkUrl || ''}"
        >
          <span class="btn-text-mobile">⬇ APK</span>
          <span class="btn-text-desktop">⬇ Download APK</span>
        </a>
      </div>
    `;
  } else if (hasWeb) {
    actionsMarkup = `
      <div class="single-action-row">
        <a 
          href="${item.webUrl || '#'}" 
          class="action-btn btn-web-open"
          target="_blank"
          rel="noopener noreferrer"
          data-action-web="${escapeHtml(item.title)}"
          data-url="${item.webUrl || ''}"
        >
          <span class="btn-text-mobile">Open ↗</span>
          <span class="btn-text-desktop">🌐 Open Tool</span>
        </a>
      </div>
    `;
  }

  return `
    <article class="app-card h-full flex flex-col justify-between" id="card-${item.id}">
      <!-- Clickable Card Body leading to detail page -->
      <a href="detail.html?id=${item.id}" class="card-click-area block cursor-pointer flex-1" aria-label="View details for ${escapeHtml(item.title)}">
        <!-- 1. Mobile Launcher Tile View (< 768px) -->
        <div class="card-mobile-view">
          <div class="card-mobile-top">
            <div class="card-icon-box ${iconInfo.bgClass}">
              ${iconInfo.svg}
            </div>
            ${compactStatusPill}
          </div>

          <div class="card-mobile-middle">
            <h3 class="card-title-mobile" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
            <span class="card-subtext-mobile">${item.type === 'apk' ? 'Android APK' : 'Web Tool'} • ${escapeHtml(item.version)}</span>
          </div>
        </div>

        <!-- 2. Desktop Spacious View (>= 768px) -->
        <div class="card-desktop-view">
          <div class="card-header-top">
            <div class="card-icon-cat-group">
              <div class="card-icon-box-desktop ${iconInfo.bgClass}">
                ${iconInfo.svg}
              </div>
              <div class="card-category">${escapeHtml(item.category || item.type)}</div>
            </div>
            <span class="card-version">${escapeHtml(item.version)}</span>
          </div>

          <!-- Full available width title (max 2 lines) -->
          <h3 class="card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>

          <div class="card-badges">
            ${modeBadgeMarkup}
            ${typeBadgeMarkup}
            ${customBadgeMarkup}
            ${lockedBadgeMarkup}
          </div>

          <p class="card-description">${escapeHtml(item.description)}</p>
        </div>
      </a>

      <!-- 3. Action Container (Direct access outside the <a> anchor) -->
      <div class="card-action-container">
        ${actionsMarkup}
      </div>
    </article>
  `;
}

/**
 * Handle APK Download Click
 */
function handleApkClick(e, title, url) {
  // Show non-blocking toast notification for verified delivery
  showToast(`Starting APK download: ${title} (${url.split('/').pop() || 'package.apk'})`);
}

/**
 * Handle Web Tool Click
 */
function handleWebClick(e, title, url) {
  if (url && (url.startsWith('tools/') || url.startsWith('games/'))) {
    showToast(`Launching ${title} locally at ${url}...`);
  } else {
    showToast(`Opening ${title} in new tab...`);
  }
}

/**
 * Show temporary toast message
 */
function showToast(message) {
  const existing = document.querySelector('.toast-notice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.innerHTML = `<span>🛡️</span> <span>${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Reset all filter selections
 */
export function resetFilters() {
  currentMode = 'all';
  currentType = 'all';
  searchQuery = '';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';

  updateButtonStates();
  renderGrid();
}

/**
 * Update active button highlight states
 */
function updateButtonStates() {
  // Mode switcher buttons
  document.querySelectorAll('#modeFilterBar [data-mode]').forEach((btn) => {
    const modeVal = btn.getAttribute('data-mode');
    const isSelected = modeVal === currentMode;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });

  // Type switcher buttons
  document.querySelectorAll('#typeFilterBar [data-type]').forEach((btn) => {
    const typeVal = btn.getAttribute('data-type');
    const isSelected = typeVal === currentType;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
  });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Initialize Portal and wire event handlers
 */
export function initPortal() {
  // 1. Wire Operational Mode Switcher
  const modeBar = document.getElementById('modeFilterBar');
  if (modeBar) {
    modeBar.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-mode]');
      if (!targetBtn) return;
      currentMode = targetBtn.getAttribute('data-mode');
      updateButtonStates();
      renderGrid();
    });
  }

  // 2. Wire Product Type Switcher
  const typeBar = document.getElementById('typeFilterBar');
  if (typeBar) {
    typeBar.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-type]');
      if (!targetBtn) return;
      currentType = targetBtn.getAttribute('data-type');
      updateButtonStates();
      renderGrid();
    });
  }

  // 3. Wire Search Input
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      }
      renderGrid();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      renderGrid();
      if (searchInput) searchInput.focus();
    });
  }

  // Initial render
  updateButtonStates();
  renderGrid();
}

// Global browser hook
if (typeof window !== 'undefined') {
  window.tarkPortal = {
    initPortal,
    resetFilters,
    renderGrid,
    setMode: (m) => { currentMode = m; updateButtonStates(); renderGrid(); },
    setType: (t) => { currentType = t; updateButtonStates(); renderGrid(); }
  };

  // Run automatically when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortal);
  } else {
    initPortal();
  }
}
