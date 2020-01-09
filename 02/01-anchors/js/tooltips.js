const anchors = document.querySelectorAll(".anchor-tooltip");
anchors.forEach(anchor => {
  const tooltipText = anchor.getAttribute("title"),
    tooltip = document.createElement("span");
  tooltip.className = "title-tooltip";
  tooltip.innerHTML = tooltipText;
  anchor.appendChild(tooltip);
});
