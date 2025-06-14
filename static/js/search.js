// static/js/search.js

document.addEventListener("DOMContentLoaded", function () {
  const lang = document.documentElement.lang || "en";
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    console.warn("Search input field not found.");
    return;
  }

  fetch(`/${lang}/index.json`)
    .then(response => response.json())
    .then(data => {
      const idx = lunr(function () {
        this.ref("permalink");
        this.field("title");
        this.field("summary");
        this.field("content");

        data.forEach(doc => this.add(doc));
      });

      searchInput.addEventListener("input", function () {
        const results = idx.search(this.value);
        // Display logic here, this depends on your HTML layout
        console.log("Search results:", results);
      });
    })
    .catch(err => {
      console.error("Search index load failed:", err);
    });
});
