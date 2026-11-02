# Free Public APIs Directory

A community-curated collection of free public APIs and datasets for developers, AI agents, and anyone building software.

![Free Public APIs Directory Preview](og-image.png)

## Features

- **Large API Collection:** Thousands of APIs across different categories and domains.
- **Authentication Filters:** Browse APIs by No Authentication, API Key, OAuth, and other authentication methods.
- **Smart Search:** Typo-tolerant search to help you find APIs even when your query contains mistakes.
- **AI Agent Prompts:** Generate and copy ready-to-use prompts for AI coding assistants.
- **Export:** Download API collections and filtered results as CSV or JSON.
- **Local Caching:** Uses IndexedDB to cache API data for faster subsequent visits.

## Authentication Categories

| Authentication | APIs |
|---|---:|
| No Authentication | 5,858 |
| API Key | 3,738 |
| OAuth | 386 |
| Other Headers | 22 |
| **Total** | **10,014** |

## Getting Started

### Web Explorer

Open `index.html` in your browser or start a local server:

```bash
python3 -m http.server 8080
```

### Command-Line Search

Use `search.py` to search and filter APIs directly from your terminal.

```bash
# Search APIs
python3 search.py -k movibox

# Search APIs without authentication
python3 search.py -k weatr --no-auth

# Filter by category
python3 search.py -c Video --no-auth

# Generate an AI coding prompt
python3 search.py --prompt "MovieBox REST API"

# Export results to CSV
python3 search.py -k crypto --export crypto_apis.csv
```

## Data Files

- `apis.json` - Complete structured API collection.
- `apis.csv` - Spreadsheet-friendly API collection.
- `index.html` - Interactive web explorer.
- `search.py` - Command-line search utility.
- `og-image.png` - Repository preview image.

## Contributing

Contributions, corrections, and new API submissions are welcome. Help keep the collection accurate and useful for the developer community.

## License

See the repository's license for usage and distribution terms.