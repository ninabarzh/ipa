# PowerOn Site

A multilingual static website for the IPA Project — focused on digital safety, secure communications, and threat detection for survivors of intimate partner abuse (IPA). Built with [Hugo](https://gohugo.io/), using the [Docsy theme](https://www.docsy.dev/), and deployed via [Netlify](https://www.netlify.com/).

**Live site:** [https://poweron.tymyrddin.dev](https://poweron.tymyrddin.dev)

## Features

- Fully multilingual site structure (Hugo-native i18n)
- Offline-compatible, privacy-friendly search using [Lunr.js](https://lunrjs.com/)
- Per-language search indexes (`/en/index.json`, `/de/index.json`, etc.)
- No CDN dependencies (search libraries and stemmers are local)
- Netlify deployment with production build settings

## Requirements

- Hugo Extended v0.147.3  
- Node.js v22.16.0  
- Go v1.22.2  
- A working Netlify account (or use the CLI for local deploy preview)

## Setup

Clone the repository:

```bash
git clone https://github.com/ninabarzh/ipa.git
cd ipa
````

Install Node dependencies (if any front-end tooling is used):

```bash
npm install
```

Run the site locally:

```bash
hugo server
```

The site will be available at `http://localhost:1313`. Language-specific content lives under `/en/`, `/de/`, etc.

## Multilingual search

This repo includes a full offline search setup using Lunr.js:

* JavaScript files in `static/js/`:

  * `lunr.js`, plus `lunr.stemmer.support.js` and language stemmers (de, nl, tr, etc.)
  * `search-page.js` handles search input and rendering
  * `search-i18n.js` manages multilingual UI strings

* Search index templates in `layouts/index.json.json`

* Search result pages rendered at `/[lang]/search/`

* All HTML and JS assets are local; nothing loads from CDNs

## Deployment

This site is automatically deployed via Netlify to:

👉 **[https://poweron.tymyrddin.dev](https://poweron.tymyrddin.dev)**

If you’re deploying manually, build with:

```bash
hugo --environment production
```

This will output to the `public/` directory.

## Project layout

```
.
├── content/              # Per-language content
├── layouts/              # Custom templates and overrides
│   └── search.html       # Multilingual search results page
├── static/js/            # Lunr, stemmers, and custom search scripts
├── index.json.json       # Template for generating per-language search indexes
├── netlify.toml          # Netlify build config
└── config/_default/      # Hugo site config
```

## License

Content and code are open source. See [LICENSE](https://creativecommons.org/licenses/by/4.0/) for details.

## Notes

* Search in Turkish and Dutch may yield odd results due to linguistic quirks. Blame morphology, not the site.
* If it breaks in production, check your language subfolder structures, your search index rendering, and whether you’re accidentally loading both `search.js` *and* `search-page.js`. (Don’t.)

---

For updates, issues, or sarcastic commentary, open a PR or an issue.
