#!/usr/bin/env python3
"""Bundle the Daily Office into one HTML file for AirDrop / iPhone Safari."""
from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "DailyOffice.html"
ASSET_RE = re.compile(r"""(?P<q>['"])(?P<path>(?:\./)?assets/[^'"]+)(?P=q)""")


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix.lower() == ".svg":
        mime = "image/svg+xml"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def main() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    css = (ROOT / "css/app.css").read_text(encoding="utf-8")
    scripts = "\n".join(
        (ROOT / "js" / name).read_text(encoding="utf-8")
        for name in ("bible.js", "chapters.js", "catechism.js", "liturgy.js", "office.js", "app.js")
    )
    cross = ROOT / "assets/jerusalem-cross.svg"
    uri = data_uri(cross)
    html = html.replace('href="assets/jerusalem-cross.svg"', f'href="{uri}"')
    html = html.replace('src="assets/jerusalem-cross.svg"', f'src="{uri}"')
    css = css.replace('url("../assets/jerusalem-cross.svg")', f'url("{uri}")')
    html = re.sub(r'<link rel="stylesheet" href="css/app.css">\s*', "<style>\n" + css + "\n</style>\n", html, count=1)
    html = re.sub(r'<script src="js/[^"]+"></script>\s*', "", html)
    html = html.replace("</body>", "<script>\n" + scripts + "\n</script>\n</body>", 1)
    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({OUT.stat().st_size / 1e6:.2f} MB)")


if __name__ == "__main__":
    main()
