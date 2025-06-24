(function() {
  console.log("Initializing search...");

  const currentLang = window.location.pathname.split('/')[1] || 'en';
  const indexPath = `/${currentLang}/index.json`;
  console.log(`Loading index from: ${indexPath}`);

  const searchInput = document.getElementById("search-input");
  const resultsContainer = document.querySelector(".td-search-result .col-12");

  if (!searchInput || !resultsContainer) {
    console.error("Missing required elements");
    return;
  }

  const resultsList = document.createElement("div");
  resultsList.id = "search-results";
  resultsList.className = "mt-3";
  resultsContainer.appendChild(resultsList);

  fetch(indexPath)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => {
      // Convert object to array if needed
      const documents = Array.isArray(data) ? data : Object.values(data);
      console.log(`Loaded ${documents.length} documents`, documents);

      // Filter out empty/invalid documents
      const validDocs = documents.filter(doc =>
        doc.permalink &&
        (doc.title || doc.content) &&
        !doc.permalink.includes('/search/') // Exclude search page itself
      );

      console.log(`Using ${validDocs.length} valid documents`);

      const idx = lunr(function() {
        this.ref("permalink");
        this.field("title", { boost: 10 });
        this.field("description", { boost: 5 });
        this.field("content");
        validDocs.forEach(doc => this.add(doc));
      });

      searchInput.addEventListener("input", function() {
        const query = this.value.trim();
        resultsList.innerHTML = "";

        if (query.length < 2) {
          resultsList.innerHTML = `<div class="px-3">Enter at least 2 characters</div>`;
          return;
        }

        try {
          const results = idx.search(query);
          console.log(`Found ${results.length} results for "${query}"`, results);

          if (!results.length) {
            resultsList.innerHTML = `<div class="px-3">No results for "${query}"</div>`;
            return;
          }

          results.forEach(result => {
            const doc = validDocs.find(d => d.permalink === result.ref);
            if (!doc) return;

            const item = document.createElement("div");
            item.className = "mb-3 px-3 border-bottom";
            item.innerHTML = `
              <a href="${doc.permalink}" class="d-block h5 mb-1">
                ${doc.title || "Untitled"}
              </a>
              ${doc.description ? `<p class="mb-1 text-muted">${doc.description}</p>` : ''}
              <div class="text-truncate small">${doc.content.substring(0, 150)}...</div>
            `;
            resultsList.appendChild(item);
          });
        } catch (err) {
          console.error("Search error:", err);
          resultsList.innerHTML = `<div class="px-3 text-danger">Search error occurred</div>`;
        }
      });
    })
    .catch(err => {
      console.error("Search init failed:", err);
      resultsList.innerHTML = `
        <div class="px-3 text-danger">
          Search unavailable: ${err.message}
        </div>
      `;
    });
})();
