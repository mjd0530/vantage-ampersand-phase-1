const ICONS = {
  close: "assets/icons/close.svg",
  error: "assets/icons/error.svg",
  info: "assets/icons/info.svg",
  download: "assets/icons/download.svg",
  check: "assets/icons/check-circle.svg",
  refreshPrimary: "assets/icons/refresh-on-primary.svg",
  refreshSecondary: "assets/icons/refresh-on-secondary.svg",
  arrowUp: "assets/icons/arrow-drop-up.svg",
  arrowDown: "assets/icons/arrow-drop-down.svg",
  downloadPrimary: "assets/icons/download-on-primary.svg",
};

const UPDATES = [
  { name: "BIOS Update", version: "1.42" },
  { name: "Intel Chipset Driver", version: "10.1.19600" },
  { name: "NVIDIA Graphics Driver", version: "561.09" },
  { name: "Realtek Audio Driver", version: "6.0.9734" },
  { name: "Intel Wireless LAN", version: "23.100.0" },
  { name: "Lenovo Power Management", version: "10.1.18" },
  { name: "TrackPoint Driver", version: "2.0.6" },
  { name: "Fingerprint Reader", version: "5.12.11" },
  { name: "Thunderbolt Firmware", version: "80.0.1" },
  { name: "System Firmware", version: "N3AET91W" },
  { name: "Hotkey Features Integration", version: "5.6.0" },
  { name: "Vantage Service", version: "4.0.49" },
];

const state = {
  toast: "idle",
  progress: 0,
  detailsOpen: false,
  failedExpanded: false,
  timer: null,
};

const els = {};

function $(id) {
  return document.getElementById(id);
}

function iconImg(src, width, height, alt = "") {
  return `<img src="${src}" width="${width}" height="${height}" alt="${alt}">`;
}

function iconButtonClose() {
  return `
    <button class="icon-button" type="button" data-action="dismiss" aria-label="Dismiss">
      <span class="icon-button__slot">${iconImg(ICONS.close, 24, 24)}</span>
    </button>
  `;
}

function secondaryButton(label, action, slot = "") {
  return `
    <button class="btn btn--secondary" type="button" data-action="${action}">
      ${slot}
      <span>${label}</span>
    </button>
  `;
}

function primaryButton(label, action, slot = "") {
  return `
    <button class="btn btn--primary" type="button" data-action="${action}">
      ${slot}
      <span>${label}</span>
    </button>
  `;
}

function slot(src) {
  return `<span class="btn__slot">${iconImg(src, 18, 18)}</span>`;
}

function header(icon, title, body) {
  return `
    <div class="toast__header">
      <div class="toast__icon-content">
        <div class="toast__icon">${iconImg(icon, 24, 24)}</div>
        <div class="toast__copy">
          <p class="toast__title">${title}</p>
          ${body ? `<p class="toast__body">${body}</p>` : ""}
        </div>
      </div>
      ${iconButtonClose()}
    </div>
  `;
}

function footer(buttons) {
  return `
    <div class="toast__footer">
      <div class="toast__footer-spacer"></div>
      <div class="button-group">${buttons}</div>
    </div>
  `;
}

function renderToast() {
  const host = els.toastHost;
  if (state.toast === "idle") {
    host.innerHTML = "";
    renderDetails();
    return;
  }

  let html = "";

  if (state.toast === "scanning") {
    html = `
      <article class="toast" data-node="2389:28635" aria-live="polite">
        <div class="toast__layout">
          ${header(ICONS.info, `Scanning for updates (${state.progress}%)`)}
          <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${state.progress}">
            <div class="progress__bar" style="width: ${state.progress}%"></div>
          </div>
          ${footer(
            secondaryButton("Cancel", "cancel") +
              primaryButton("View details", "view-details")
          )}
        </div>
      </article>
    `;
  }

  if (state.toast === "found") {
    html = `
      <article class="toast" data-node="2725:28249" aria-live="polite">
        <div class="toast__layout">
          ${header(
            ICONS.info,
            "(12) Updates found",
            "We recommend installing these updates as soon as possible."
          )}
          ${footer(
            secondaryButton("View details", "view-details") +
              secondaryButton("Scan again", "scan-again", slot(ICONS.refreshSecondary)) +
              primaryButton("Install", "install", slot(ICONS.downloadPrimary))
          )}
        </div>
      </article>
    `;
  }

  if (state.toast === "installing") {
    html = `
      <article class="toast" data-node="2754:29544" aria-live="polite">
        <div class="toast__layout">
          ${header(ICONS.download, `Installing updates (${state.progress}%)`)}
          <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${state.progress}">
            <div class="progress__bar" style="width: ${state.progress}%"></div>
          </div>
          ${footer(
            secondaryButton("Cancel", "cancel-install") +
              primaryButton("View details", "view-details")
          )}
        </div>
      </article>
    `;
  }

  if (state.toast === "success") {
    html = `
      <article class="toast" data-node="2754:29591" aria-live="polite">
        <div class="toast__layout">
          ${header(
            ICONS.check,
            "(12) Updates successfully installed",
            "We recommend installing these updates as soon as possible."
          )}
          ${footer(
            secondaryButton("View details", "view-details") +
              primaryButton("View details", "view-details")
          )}
        </div>
      </article>
    `;
  }

  if (state.toast === "failed") {
    const expanded = state.failedExpanded;
    html = `
      <article class="toast" data-node="${expanded ? "2754:29410" : "2754:29351"}" aria-live="assertive">
        <div class="toast__layout">
          ${header(
            ICONS.error,
            "Update scan failed",
            "Something went wrong while scanning for updates. Please try scanning again."
          )}
          <div class="expand-block">
            <div class="expand-block__toggle-row">
              <button class="btn btn--secondary btn--more" type="button" data-action="toggle-more" aria-expanded="${expanded}">
                <span>${expanded ? "Less" : "More"}</span>
                ${slot(expanded ? ICONS.arrowUp : ICONS.arrowDown)}
              </button>
            </div>
            ${
              expanded
                ? `<div class="expand-block__details">
                    <p class="toast__body">Something went wrong while scanning for updates. Please try scanning again.</p>
                  </div>`
                : ""
            }
          </div>
          ${footer(
            secondaryButton("View details", "view-details") +
              primaryButton("Scan again", "scan-again", slot(ICONS.refreshPrimary))
          )}
        </div>
      </article>
    `;
  }

  host.innerHTML = html;
  renderDetails();
  bindToast();
}

function renderDetails() {
  if (!state.detailsOpen || state.toast === "idle") {
    els.detailsHost.innerHTML = "";
    return;
  }

  const scanning = state.toast === "scanning" || state.toast === "installing";
  const failed = state.toast === "failed";
  const list = UPDATES.map(
    (item) => `<li><strong>${item.name}</strong><span>${item.version}</span></li>`
  ).join("");

  els.detailsHost.innerHTML = `
    <article class="toast details-card" aria-label="Update details">
      <div class="toast__layout">
        ${header(
          failed ? ICONS.error : ICONS.info,
          failed ? "Scan details" : "Update details",
          failed
            ? "The scan could not finish. Retry to refresh this list."
            : scanning
              ? `In progress (${state.progress}%).`
              : "12 updates from the last scan."
        )}
        <ul class="details-card__list">${list}</ul>
        ${footer(primaryButton("Close details", "close-details"))}
      </div>
    </article>
  `;
  bindToast(els.detailsHost);
}

function bindToast(root = els.toastHost) {
  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function clearTimer() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

function runProgress(onComplete) {
  clearTimer();
  state.progress = 0;
  renderToast();
  state.timer = window.setInterval(() => {
    state.progress = Math.min(100, state.progress + 2);
    if (state.progress % 2 === 0) {
      const bar = els.toastHost.querySelector(".progress__bar");
      const title = els.toastHost.querySelector(".toast__title");
      const progress = els.toastHost.querySelector(".progress");
      if (bar) bar.style.width = `${state.progress}%`;
      if (progress) progress.setAttribute("aria-valuenow", String(state.progress));
      if (title && state.toast === "scanning") {
        title.textContent = `Scanning for updates (${state.progress}%)`;
      }
      if (title && state.toast === "installing") {
        title.textContent = `Installing updates (${state.progress}%)`;
      }
      if (state.detailsOpen) {
        const detailsTitle = els.detailsHost.querySelector(".toast__body");
        if (detailsTitle && (state.toast === "scanning" || state.toast === "installing")) {
          detailsTitle.textContent = `In progress (${state.progress}%).`;
        }
      }
    }
    if (state.progress >= 100) {
      clearTimer();
      onComplete();
    }
  }, 80);
}

function startScan() {
  state.toast = "scanning";
  state.failedExpanded = false;
  els.statusText.textContent = "Scanning for updates…";
  els.checkBtn.disabled = true;
  runProgress(() => {
    if (els.failToggle.checked) {
      state.toast = "failed";
      state.progress = 0;
      els.statusText.textContent = "Update scan failed.";
      els.checkBtn.disabled = false;
      renderToast();
      return;
    }
    state.toast = "found";
    state.progress = 0;
    els.statusText.textContent = "12 updates are ready to install.";
    els.checkBtn.disabled = false;
    renderToast();
  });
}

function startInstall() {
  state.toast = "installing";
  els.statusText.textContent = "Installing updates…";
  els.checkBtn.disabled = true;
  runProgress(() => {
    state.toast = "success";
    state.progress = 0;
    els.statusText.textContent = "12 updates successfully installed.";
    els.checkBtn.disabled = false;
    renderToast();
  });
}

function handleAction(action) {
  switch (action) {
    case "dismiss":
      clearTimer();
      state.toast = "idle";
      state.detailsOpen = false;
      els.checkBtn.disabled = false;
      if (els.statusText.textContent.includes("Scanning") || els.statusText.textContent.includes("Installing")) {
        els.statusText.textContent = "Ready to check for updates.";
      }
      renderToast();
      break;
    case "cancel":
      clearTimer();
      state.toast = "idle";
      state.progress = 0;
      els.checkBtn.disabled = false;
      els.statusText.textContent = "Scan cancelled.";
      renderToast();
      break;
    case "cancel-install":
      clearTimer();
      state.toast = "found";
      state.progress = 0;
      els.checkBtn.disabled = false;
      els.statusText.textContent = "Install cancelled. 12 updates are still available.";
      renderToast();
      break;
    case "view-details":
      state.detailsOpen = true;
      renderDetails();
      break;
    case "close-details":
      state.detailsOpen = false;
      renderDetails();
      break;
    case "scan-again":
      startScan();
      break;
    case "install":
      startInstall();
      break;
    case "toggle-more":
      state.failedExpanded = !state.failedExpanded;
      renderToast();
      break;
    default:
      break;
  }
}

function init() {
  els.toastHost = $("toast-host");
  els.detailsHost = $("details-host");
  els.checkBtn = $("check-for-updates");
  els.statusText = $("device-status");
  els.failToggle = $("simulate-failure");

  els.checkBtn.addEventListener("click", startScan);
  $("open-vantage").addEventListener("click", () => {
    $("vantage-window").classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", init);
