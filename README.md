# Free Public APIs Directory (10,014 Verified Free APIs)

The ultimate, community-curated collection of **10,014 verified free public APIs and datasets**, categorized by authentication type and domain for software developers, autonomous AI agents, and side-project builders.

---

## ⚡ Key Highlights & Features

- **10,014 Verified Free APIs**: Built from major open-source repositories (`public-apis`, `freepublicapis`, `voxgig-sdk`, `Moviebox-API`, `SKDL`, `APIs.guru`, `free-for-dev`, `awesome-public-datasets`, and global open government registries).
- **Flagship Pinned Streaming APIs**: Reverse-engineered MovieBox endpoints, SKDL automated resolution pipeline, and top open social media downloaders (Cobalt, Snagbox, Instaloader, TikWM, AnyDownloader).
- **Client-Side High-Speed Caching**: `index.html` connects to `apis.json` and uses the browser's **IndexedDB** for instant caching (< 30ms loads on return visits without network overhead).
- **Typo-Tolerant (Fuzzy) Search**: Mistyped queries like `weatr`, `cripto`, `movibox`, or `pokmon` still match the correct APIs instantly.
- **AI Coding Agent Prompts**: One-click `Copy Prompt` on every API card to generate a structured, ready-to-run prompt for Antigravity, Cursor, Claude, ChatGPT, or GitHub Copilot.
- **Export Options**: Export all 10,014 APIs or your filtered search results into spreadsheet-ready CSV or raw JSON.

---

## 📊 Authentication Breakdown

| Group | Total APIs | Share | Description | Link |
|:---|:---:|:---:|:---|:---|
| **No Authentication** | **5,858** | **58.6%** | Open access immediately without sign-up or API keys | [Browse No Auth](No%20Authentication/README.md) |
| **API Key** | **3,738** | **37.4%** | Free or developer tier registration to obtain a token | [Browse API Key](API%20Key/README.md) |
| **OAuth** | **386** | **3.9%** | Standard user-delegated authorization flows (GitHub, Google, etc.) | [Browse OAuth](OAuth/README.md) |
| **Other Headers** | **22** | **0.2%** | Custom headers, User-Agent, or specific endpoints | [Browse Other](Other%20Headers/README.md) |

---

## 🚀 How to Use & Search

### 1. Interactive Web Explorer (`index.html`)
Open `index.html` in your web browser (or serve it with `python3 -m http.server 8080`).
- Instant search-as-you-type with typo tolerance.
- Filter tabs for No Auth, API Key, OAuth, and categories.
- Export your filtered results to a custom CSV file.
- Single-click `📋 Copy Prompt` to give to your AI coding agent.

### 2. Command-Line Search Utility (`search.py`)
Run quick queries directly from terminal:

```bash
cd ~/Desktop/PROJECTS/"free apis"

# Typo-tolerant keyword search
python3 search.py -k movibox
python3 search.py -k weatr --no-auth

# Filter by category and auth
python3 search.py -c Video --no-auth

# Generate an AI coding prompt for an API
python3 search.py --prompt "MovieBox REST API"

# Export filtered results to CSV
python3 search.py -k crypto --export crypto_apis.csv
```

### 3. Direct Data Files
- [**`apis.csv`**](apis.csv): Complete 10,014 API spreadsheet file.
- [**`apis.json`**](apis.json): Complete structured JSON array for programmatic querying.
