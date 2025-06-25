(function () {
  const supportedLangs = ['en', 'es', 'fr', 'de', 'nl', 'tr'];
  const defaultLang = 'en';

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

  // Get current language from path
  const pathParts = window.location.pathname.split('/');
  const pathLang = pathParts[1];

  // Only redirect if:
  // 1. We're on the root path AND
  // 2. The path doesn't already contain a supported language
  if (window.location.pathname === '/' ||
      (pathLang && !supportedLangs.includes(pathLang))) {

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

    // Only redirect if we're not already on the correct language
    if (pathLang !== finalLang) {
      window.location.replace(`/${finalLang}/`);
    }
  }
})();
