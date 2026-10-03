// Download buttons: downloads the file named in data-src
document.querySelectorAll(".btn-action.download").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var file = btn.dataset.src;
    if (!file) return;

    var link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop(); // name of the saved file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// View buttons: opens the file named in data-src in a new tab
document.querySelectorAll(".btn-action.view").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var file = btn.dataset.src;
    if (!file) return;

    window.open(file, "_blank");
  });
});
