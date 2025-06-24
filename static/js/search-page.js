document.addEventListener('DOMContentLoaded', function() {
  // Only run on search page
  const resultsContainer = document.getElementById('search-results');
  if (!resultsContainer) return;

  console.log('Initializing search page results...');

  // Get query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') || '';

  // Load index for current language
  const lang = window.location.pathname.split('/')[1] || 'en';
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
        const results = idx.search(query);
        displayResults(results, data);
      }
    })
    .catch(err => {
      console.error('Search results failed:', err);
      resultsContainer.innerHTML = `
        <div class="px-3 text-danger">
          Could not load search results
        </div>
      `;
    });

  function displayResults(results, docs) {
    resultsContainer.innerHTML = '';

    if (!results.length) {
      resultsContainer.innerHTML = `<div class="px-3">No results for "${query}"</div>`;
      return;
    }

    results.forEach(result => {
      const doc = docs.find(d => d.permalink === result.ref);
      if (!doc) return;

      const item = document.createElement('div');
      item.className = 'mb-3 px-3 border-bottom';
      item.innerHTML = `
        <a href="${doc.permalink}" class="d-block h5 mb-1">
          ${doc.title || 'Untitled'}
        </a>
        ${doc.description ? `<p class="mb-1 text-muted">${doc.description}</p>` : ''}
        <div class="text-truncate small">${(doc.content || '').substring(0, 150)}...</div>
      `;
      resultsContainer.appendChild(item);
    });
  }
});
