// ===== Placeholder PDF (public W3C test file) - replace with your own PDFs later =====
// Later, put your PDFs in a "pdfs" folder and use e.g. "pdfs/loops-and-functions.pdf"
const PLACEHOLDER_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

// topic(title, file) -> file is optional; uses the placeholder until you have your own
const topic = (title, file = PLACEHOLDER_PDF) => ({ title, file });

// ===== Topics for each module (edit these to match your real content) =====
const modules = {
    DFS101: {
        name: "Database Systems",
        topics: [
            topic("Introduction to DBMS", "https://courses.cs.vt.edu/cs4604/Spring21/pdfs/1-intro.pdf"),
            topic("SQL Queries", "https://cdncontribute.geeksforgeeks.org/wp-content/uploads/SQL-Manual.pdf"),
            topic("Normalization", "PDFs/DBS621 Lecture 11.pdf"),
            topic("ER Diagrams", "PDFs/DBS621 Lecture 9.pdf"),
            topic("Study Guide", "PDFs/2025 DBS622B Study Guide.pdf")
        ]
    },
    NET202: {
        name: "Networking",
        topics: [
            topic("Networking Basics", "https://www.imdpune.gov.in/training/networking/Network.pdf"),
            topic("OSI Model", "https://uomustansiriyah.edu.iq/media/lectures/6/6_2019_04_11!09_52_16_PM.pdf"),
            topic("IP Addressing", "https://people.cs.umass.edu/~arun/cs491g/lectures/IPAddr-Lab2.pdf"),
            topic("Routing & Switching", "https://www.viavisolutions.com/en-us/literature/aion-routing-and-switching-bundle-data-sheets-en.pdf"),
            topic("Study Guide", "PDFs/Networks 511 2021.pdf")
        ]
    },
    PYT310: {
        name: "Python Programming",
        topics: [
            topic("Variables & Data Types", "https://germanna.edu/sites/default/files/2022-03/Python%20-%20Variables%20and%20Data%20Types.pdf"),
            topic("Loops & Functions", "https://www.purdue.edu/hla/sites/varalalab/wp-content/uploads/sites/20/2018/04/Lecture_11.pdf"),
            topic("Lists & Dictionaries", "https://www.purdue.edu/hla/sites/varalalab/wp-content/uploads/sites/20/2018/03/Lecture_10.pdf"),
            topic("File Handling", "https://ncert.nic.in/textbook/pdf/lecs102.pdf"),
            topic("Study Guide", "PDFs/PROGRAMMING 511 STUDY GUIDE (PYTHON).pdf")
        ]
    },
    BCM201: {
        name: "Business Communication",
        topics: [
            topic("Topic 1 Slides", "PDFs/Business Communication Topic 1 Slide.pptx"),
            topic("Topic 2 Slides", "PDFs/Business Communication Topic 2 Slide.pptx"),
            topic("Topic 4 Slides", "PDFs/Business Communication Topic 4 slides.pptx"),
            topic("Topic 5 Slides", "PDFs/Business Communication Topic 5 slides.pptx"),
            topic("Study Guide", "PDFs/Business Communication 500.pdf")
        ]
    },
    ISY301: {
        name: "Information Systems",
        topics: [
            topic("Types of Information Systems"),
            topic("System Analysis"),
            topic("Data & Decision Making"),
            topic("IS Security"),
            topic("Study Guide", "PDFs/2026 Information Systems 621 - Study Guide part2.pdf")
        ]
    }
};

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
    subtitleEl.textContent = code + " - topics and materials";
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
            <h3 class="materials-group">${m.name} <span class="module-code">${c}</span></h3>
            ${m.topics.map(t => topicRow(t, m.name)).join("")}
        </div>`).join("");
}
