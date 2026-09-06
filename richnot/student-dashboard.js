    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "student") {
        window.location.href = "home.html";
    } else {
        // Get student's first name
        const firstName = currentUser.name.split(" ")[0];
        document.getElementById("userName").textContent = firstName;
        
        // Get current time and set appropriate greeting
        const hour = new Date().getHours();
        let greeting = "";
        
        if (hour < 12) {
            greeting = "Good morning";
            document.getElementById("subGreeting").textContent = "Here's what's happening in your learning journey.";
        } else if (hour < 17) {
            greeting = "Good afternoon";
            document.getElementById("subGreeting").textContent = "Here's what's happening in your learning journey.";
        } else {
            greeting = "Good evening";
            document.getElementById("subGreeting").textContent = "Here's what's happening in your learning journey.";
        }
        
        document.getElementById("greeting").innerHTML = `${greeting}, <span style="color: #1a438e;">${firstName}</span> `;
    }
    
    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "home.html";
    }