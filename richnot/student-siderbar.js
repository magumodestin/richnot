    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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