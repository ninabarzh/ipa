// public/js/search.js
(function () {
  const lang = document.documentElement.lang || 'en';
  const indexPath = `/${lang}/index.json`;
  const searchInput = document.getElementById("search-input");
  const resultsList = document.getElementById("search-results");

  if (!searchInput) return;

  // Map of supported language codes to Lunr plugins
  const langSupport = {
    en: null,
    fr: lunr.fr,
    de: lunr.de,
    es: lunr.es,
    nl: lunr.nl,
    tr: lunr.tr,
  };

  // If language isn't supported, fallback to English
  const normalisedLang = langSupport[lang] ? lang : 'en';

  fetch(indexPath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch search index for ${lang}: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Initialise Lunr with the correct language pipeline
      let idx;

      if (normalisedLang === 'en') {
        idx = lunr(function () {
          this.ref("permalink");
          this.field("title", { boost: 10 });
          this.field("description", { boost: 5 });
          this.field("content");
          data.forEach((doc) => this.add(doc));
        });
      } else {
        idx = lunr(function () {
          this.use(langSupport[normalisedLang]);
          this.ref("permalink");
          this.field("title", { boost: 10 });
          this.field("description", { boost: 5 });
          this.field("content");
          data.forEach((doc) => this.add(doc));
        });
      }

      console.log(`Search index for '${normalisedLang}' loaded.`);

      searchInput.addEventListener("input", function () {
        const query = this.value.trim();
        resultsList.innerHTML = "";

        if (!query) return;

        const results = idx.search(query);

        if (results.length === 0) {
          resultsList.innerHTML = "<li>No results found</li>";
          return;
        }

        results.forEach((result) => {
          const match = data.find((d) => d.permalink === result.ref);
          if (match) {
            const li = document.createElement("li");

            const a = document.createElement("a");
            a.href = match.permalink;
            a.textContent = match.title || match.permalink;
            li.appendChild(a);

            if (match.description) {
              const p = document.createElement("p");
              p.textContent = match.description;
              li.appendChild(p);
            }

            resultsList.appendChild(li);
          }
        });
      });
    })
    .catch((err) => {
      console.error("Search initialisation failed:", err);
    });
})();
