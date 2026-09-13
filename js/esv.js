window.ESV = (function () {
  const TOKEN_KEY = "daily-office-esv-token";
  const CACHE_KEY = "daily-office-esv-cache";

  function getToken() {
    return (localStorage.getItem(TOKEN_KEY) || "").trim();
  }
  function setToken(t) {
    localStorage.setItem(TOKEN_KEY, (t || "").trim());
  }
  function cache() {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); }
    catch { return {}; }
  }
  function saveCache(c) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch (_) {}
  }

  function queryUrl(q) {
    return "https://www.esv.org/" + encodeURIComponent(q.replace(/\s+/g, "+")) + "/";
  }

  async function text(q) {
    const store = cache();
    if (store[q]) return { ok: true, text: store[q] };
    const token = getToken();
    if (!token) return { ok: false, needKey: true };
    const params = new URLSearchParams({
      q,
      "include-passage-references": "false",
      "include-footnotes": "false",
      "include-footnote-body": "false",
      "include-headings": "false",
      "include-short-copyright": "false",
      "include-passage-horizontal-lines": "false",
      "include-heading-horizontal-lines": "false",
      "include-verse-numbers": "true"
    });
    try {
      const res = await fetch("https://api.esv.org/v3/passage/text/?" + params.toString(), {
        headers: { Authorization: "Token " + token }
      });
      if (!res.ok) return { ok: false, status: res.status };
      const data = await res.json();
      const passage = ((data.passages && data.passages[0]) || "").trim();
      if (!passage) return { ok: false, status: 204 };
      store[q] = passage;
      saveCache(store);
      return { ok: true, text: passage };
    } catch (err) {
      return { ok: false, cors: true, error: String(err) };
    }
  }

  return { getToken, setToken, text, queryUrl };
})();
