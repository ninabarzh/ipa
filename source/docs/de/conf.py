import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

project = 'IPA-Projekt (Deutsch)'
copyright = '2025, TyMyrddin'
author = 'TyMyrddin'
release = '0.1'

language = 'de'

extensions = [
    'myst_parser',
    'sphinx_immaterial',
]

templates_path = ['../../_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']
source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown'
}

html_theme = 'sphinx_immaterial'

html_theme_options = {
    "palette": {
        "scheme": "slate",
        "primary": "blue",
        "accent": "light-blue"
    },
    "features": [
        "navigation.top",
        "content.tabs.link",
    ],
}

html_title = "IPA-Projekt (Deutsch)"
html_logo = "../../img/logo.png"
html_favicon = "../../img/favicon.ico"
html_static_path = ['../../_static']
html_css_files = ['css/custom.css']
html_last_updated_fmt = '%Y-%m-%d %H:%M'
html_extra_path = ['../../_static/_headers']

nitpicky = True

autosectionlabel_prefix_document = False

html_context = {
    "default_mode": "light",
    "languages": [
        ("en", "/en/"),
        ("nl", "/nl/"),
        ("de", "/de/"),
        ("fr", "/fr/"),
        ("es", "/es/"),
        ("tr", "/tr/"),
    ],
}
