const copyAnchorLink = (anchorName) => {
  // Get the full link
  const currentUrl = window.location.href;
  const hashIndex = currentUrl.indexOf("#");
  const baseUrl =
    hashIndex === -1 ? currentUrl : currentUrl.substring(0, hashIndex);
  const fullLink = `${baseUrl}#${anchorName}`;

  // Copy the full link to the clipboard
  navigator.clipboard.writeText(fullLink);

  // Replace the current URL with the full link and scroll to the anchor
  window.history.replaceState(null, null, fullLink);
  const anchorElement =
    document.getElementById(anchorName) ||
    document.getElementsByName(anchorName)[0];
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#page-container > div").forEach((el) => {
    const button = document.createElement(`button`);
    button.style = "position: absolute; right: 20px; top: 20px";
    button.innerHTML = "Copy page link";
    el.appendChild(button);

    button.addEventListener("click", (e) => copyAnchorLink(el.id), false);
  });
});
