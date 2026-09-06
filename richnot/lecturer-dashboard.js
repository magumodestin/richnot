 const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "lecturer") {
        window.location.href = "home.html";
    } else {
        const firstName = currentUser.name.split(" ")[0];
        document.getElementById("userName").textContent = firstName;
        
        const hour = new Date().getHours();
        let greeting = "";
        
        if (hour < 12) {
            greeting = "Good morning";
        } else if (hour < 17) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }
        
        document.getElementById("greeting").innerHTML = `${greeting}, <span style="color: #1a438e;">${firstName}</span> ??`;
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