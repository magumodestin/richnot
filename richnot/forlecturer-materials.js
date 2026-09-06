    let deleteItemName = "";
    
    function showDeleteModal(itemName) {
        deleteItemName = itemName;
        document.getElementById("deleteMessage").textContent = `Are you sure you want to delete "${itemName}"?`;
        document.getElementById("deleteModal").classList.add("show");
    }
    
    function closeDeleteModal() {
        document.getElementById("deleteModal").classList.remove("show");
    }
    
    function confirmDelete() {
        alert(`Material "${deleteItemName}" has been deleted.`);
        closeDeleteModal();
    }