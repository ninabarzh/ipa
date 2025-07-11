<script>
(function () {
  const supportedLangs = ['en', 'es', 'fr', 'de', 'nl', 'tr'];
  const defaultLang = 'en';
  const storageKey = 'poweron-lang-pref';

  const fallbackLanguageByCountry = {
    // French-speaking African countries
    DZ: 'fr', CM: 'fr', CI: 'fr', BF: 'fr', BI: 'fr', MG: 'fr', ML: 'fr',
    NE: 'fr', SN: 'fr', TD: 'fr', TG: 'fr', BJ: 'fr', GN: 'fr', GA: 'fr',
    KM: 'fr', CG: 'fr', CD: 'fr', CF: 'fr',

    // Latin America – Spanish
    AR: 'es', BO: 'es', CL: 'es', CO: 'es', CR: 'es', CU: 'es', DO: 'es',
    EC: 'es', GT: 'es', HN: 'es', MX: 'es', NI: 'es', PA: 'es', PY: 'es',
    PE: 'es', SV: 'es', UY: 'es', VE: 'es',

    // Portuguese-speaking Africa, fallback to French
    AO: 'fr', MZ: 'fr', GW: 'fr', CV: 'fr', ST: 'fr', GQ: 'fr',

    // Eastern and Central Europe – German as bridge language
    AT: 'de', DE: 'de', CH: 'de', LI: 'de', LU: 'de', CZ: 'de', SK: 'de',
    PL: 'de', HU: 'de', RO: 'de', HR: 'de', SI: 'de', BA: 'de', BG: 'de',
    RS: 'de', ME: 'de', MK: 'de', MD: 'de', UA: 'de'
  };

  const pathParts = window.location.pathname.split('/');
  const currentLang = pathParts[1];
  const isAtRoot = (
    window.location.pathname === '/' ||
    window.location.pathname === '' ||
    window.location.pathname === '/index.html'
  );

  // 1. Use stored language if available
  const storedLang = localStorage.getItem(storageKey);
  if (isAtRoot && storedLang && supportedLangs.includes(storedLang)) {
    if (currentLang !== storedLang) {
      window.location.replace(`/${storedLang}/`);
    }
    return;
  }

  // 2. Otherwise, use browser or fallback
  if (isAtRoot || !supportedLangs.includes(currentLang)) {
    const navLang = (navigator.languages && navigator.languages.length)
      ? navigator.languages[0]
      : navigator.language || defaultLang;

    const langCode = navLang.toLowerCase().split('-')[0];
    const countryCode = navLang.toUpperCase().split('-')[1] || '';

    let finalLang = defaultLang;
    if (supportedLangs.includes(langCode)) {
      finalLang = langCode;
    } else if (countryCode && fallbackLanguageByCountry[countryCode]) {
      const fallback = fallbackLanguageByCountry[countryCode];
      if (supportedLangs.includes(fallback)) {
        finalLang = fallback;
      }
    }

    if (currentLang !== finalLang) {
      localStorage.setItem(storageKey, finalLang);
      window.location.replace(`/${finalLang}/`);
    }
  }
})();
</script>

<script>
  // Optional: remember user-chosen language from navbar links
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.addEventListener('click', function () {
        const href = this.getAttribute('href');
        const langMatch = href.match(/^\/(en|es|fr|de|nl|tr)\//);
        if (langMatch) {
          localStorage.setItem('poweron-lang-pref', langMatch[1]);
        }
      });
    });
  });
</script>

