// ===== Shared by ALL student pages (based on your original student-siderbar.js) =====

// Login guard: only logged-in students may see these pages
let currentUser = null;
try { currentUser = JSON.parse(localStorage.getItem("currentUser")); } catch (e) {}
if (!currentUser || currentUser.role !== "student") {
    window.location.href = "home.html";
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "home.html";
}

function openSidebar() {
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("sidebarOverlay").classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("show");
    document.body.style.overflow = "";
}
