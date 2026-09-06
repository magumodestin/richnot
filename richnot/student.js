    // Check if lecturer is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "lecturer") {
        window.location.href = "home.html";
    } else {
        document.getElementById("userName").textContent = currentUser.name.split(" ")[0];
    }
    
    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "home.html";
    }
	
	
	