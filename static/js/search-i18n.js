// Shared language resources and utilities for search
window.searchI18n = {
  translations: {
    noResults: {
      en: 'No results for',
      es: 'No hay resultados para',
      fr: 'Aucun résultat pour',
      de: 'Keine Ergebnisse für',
      nl: 'Geen resultaten voor',
      tr: 'Sonuç bulunamadı'
    },
    untitled: {
      en: 'Untitled',
      es: 'Sin título',
      fr: 'Sans titre',
      de: 'Ohne Titel',
      nl: 'Zonder titel',
      tr: 'Başlıksız'
    },
    searchError: {
      en: 'Search currently unavailable',
      es: 'Búsqueda no disponible',
      fr: 'Recherche indisponible',
      de: 'Suche nicht verfügbar',
      nl: 'Zoeken is niet beschikbaar',
      tr: 'Arama şu anda kullanılamıyor'
    },
    minimumChars: {
      en: 'Enter at least 2 characters',
      es: 'Ingrese al menos 2 caracteres',
      fr: 'Entrez au moins 2 caractères',
      de: 'Mindestens 2 Zeichen eingeben',
      nl: 'Voer minimaal 2 tekens in',
      tr: 'En az 2 karakter girin'
    },
    searchPrompt: {
      en: 'Please use the search box in the navigation bar',
      es: 'Por favor use el cuadro de búsqueda en la barra de navegación',
      fr: 'Veuillez utiliser la barre de recherche dans la barre de navigation',
      de: 'Bitte verwenden Sie das Suchfeld in der Navigationsleiste',
      nl: 'Gebruik het zoekvak in de navigatiebalk',
      tr: 'Lütfen gezinme çubuğundaki arama kutusunu kullanın'
    },
    loading: {
      en: 'Loading results for',
      es: 'Cargando resultados para',
      fr: 'Chargement des résultats pour',
      de: 'Lade Ergebnisse für',
      nl: 'Resultaten laden voor',
      tr: 'Sonuçlar yükleniyor'
    }
  },

  // Get translation for current language
  t: function(key, lang) {
    return this.translations[key]?.[lang] || this.translations[key]?.en || '';
  },

  // Case normalization based on language
  normalizeTerm: function(term, lang) {
    // Special handling for case-sensitive languages
    if (['tr', 'nl'].includes(lang)) {
      return term.toLowerCase();
    }
    return term;
  },

  // Language detection
  detectLanguage: function() {
    const lang = window.location.pathname.split('/')[1];
    return ['en', 'es', 'fr', 'de', 'nl', 'tr'].includes(lang) ? lang : 'en';
  }
};
