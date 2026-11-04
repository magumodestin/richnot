(function () {
    const LECTURER_MODULES = ["DFS101", "NET202"];
    let key = new URLSearchParams(location.search).get("module");
    if (!modules[key] || !LECTURER_MODULES.includes(key)) key = LECTURER_MODULES[0];
    const mod = modules[key];

    document.getElementById("moduleTitle").textContent = mod.name;
    document.getElementById("moduleSubtitle").textContent = mod.code;
    document.title = mod.name + " Materials - RichNotes";

    let items = mod.topics.map(t => {
        const ext = (t.file.split("?")[0].split(".").pop() || "pdf").toLowerCase();
        return { title: t.title, file: t.file, slides: ext === "pptx" || ext === "ppt" };
    });
    let pending = null;

    const body = document.getElementById("materialsBody");
    const search = document.getElementById("searchInput");
    const typeSel = document.getElementById("typeFilter");
    const sortSel = document.getElementById("sortFilter");
    const esc = s => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    function render() {
        const q = search.value.trim().toLowerCase();
        const type = typeSel.value;
        let list = items.filter(i => {
            if (q && !i.title.toLowerCase().includes(q)) return false;
            if (type === "PDF") return !i.slides;
            if (type === "Slides") return i.slides;
            if (type === "Lecture Notes") return !i.slides && i.title !== "Study Guide";
            return true;
        });
        if (sortSel.value === "Oldest") list = list.slice().reverse();

        if (!list.length) {
            body.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:24px;">No materials found.</td></tr>';
            return;
        }
        body.innerHTML = list.map(i => `
            <tr>
                <td><div class="material-title">
                    <span class="file-icon ${i.slides ? "slides" : "pdf"}">${i.slides ? "PPT" : "PDF"}</span>
                    <span>${esc(i.title)}</span></div></td>
                <td><span class="badge ${i.slides ? "slides" : "pdf"}">${i.slides ? "Slides" : "PDF"}</span></td>
                <td>&mdash;</td>
                <td class="actions">
                    <button class="btn-action view" title="View" data-act="view" data-t="${esc(i.title)}">\uD83D\uDC41</button>
                    <button class="btn-action edit" title="Edit" onclick="location.href='lecturer-edit.html'">\u270F\uFE0F</button>
                    <button class="btn-action delete" title="Delete" data-act="delete" data-t="${esc(i.title)}">\uD83D\uDDD1</button>
                </td>
            </tr>`).join("");
    }

    body.addEventListener("click", e => {
        const btn = e.target.closest("button[data-act]");
        if (!btn) return;
        const item = items.find(i => i.title === btn.dataset.t);
        if (!item) return;
        if (btn.dataset.act === "view") window.open(item.file, "_blank", "noopener");
        else showDeleteModal(item.title);
    });
    [search, typeSel, sortSel].forEach(el => el.addEventListener("input", render));

    const overlay = document.getElementById("deleteModal");
    window.showDeleteModal = function (title) {
        pending = title;
        document.getElementById("deleteMessage").textContent = 'Are you sure you want to delete "' + title + '"?';
        overlay.classList.add("show", "active", "open");
        overlay.style.display = "flex";
    };
    window.closeDeleteModal = function () {
        overlay.classList.remove("show", "active", "open");
        overlay.style.display = "";
        pending = null;
    };
    window.confirmDelete = function () {
        items = items.filter(i => i.title !== pending);
        closeDeleteModal();
        render();
    };

    render();
})();
