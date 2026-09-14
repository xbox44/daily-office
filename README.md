# The Daily Office

A household prayer book for morning, midday, and evening — 365 days, three offices each day. The phone clock chooses the hour. You may still open any office by hand.

## What it draws on

- **1662 Book of Common Prayer** — invitation, general confession, collects (gathered prayers), canticles, Apostles’ Creed, Lord’s Prayer, thanksgiving
- **Middelburg Liturgy (1586)** — votum (the vow; Psalm 124:8), confession, prayer for illumination
- **Westminster Shorter Catechism (1647)** — one question each office, cycling all 107 through the year
- **Heidelberg Catechism** — Lord’s Day 1 on Sunday mornings
- **Berean Standard Bible (BSB)** — public-domain modern English (dedicated 30 April 2023); bundled so the phone copy works offline

This is private devotion. It does not replace the gathered church.

## On your phone

Open this in **Safari** (not Chrome):

**https://xbox44.github.io/daily-office/**

Then Share → **Add to Home Screen**. Name it Daily Office. The first load pulls about 2 MB of scripture; Safari caches it after that. “I have kept this office” stays on that phone.

The repo is public. The live site is on the open web.

## Run it locally

```bash
cd daily-office
python3 -m http.server 8766
```

Open [http://localhost:8766](http://localhost:8766).

Hours (local time on the device):

- **Morning** 4:00–11:29
- **Midday** 11:30–16:29
- **Evening** 16:30–3:59

Rebuild scripture or a one-file AirDrop copy after content changes:

```bash
python3 tools/build_data.py
python3 tools/build_standalone.py
```

## Scripture

Readings are the **Berean Standard Bible**, public domain. `tools/build_data.py` reads `data/bsb.json` and writes `js/bible.js`. No API key is needed; the phone copy works offline.
