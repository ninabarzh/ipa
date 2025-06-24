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

  // ===== NEW HELPER FUNCTIONS ===== //
  function highlightMatches(text, query) {
    if (!text || !query) return text || '';
    const terms = query.trim().split(/\s+/).filter(term => term.length > 2);
    if (!terms.length) return text;
    return terms.reduce((result, term) => {
      const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
      return result.replace(regex, '<span class="search-highlight">$1</span>');
    }, text);
  }

  function getContentPreview(content, query) {
    if (!content) return '';
    const terms = query.trim().split(/\s+/).filter(term => term.length > 2);
    if (!terms.length) return content.substring(0, 150) + '...';

    // Find first matching term position
    const firstMatchPos = terms.reduce((pos, term) => {
      const termPos = content.toLowerCase().indexOf(term.toLowerCase());
      return termPos > -1 && (pos === -1 || termPos < pos) ? termPos : pos;
    }, -1);

    if (firstMatchPos > -1) {
      const start = Math.max(0, firstMatchPos - 300);
      const end = Math.min(content.length, firstMatchPos + terms[0].length + 300);
      let preview = content.slice(start, end);
      if (start > 0) preview = '...' + preview;
      if (end < content.length) preview += '...';
      return highlightMatches(preview, query);
    }
    return highlightMatches(content.substring(0, 150) + '...', query);
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ===== UPDATED DISPLAY FUNCTION ===== //
  function displayResults(results, docs, query) {
    resultsContainer.innerHTML = '';

    if (!results.length) {
      resultsContainer.innerHTML = `
        <div class="search-no-results px-3 py-2">
          ${t('noResults')} "<span class="search-highlight">${query}</span>"
        </div>`;
      return;
    }

    results.forEach(result => {
      const doc = docs.find(d => d.permalink === result.ref);
      if (!doc) return;

      const item = document.createElement('div');
      item.className = 'search-result p-3 border-bottom';
      item.innerHTML = `
        <a href="${doc.permalink}" class="d-block h5 mb-1 text-primary">
          ${highlightMatches(doc.title || t('untitled'), query)}
        </a>
        ${doc.description ? `
          <p class="mb-1 text-muted">
            ${highlightMatches(doc.description, query)}
          </p>` : ''}
        <div class="search-content small">
          ${getContentPreview(doc.content, query)}
        </div>
      `;
      resultsContainer.appendChild(item);
    });
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
      resultsContainer.innerHTML = `
        <div class="px-3 py-2 text-danger">
          ${t('searchError')}
        </div>`;
    });
});