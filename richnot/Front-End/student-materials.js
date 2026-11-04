// ===== Read ?module=CODE from the URL =====
const code = new URLSearchParams(window.location.search).get("module");
const selected = modules[code];

const titleEl = document.getElementById("moduleTitle");
const subtitleEl = document.getElementById("moduleSubtitle");
const listEl = document.getElementById("topicsList");

// Download icon (SVG) shown on the right of every topic
const downloadIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>`;

function topicRow(t, moduleName) {
    // work out the file type from the link (pdf, pptx ...)
    const ext = (t.file.split("?")[0].split(".").pop() || "pdf").toLowerCase();
    const isSlides = ext === "pptx" || ext === "ppt";
    const iconClass = isSlides ? "ppt" : "pdf";
    const iconText = isSlides ? "PPT" : "PDF";
    // keep the ORIGINAL file name from the link (e.g. "PROGRAMMING 511 STUDY GUIDE (PYTHON).pdf")
    const fileName = decodeURIComponent(t.file.split("?")[0].split("/").pop());
    return `
        <div class="material-item">
            <div class="file-icon ${iconClass}">${iconText}</div>
            <div class="file-info">
                <h4>${t.title}</h4>
                <p>${moduleName}</p>
            </div>
            <a class="download-btn" href="${t.file}" download="${fileName}"
               target="_blank" rel="noopener" title="Download ${t.title}">
                ${downloadIcon}
            </a>
        </div>`;
}

if (selected) {
    // One module: show only ITS topics
    titleEl.textContent = selected.name;
    subtitleEl.textContent = selected.code + " - topics and materials";
    listEl.innerHTML =
        `<div class="materials-box">` +
        selected.topics.map(t => topicRow(t, selected.name)).join("") +
        `</div>`;
} else {
    // No module chosen: show everything grouped by module
    titleEl.textContent = "All Materials";
    subtitleEl.textContent = "Browse materials from all your modules.";
    listEl.innerHTML = Object.entries(modules).map(([c, m]) => `
        <div class="materials-box">
            <h3 class="materials-group">${m.name} <span class="module-code">${m.code}</span></h3>
            ${m.topics.map(t => topicRow(t, m.name)).join("")}
        </div>`).join("");
}
