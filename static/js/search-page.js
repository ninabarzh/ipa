document.addEventListener('DOMContentLoaded', function() {
  // Only run on search page
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  // Get language and translations
  const lang = window.searchI18n.detectLanguage();
  const t = (key) => window.searchI18n.t(key, lang);

  // Get query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';

  // Show appropriate initial message
  if (!query) {
    resultsContainer.innerHTML = `<div class="px-3">${t('searchPrompt')}</div>`;
    return;
  }

  // Show loading message
  if (query) {
    resultsContainer.innerHTML = `<div class="px-3">${t('loading')} "${query}"...</div>`;
  }

  // Load index for current language
  fetch(`/${lang}/index.json`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to load index');
      return response.json();
    })
    .then(data => {
      // Initialize search
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

        // Add documents
        const docs = Array.isArray(data) ? data : Object.values(data);
        docs.forEach(doc => {
          if (doc.permalink && !doc.permalink.includes('/search/')) {
            this.add(doc);
          }
        });
      });

      // Perform search if query exists
      if (query) {
        const normalizedQuery = window.searchI18n.normalizeTerm(query, lang);
        const results = idx.search(normalizedQuery);
        displayResults(results, data, query);
      }
    })
    .catch(err => {
      console.error('Search results failed:', err);
      resultsContainer.innerHTML = `<div class="px-3 text-danger">${t('searchError')}</div>`;
    });

  function displayResults(results, docs, query) {
    resultsContainer.innerHTML = '';

    if (!results.length) {
      resultsContainer.innerHTML = `<div class="px-3">${t('noResults')} "${query}"</div>`;
      return;
    }

    results.forEach(result => {
      const doc = docs.find(d => d.permalink === result.ref);
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
  }
});