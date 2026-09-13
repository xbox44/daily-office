#!/usr/bin/env python3
"""Build BSB subset + catechism for the Daily Office app."""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from wsc import WSC

ROOT = Path(__file__).resolve().parents[1]
RAW = json.loads((ROOT / "data/bsb.json").read_text(encoding="utf-8-sig"))

NAME_MAP = {
    "I Samuel": "1 Samuel",
    "II Samuel": "2 Samuel",
    "I Kings": "1 Kings",
    "II Kings": "2 Kings",
    "I Chronicles": "1 Chronicles",
    "II Chronicles": "2 Chronicles",
    "I Corinthians": "1 Corinthians",
    "II Corinthians": "2 Corinthians",
    "I Thessalonians": "1 Thessalonians",
    "II Thessalonians": "2 Thessalonians",
    "I Timothy": "1 Timothy",
    "II Timothy": "2 Timothy",
    "I Peter": "1 Peter",
    "II Peter": "2 Peter",
    "I John": "1 John",
    "II John": "2 John",
    "III John": "3 John",
    "Revelation of John": "Revelation",
}

KEEP = {
    "Genesis", "Exodus", "Deuteronomy", "Joshua", "Ruth",
    "1 Samuel", "2 Samuel", "Psalms", "Proverbs", "Ecclesiastes",
    "Isaiah", "Daniel", "Hosea", "Joel", "Jonah", "Micah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation",
}

bible = {}
for book in RAW["books"]:
    name = NAME_MAP.get(book["name"], book["name"])
    if name not in KEEP:
        continue
    chapters = []
    for ch in book["chapters"]:
        verses = [v["text"].strip() for v in sorted(ch["verses"], key=lambda x: x["verse"])]
        chapters.append(verses)
    bible[name] = chapters

(ROOT / "js/bible.js").write_text(
    "window.BIBLE = " + json.dumps(bible, ensure_ascii=False, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)
counts = {name: [len(ch) for ch in chs] for name, chs in bible.items()}
(ROOT / "js/chapters.js").write_text(
    "window.CHAPTERS = " + json.dumps(counts, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)
payload = [{"n": i + 1, "q": q, "a": a} for i, (q, a) in enumerate(WSC)]
(ROOT / "js/catechism.js").write_text(
    "window.WSC = " + json.dumps(payload, ensure_ascii=False) + ";\n",
    encoding="utf-8",
)
print("bible.js", round((ROOT / "js/bible.js").stat().st_size / 1e6, 2), "MB", "books", len(bible))
print("chapters.js", (ROOT / "js/chapters.js").stat().st_size)
print("catechism.js", len(payload))
