const getPageNumber = (pageEl) => {
  if (!pageEl || !pageEl.firstChild) {
    if (pageEl.id === "pf30") {
      console.log("A");
    }
    return;
  }
  const firstChild = pageEl.firstChild;

  if (
    firstChild.nodeType === Node.ELEMENT_NODE &&
    firstChild.tagName === "DIV"
  ) {
    if (pageEl.id === "pf30") {
      console.log("B");
    }
    const textContent = firstChild.textContent;

    const match = textContent.match(/— (\w+) —/);
    if (match) {
      if (pageEl.id === "pf30") {
        console.log("C");
      }
      return match[1];
    }
    if (pageEl.id === "pf30") {
      console.log("D");
    }
  }
  if (pageEl.id === "pf30") {
    console.log("E");
  }

  return;
};

const insertAnchorTag = (el, anchorName) => {
  const anchorTag = document.createElement("a");
  anchorTag.id = anchorName;
  anchorTag.name = anchorName;
  if (el.firstChild) {
    el.insertBefore(anchorTag, el.firstChild);
  } else {
    el.appendChild(anchorTag);
  }
};

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
    let anchorName = el.id;

    // use the page number as the anchor name if available
    const pageNumber = getPageNumber(el);
    if (pageNumber) {
      anchorName = `p-${pageNumber}`;
      insertAnchorTag(el, anchorName);
    }

    const button = document.createElement(`button`);
    button.style = "position: absolute; right: 20px; top: 20px";
    button.innerHTML = "Copy page link";
    el.appendChild(button);

    button.addEventListener("click", (e) => copyAnchorLink(anchorName), false);
  });
});
