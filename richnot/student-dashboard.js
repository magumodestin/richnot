// ===== Dashboard only: greeting =====
(function () {
    let currentUser = null;
    try { currentUser = JSON.parse(localStorage.getItem("currentUser")); } catch (e) {}
    if (!currentUser || currentUser.role !== "student") return; // student-sidebar.js redirects

    const firstName = (currentUser.name || "Student").split(" ")[0];
    const hour = new Date().getHours();

    let greeting = "Good evening";
    if (hour < 12) greeting = "Good morning";
    else if (hour < 17) greeting = "Good afternoon";

    document.getElementById("greeting").innerHTML =
        `${greeting}, <span style="color: #1a438e;">${firstName}</span>`;
    document.getElementById("subGreeting").textContent =
        "Here's what's happening in your learning journey.";
})();
