document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  if (!searchForm || !searchInput || !resultsContainer) return;

  // Get language and translations
  const lang = window.searchI18n.detectLanguage();
  const t = (key) => window.searchI18n.t(key, lang);

  // Get initial query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('q') || '';
  if (initialQuery) searchInput.value = initialQuery;

  // Load search index
  fetch(`/${lang}/index.json`)
    .then(response => {
      if (!response.ok) throw new Error('Index load failed');
      return response.json();
    })
    .then(data => {
      // Normalize data to array
      const documents = Array.isArray(data) ? data : Object.values(data);
      const validDocs = documents.filter(doc =>
        doc.permalink &&
        (doc.title || doc.content) &&
        !doc.permalink.includes('/search/')
      );

      // Initialize Lunr with language-specific pipeline
      const idx = lunr(function() {
        this.ref('permalink');
        this.field('title', { boost: 10 });
        this.field('description', { boost: 5 });
        this.field('content');

        // Special pipeline for case-sensitive languages
        if (['tr', 'nl'].includes(lang)) {
          this.pipeline.remove(lunr.stemmer);
          this.pipeline.remove(lunr.stopWordFilter);
        }

        validDocs.forEach(doc => this.add(doc));
      });

      // Perform search function
      const doSearch = (query) => {
        query = query.trim();
        resultsContainer.innerHTML = '';

        if (query.length < 2) {
          resultsContainer.innerHTML = `<div class="px-3">${t('minimumChars')}</div>`;
          return;
        }

        try {
          // Normalize query for case-sensitive languages
          const normalizedQuery = window.searchI18n.normalizeTerm(query, lang);
          const results = idx.search(normalizedQuery);

          if (!results.length) {
            resultsContainer.innerHTML = `<div class="px-3">${t('noResults')} "${query}"</div>`;
            return;
          }

          results.forEach(result => {
            const doc = validDocs.find(d => d.permalink === result.ref);
            if (!doc) return;

            const item = document.createElement('div');
            item.className = 'mb-3 px-3 border-bottom';
            item.innerHTML = `
              <a href="${doc.permalink}" class="d-block h5 mb-1">
                ${doc.title || t('untitled')}
              </a>
              ${doc.description ? `<p class="mb-1 text-muted">${doc.description}</p>` : ''}
              <div class="text-truncate small">${(doc.content || '').substring(0, 150)}...</div>
            `;
            resultsContainer.appendChild(item);
          });
        } catch (err) {
          console.error('Search error:', err);
          resultsContainer.innerHTML = `<div class="px-3 text-danger">${t('searchError')}</div>`;
        }
      };

      // Form submission
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        window.history.pushState(null, null, `?q=${encodeURIComponent(query)}`);
        doSearch(query);
      });

      // Input handling (debounced)
      let searchTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          const query = searchInput.value.trim();
          window.history.replaceState(null, null, `?q=${encodeURIComponent(query)}`);
          doSearch(query);
        }, 300);
      });

      // Initial search if query exists
      if (initialQuery) doSearch(initialQuery);
    })
    .catch(err => {
      console.error('Search init failed:', err);
      resultsContainer.innerHTML = `<div class="px-3 text-danger">${t('searchError')}</div>`;
    });
});