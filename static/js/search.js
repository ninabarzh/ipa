document.addEventListener("DOMContentLoaded", function () {
  const lang = document.documentElement.lang || "en";
  const searchInput = document.getElementById("searchbox");
  const searchResults = document.getElementById("searchresults");

  if (!searchInput || !searchResults) {
    console.warn("Search input or result container not found.");
    return;
  }

  let index = null;
  let documents = [];

  // Load the JSON index for the current language
  fetch(`/${lang}/index.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load search index for language: ${lang}`);
      }
      return response.json();
    })
    .then(data => {
      documents = data;

      index = lunr(function () {
        this.ref("permalink");
        this.field("title");
        this.field("summary");
        this.field("content");

        data.forEach(doc => this.add(doc));
      });

      console.log(`Search index for ${lang} loaded.`);
    })
    .catch(err => {
      console.error("Search index load failed:", err);
    });

  // Search on input
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();

    if (!index || !query) {
      searchResults.innerHTML = "";
      return;
    }

    const results = index.search(query);
    displayResults(results);
  });

  function displayResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = "<p>No results found</p>";
      return;
    }

    const output = results
      .map(result => {
        const doc = documents.find(d => d.permalink === result.ref);
        return `<div class="search-result">
                  <a href="${doc.permalink}"><strong>${doc.title}</strong></a><br/>
                  <small>${doc.summary || doc.content.slice(0, 100)}...</small>
                </div>`;
      })
      .join("");

    searchResults.innerHTML = output;
  }
});
