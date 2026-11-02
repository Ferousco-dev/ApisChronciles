#!/usr/bin/env python3
"""
CLI search and filter tool for the Free APIs Directory (10,004+ APIs).

Features:
- Typo-tolerant / fuzzy search
- Filter by category, authentication group, HTTPS, CORS
- Export filtered search results directly to CSV or JSON
- Copy AI prompt for coding assistant

Examples:
    python3 search.py -k weather
    python3 search.py -k movibox          # Typo-tolerant search
    python3 search.py --no-auth -c Animals
    python3 search.py --export results.csv -k crypto
    python3 search.py --prompt "MovieBox REST API"
"""

import argparse
import json
import csv
import os
import sys

def levenshtein(s1, s2):
    if len(s1) < len(s2):
        return levenshtein(s2, s1)
    if len(s2) == 0:
        return len(s1)
    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row
    return previous_row[-1]

def score_and_rank(apis, query):
    if not query:
        return apis
    raw = query.strip().lower()
    tokens = [t for t in raw.split() if t]
    if not tokens:
        return apis

    scored = []
    for api in apis:
        name = (api.get("name") or "").lower()
        cat = (api.get("category") or "").lower()
        desc = (api.get("description") or "").lower()

        name_words = name.split()
        cat_words = cat.split()

        score = 0
        all_tokens_matched = True

        if name == raw:
            score += 2000
        elif name.startswith(raw):
            score += 1200
        elif raw in name:
            score += 700
        elif cat == raw:
            score += 500
        elif raw in cat:
            score += 250
        elif raw in desc:
            score += 120

        for tok in tokens:
            tok_matched = False
            if tok in name_words:
                score += 350
                tok_matched = True
            elif any(w.startswith(tok) for w in name_words):
                score += 200
                tok_matched = True
            elif tok in name:
                score += 150
                tok_matched = True

            if tok in cat_words:
                score += 100
                tok_matched = True
            elif tok in cat:
                score += 60
                tok_matched = True

            if tok in desc:
                score += 30
                tok_matched = True

            if not tok_matched and len(tok) >= 4:
                for w in name_words:
                    if len(w) >= 3 and abs(len(w) - len(tok)) <= 1 and levenshtein(tok, w) <= 1:
                        score += 70
                        tok_matched = True
                        break
                if not tok_matched:
                    for w in cat_words:
                        if len(w) >= 3 and abs(len(w) - len(tok)) <= 1 and levenshtein(tok, w) <= 1:
                            score += 40
                            tok_matched = True
                            break

            if not tok_matched:
                all_tokens_matched = False
                break

        if all_tokens_matched and score > 0:
            if "moviebox" in name or "freepublicapis" in name:
                score += 25
            scored.append((score, api))

    scored.sort(key=lambda x: -x[0])
    return [item[1] for item in scored]

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "apis.json")

    if not os.path.exists(json_path):
        print(f"Error: Could not find dataset at {json_path}")
        sys.exit(1)

    with open(json_path, "r", encoding="utf-8") as f:
        apis = json.load(f)

    parser = argparse.ArgumentParser(description="Free Public APIs Search Tool (10,004 APIs)")
    parser.add_argument("-k", "--keyword", help="Search keyword across name and description (typo-tolerant)", type=str)
    parser.add_argument("-c", "--category", help="Filter by category", type=str)
    parser.add_argument("-a", "--auth", choices=["No Authentication", "API Key", "OAuth", "Other Headers"], help="Filter by auth group")
    parser.add_argument("--no-auth", action="store_true", help="Only show 'No Authentication' APIs")
    parser.add_argument("--api-key", action="store_true", help="Only show 'API Key' APIs")
    parser.add_argument("--oauth", action="store_true", help="Only show 'OAuth' APIs")
    parser.add_argument("--cors", action="store_true", help="Only show APIs with CORS support (Yes)")
    parser.add_argument("--https-only", action="store_true", help="Only show APIs with HTTPS")
    parser.add_argument("--list-categories", action="store_true", help="List all categories with API counts")
    parser.add_argument("--export", type=str, help="Export matching results to file (.csv or .json)")
    parser.add_argument("--prompt", type=str, help="Generate AI coding agent prompt for specified API name")
    parser.add_argument("--limit", type=int, default=50, help="Max results to display (default: 50)")

    args = parser.parse_args()

    if args.list_categories:
        from collections import Counter
        cat_counts = Counter(a["category"] for a in apis)
        print(f"\nTotal Categories: {len(cat_counts)} (Total APIs: {len(apis):,})\n")
        print(f"{'Category':<35} | {'Count':<6}")
        print("-" * 44)
        for cat, cnt in sorted(cat_counts.items(), key=lambda x: -x[1]):
            print(f"{cat:<35} | {cnt:<6,}")
        return

    if args.prompt:
        target = args.prompt.lower()
        found = [a for a in apis if target in a["name"].lower()]
        if not found:
            print(f"API matching '{args.prompt}' not found.")
            return
        api = found[0]
        print("\n" + "="*60)
        print("AI Coding Agent Prompt (Copy & Paste):")
        print("="*60)
        print(f"""Use the {api['name']} API ({api['url']}) to build a feature.
Category: {api['category']}
Authentication: {api.get('auth', 'No key needed')}
HTTPS: {api['https']} | CORS: {api['cors']}
Description: {api['description']}

Task:
1. Write a clean integration in JavaScript/TypeScript (or Python).
2. Show how to make requests, handle errors/rate limits, and parse responses.
3. Provide a practical working example demonstrating data display.
""")
        print("="*60)
        return

    results = apis

    if args.no_auth:
        results = [a for a in results if a.get("auth_group") == "No Authentication"]
    elif args.api_key:
        results = [a for a in results if a.get("auth_group") == "API Key"]
    elif args.oauth:
        results = [a for a in results if a.get("auth_group") == "OAuth"]
    elif args.auth:
        results = [a for a in results if a.get("auth_group") == args.auth]

    if args.category:
        cq = args.category.lower()
        results = [a for a in results if cq in a["category"].lower()]

    if args.keyword:
        results = score_and_rank(results, args.keyword)

    if args.cors:
        results = [a for a in results if str(a.get("cors", "")).lower() == "yes"]

    if args.https_only:
        results = [a for a in results if str(a.get("https", "")).lower() == "yes"]

    if args.export:
        exp_path = args.export
        if exp_path.endswith(".json"):
            with open(exp_path, "w", encoding="utf-8") as f:
                json.dump(results, f, indent=2, ensure_ascii=False)
        else:
            with open(exp_path, "w", encoding="utf-8", newline="") as f:
                fieldnames = ["auth_group", "category", "name", "url", "description", "auth", "https", "cors"]
                writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
                writer.writeheader()
                writer.writerows(results)
        print(f"\nExported {len(results):,} APIs to {exp_path} successfully!")
        return

    print(f"\nFound {len(results):,} matching API(s)" + (f" (displaying top {args.limit}):\n" if len(results) > args.limit else ":\n"))

    for i, a in enumerate(results[:args.limit], 1):
        print(f"{i}. {a['name']}  [{a['category']}]")
        print(f"   Group:       {a.get('auth_group', 'N/A')} ({a.get('auth', 'No')})")
        print(f"   URL:         {a['url']}")
        print(f"   Description: {a['description']}")
        print(f"   HTTPS: {a['https']} | CORS: {a['cors']}")
        print()

if __name__ == "__main__":
    main()
