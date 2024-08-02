const getPageNumber = (pageEl) => {
  // Use known page number format to extract page number from the div.
  // We expect the page number to be in the format "— 123 —" inside the first child div
  if (!pageEl || !pageEl.firstChild) {
    return;
  }
  const firstChild = pageEl.firstChild;

  if (
    firstChild.nodeType === Node.ELEMENT_NODE &&
    firstChild.tagName === "DIV"
  ) {
    const textContent = firstChild.textContent;
    const match = textContent.match(/— (\w+) —/);
    if (match) {
      return match[1];
    }
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

const scrollToAnchor = (anchorName, smooth = true) => {
  const anchorElement =
    document.getElementById(anchorName) ||
    document.getElementsByName(anchorName)[0];
  if (anchorElement) {
    anchorElement.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
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

    button.addEventListener(
      "click",
      (e) => {
        copyAnchorLink(anchorName);
        scrollToAnchor(anchorName);
      },
      false
    );

    // Scroll to the anchor if the page is loaded with a hash. Need to do this
    // here because the anchor tags are inserted dynamically as part of
    // the domContentLoaded event.
    const hash = window.location.hash;
    if (hash && hash.substring(1)) {
      scrollToAnchor(hash.substring(1), false);
    }
  });
});
