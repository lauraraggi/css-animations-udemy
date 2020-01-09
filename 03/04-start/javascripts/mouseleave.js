$(function() {
  $(window).mouseleave(e => {
    const modalSeen = sessionStorage.getItem("modalSeen");
    if (e.toElement == null && modalSeen !== "true") {
      document.documentElement.classList.add("mouse-out");
    }
  });

  $("#close-modal").click(e => {
    e.preventDefault();
    document.documentElement.classList.remove("mouse-out");
    sessionStorage.setItem("modalSeen", "true");
  });
});
