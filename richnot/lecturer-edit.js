const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "lecturer") {
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
    
    function showFileName(input) {
        if (input.files.length > 0) {
            const fileInfo = document.querySelector('.file-info');
            fileInfo.querySelector('h4').textContent = input.files[0].name;
            const size = (input.files[0].size / (1024 * 1024)).toFixed(1);
            fileInfo.querySelector('p').textContent = `${size} MB`;
        }
    }
    
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        document.getElementById('successMsg').classList.add('show');
        
        setTimeout(function() {
            window.location.href = 'lecturer-materials.html';
        }, 2000);
    });