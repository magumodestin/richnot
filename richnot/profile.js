    // Check user authentication
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        window.location.href = "home.html";
    } else {
        // Set back link based on role
        const backLink = document.getElementById('backToDashboard');
        if (currentUser.role === "lecturer") {
            backLink.href = "lecturer-dashboard.html";
        } else {
            backLink.href = "student-dashboard.html";
        }
        
        // Populate profile fields
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        document.getElementById('roleBadge').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        
        if (currentUser.memberSince) {
            document.getElementById('profileDate').textContent = currentUser.memberSince;
        }
        
        if (currentUser.profilePic) {
            document.getElementById('profilePic').src = currentUser.profilePic;
        }
    }

    function logout() {
        localStorage.removeItem("currentUser");
        window.location.href = "home.html";
    }

    // Edit profile picture
    const editLink = document.getElementById('editLink');
    const fileInput = document.getElementById('fileInput');
    const profilePic = document.getElementById('profilePic');

    editLink.addEventListener('click', function(e) {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Update profile button
    const updateBtn = document.getElementById('updateBtn');
    const successMsg = document.getElementById('successMsg');

    updateBtn.addEventListener('click', function() {
        // Update user data
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        
        if (userIndex !== -1) {
            // Update profile picture if changed
            if (profilePic.src !== "no-profile-pic.jpg" && profilePic.src.startsWith("data:")) {
                users[userIndex].profilePic = profilePic.src;
            }
            
            // Save updates
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(users[userIndex]));
            
            // Show success feedback
            updateBtn.textContent = "✓ Profile Updated!";
            updateBtn.classList.add("success");
            successMsg.classList.add("show");
            
            setTimeout(function() {
                updateBtn.textContent = "Update Profile";
                updateBtn.classList.remove("success");
                successMsg.classList.remove("show");
            }, 2000);
        }
    });