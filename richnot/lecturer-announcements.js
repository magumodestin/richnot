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

    const modal = document.getElementById('announcementModal');
    const modalTitle = document.getElementById('modalTitle');
    const announcementForm = document.getElementById('announcementForm');
    const announcementModule = document.getElementById('announcementModule');
    const announcementTitle = document.getElementById('announcementTitle');
    const announcementMessage = document.getElementById('announcementMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    let editingAnnouncement = null;

    function openModal() {
        editingAnnouncement = null;
        modalTitle.textContent = 'Create Announcement';
        submitBtn.textContent = 'Post Announcement';
        announcementForm.reset();
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    function editAnnouncement(button) {
        const item = button.closest('.announcement-item');
        const title = item.querySelector('h3').textContent;
        const message = item.querySelector('p').textContent;
        const module = item.querySelector('.announcement-meta').textContent.split('·')[1].trim();
        
        editingAnnouncement = item;
        modalTitle.textContent = 'Edit Announcement';
        submitBtn.textContent = 'Save Changes';
        announcementTitle.value = title;
        announcementMessage.value = message;
        announcementModule.value = module;
        modal.classList.add('show');
    }

    function deleteAnnouncement(button) {
        if (confirm('Are you sure you want to delete this announcement?')) {
            const item = button.closest('.announcement-item');
            item.style.transition = 'all .3s ease';
            item.style.opacity = '0';
            setTimeout(() => {
                item.remove();
                showSuccess('Announcement deleted successfully!');
            }, 300);
        }
    }

    announcementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const module = announcementModule.value;
        const title = announcementTitle.value.trim();
        const message = announcementMessage.value.trim();
        
        if (!module || !title || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        if (editingAnnouncement) {
            editingAnnouncement.querySelector('h3').textContent = title;
            editingAnnouncement.querySelector('p').textContent = message;
            editingAnnouncement.querySelector('.announcement-meta').textContent = `📅 ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · ${module} · ${currentUser.name}`;
            showSuccess('Announcement updated successfully!');
        } else {
            const announcementsList = document.querySelector('.announcements-list');
            const newAnnouncement = document.createElement('div');
            newAnnouncement.className = 'announcement-item';
            newAnnouncement.innerHTML = `
                <div class="announcement-icon info">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a438e" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                </div>
                <div class="announcement-content">
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <div class="announcement-meta">📅 ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} · ${module} · ${currentUser.name}</div>
                </div>
                <div class="announcement-actions">
                    <button class="btn-action edit" onclick="editAnnouncement(this)">Edit</button>
                    <button class="btn-action delete" onclick="deleteAnnouncement(this)">Delete</button>
                </div>
            `;
            announcementsList.insertBefore(newAnnouncement, announcementsList.firstChild);
            showSuccess('Announcement posted successfully!');
        }
        
        closeModal();
    });

    function showSuccess(message) {
        const successMsg = document.getElementById('successMsg');
        successMsg.textContent = message;
        successMsg.classList.add('show');
        
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });