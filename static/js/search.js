document.addEventListener("DOMContentLoaded", function () {
  let lang = document.documentElement.lang || "en";

  // Fallback to 'en' if language plugin is missing
  if (lang !== "en" && !lunr[lang]) {
    console.warn(`Lunr plugin for '${lang}' not found. Falling back to English.`);
    lang = "en";
  }

  const searchInput = document.getElementById("searchbox");
  const searchResults = document.getElementById("searchresults");

  if (!searchInput || !searchResults) {
    console.warn("Search input or result container not found.");
    return;
  }

  let index = null;
  let documents = [];

  // Load the search index JSON
  fetch(`/${lang}/index.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load search index for language: ${lang}`);
      }
      return response.json();
    })
    .then(data => {
      documents = data;

      // Initialise the language plugin if needed
      if (lang !== "en" && lunr[lang]) {
        lunr[lang].call(lunr);
      }

      // Build the index
      index = lunr(function () {
        if (lang !== "en" && this.use) {
          this.use(lunr[lang]);
        }

        this.ref("permalink");
        this.field("title");
        this.field("summary");
        this.field("content");

        data.forEach(doc => this.add(doc));
      });

      console.log(`Search index for '${lang}' loaded.`);
    })
    .catch(err => {
      console.error("Search index load failed:", err);
    });

  // Handle search input
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
        if (!doc) return "";

        return `
          <div class="search-result">
            <a href="${doc.permalink}"><strong>${doc.title}</strong></a><br/>
            <small>${doc.summary || doc.content.slice(0, 100)}...</small>
          </div>
        `;
      })
      .join("");

    searchResults.innerHTML = output;
  }
});
