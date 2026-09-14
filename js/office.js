window.Office = (function () {
  const NT_BOOKS = [
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation"
  ];
  const OT_BOOKS = [
    "Genesis", "Exodus", "Deuteronomy", "Joshua", "Ruth",
    "1 Samuel", "2 Samuel", "Isaiah", "Daniel", "Hosea",
    "Jonah", "Micah", "Malachi", "Ecclesiastes"
  ];
  const GOSPELS = ["Matthew", "Mark", "Luke", "John"];

  function walk(books) {
    const out = [];
    books.forEach((name) => {
      const n = (CHAPTERS[name] || []).length;
      for (let c = 1; c <= n; c++) out.push([name, c]);
    });
    return out;
  }

  const OT_WALK = walk(OT_BOOKS);
  const NT_WALK = walk(NT_BOOKS);
  const GOSPEL_WALK = walk(GOSPELS);

  function kindFromDate(d) {
    const h = d.getHours() + d.getMinutes() / 60;
    if (h >= 4 && h < 11.5) return "morning";
    if (h >= 11.5 && h < 16.5) return "noon";
    return "evening";
  }

  function passage(book, ch, maxV, startAt) {
    const chapter = (BIBLE[book] && BIBLE[book][ch - 1]) || [];
    const total = chapter.length || ((CHAPTERS[book] && CHAPTERS[book][ch - 1]) || 1);
    let start = startAt || 1;
    let end = total;
    if (book === "Psalms" && ch === 119 && !startAt) {
      const block = 16;
      const idx = ((maxV || 0) % 11) * block;
      start = idx + 1;
      end = Math.min(total, start + block - 1);
    } else if (maxV) {
      end = Math.min(total, start + maxV - 1);
    }
    const lines = chapter.slice(start - 1, end).map((t, i) => ({ n: start + i, t }));
    return { book, ch, start, end, total, lines };
  }

  function lookup(ref) {
    const s = String(ref).replace(/–/g, "-");
    const m = s.match(/^(.+?)\s+(\d+)(?::(\d+)(?:-(\d+))?)?$/);
    if (!m) return passage("Psalms", 1, 8);
    let book = m[1];
    if (book === "Psalm") book = "Psalms";
    const ch = Number(m[2]);
    const start = m[3] ? Number(m[3]) : 1;
    const end = m[4] ? Number(m[4]) : (m[3] ? Number(m[3]) : 0);
    const max = end ? end - start + 1 : 12;
    return passage(book, ch, max, start);
  }

  function psalmFor(doy, office) {
    let n;
    if (office === "morning") n = (doy % 150) + 1;
    else if (office === "noon") n = ((doy + 50) % 150) + 1;
    else n = ((doy + 100) % 150) + 1;
    const maxV = n === 119 ? doy : office === "noon" ? 8 : 16;
    return passage("Psalms", n, maxV);
  }

  function formatRef(p) {
    const book = p.book === "Psalms" ? "Psalm" : p.book;
    if (p.start === 1 && p.end === p.total) return book + " " + p.ch;
    return book + " " + p.ch + ":" + p.start + "-" + p.end;
  }

  function assemble(date, office) {
    const L = LITURGY;
    const doy = L.dayOfYear(date);
    const season = L.getSeason(date);
    const sentence = L.sentenceFor(date, office);
    const collect = L.collectFor(date);
    const wsc = WSC[doy % WSC.length];
    const intercession = L.INTERCESSIONS[doy % L.INTERCESSIONS.length];
    const psalm = psalmFor(doy, office);
    const ot = passage(OT_WALK[doy % OT_WALK.length][0], OT_WALK[doy % OT_WALK.length][1], 12);
    const gospel = passage(GOSPEL_WALK[doy % GOSPEL_WALK.length][0], GOSPEL_WALK[doy % GOSPEL_WALK.length][1], 12);
    const nt = passage(NT_WALK[doy % NT_WALK.length][0], NT_WALK[doy % NT_WALK.length][1], 12);
    const provCh = (date.getDate() - 1) % 31 + 1;
    const proverb = passage("Proverbs", provCh, 8);
    const sunday = date.getDay() === 0;

    const labels = { morning: "Morning Prayer", noon: "Midday Prayer", evening: "Evening Prayer" };
    const sources = {
      morning: "Order after the 1662 Book of Common Prayer, with the Middelburg votum (the vow) and confession (1586), and a daily question from the Westminster Shorter Catechism (1647).",
      noon: "A brief hour after the Reformed little hours: Scripture, the Lord's Prayer, and catechism — suited to the middle of labour.",
      evening: "Evening Prayer after the 1662 book, with Nunc dimittis (Now you dismiss), the Collect (gathered prayer) for Aid against Perils, and Westminster catechizing."
    };

    const sections = [];
    function add(title, rubric, body, extra) {
      sections.push(Object.assign({ title, rubric, body }, extra || {}));
    }

    add("Opening sentence", sentence.ref + " · BSB", null, { passage: lookup(sentence.ref) });
    add("Votum (the vow)", "Middelburg Liturgy, 1586 · Psalm 124:8 · BSB", null, { passage: lookup("Psalm 124:8") });

    if (office !== "noon") {
      add("Invitation", "Book of Common Prayer, 1662", L.BCP_EXHORTATION);
      add("Confession", office === "evening" ? "A prayer of the English church at Middelburg" : "General Confession, 1662",
        office === "evening" ? L.MIDDELBURG_CONFESSION : L.BCP_CONFESSION);
      add("Prayer for pardon", "Said in private as a prayer for mercy", L.PARDON);
    }

    add("The Lord's Prayer", "As Christ taught us", L.LORDS_PRAYER);
    add("Prayer for illumination", "Middelburg / Genevan form", L.ILLUMINATION);
    add("Psalm", formatRef(psalm) + " · BSB", null, { passage: psalm });

    if (office === "morning") {
      add("Old Testament", formatRef(ot) + " · BSB", null, { passage: ot });
      add("New Testament", formatRef(gospel) + " · BSB", null, { passage: gospel });
      add("The Apostles' Creed", "The faith of the Church", L.APOSTLES_CREED);
      add("Collect of the season (gathered prayer)", season.label, collect);
      add("Collect for Grace (gathered prayer)", "Morning Prayer, 1662", L.COLLECT_GRACE);
    } else if (office === "noon") {
      add("A lesson from Proverbs", formatRef(proverb) + " · BSB", null, { passage: proverb });
      add("A lesson from the New Testament", formatRef(nt) + " · BSB", null, { passage: nt });
      add("Collect of the season (gathered prayer)", season.label, collect);
      add("Collect at midday (gathered prayer)", "A brief hour", L.COLLECT_NOON);
    } else {
      add("New Testament", formatRef(nt) + " · BSB", null, { passage: nt });
      add("Nunc dimittis (Now you dismiss)", "Luke 2:29-32 · Evening Prayer · BSB", null, { passage: lookup("Luke 2:29-32") });
      add("The Apostles' Creed", "The faith of the Church", L.APOSTLES_CREED);
      add("Collect of the season (gathered prayer)", season.label, collect);
      add("Collect for Aid against all Perils (gathered prayer)", "Evening Prayer, 1662", L.COLLECT_PERILS);
    }

    add("Westminster Shorter Catechism", "Question " + wsc.n + " of 107", "Q. " + wsc.q, { answer: "A. " + wsc.a });
    if (sunday && office === "morning") {
      add("Heidelberg Catechism", "Lord's Day 1 · a Reformed comfort for the Lord's Day",
        "Q. " + L.HEIDELBERG_1.q, { answer: "A. " + L.HEIDELBERG_1.a });
    }
    add("Prayer for the Church", "A daily intercession, in the spirit of the Westminster Directory", intercession + " Through Jesus Christ our Lord. Amen.");
    if (office !== "noon") add("General Thanksgiving", "Book of Common Prayer", L.THANKS);
    add("Blessing", (office === "morning" ? "Numbers 6:24-26" : "2 Corinthians 13:14") + " · BSB",
      office === "morning"
        ? "May the LORD bless you and keep you; may the LORD cause His face to shine upon you and be gracious to you; may the LORD lift up His countenance toward you and give you peace."
        : "The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with all of you.");

    return {
      office,
      title: labels[office],
      source: sources[office],
      season,
      date,
      doy,
      sections,
      counts: { ot: OT_WALK.length, nt: NT_WALK.length, psalms: 150, catechism: 107 }
    };
  }

  return { kindFromDate, assemble, formatRef };
})();
