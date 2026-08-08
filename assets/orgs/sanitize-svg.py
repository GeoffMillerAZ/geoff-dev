#!/usr/bin/env python3
"""Strip anything from a third-party SVG that could execute or phone home.

These files get served from geoffmiller.cloud, so an SVG is not "just an image":
inline <script>, on* handlers, <foreignObject> and external href/url() refs are
all live code or live network from someone else's build pipeline. Removed here,
once, at install time — not trusted at render time.

Usage: sanitize_svg.py IN OUT
Exits non-zero and prints what it could not prove safe.
"""
import re
import sys

SCRIPTISH = re.compile(r"<\s*(script|foreignObject|iframe|audio|video|handler|set)\b.*?<\s*/\s*\1\s*>",
                       re.I | re.S)
SELF_CLOSING = re.compile(r"<\s*(script|foreignObject|iframe|handler|set)\b[^>]*/\s*>", re.I)
ON_ATTR = re.compile(r"\son[a-zA-Z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)", re.I)
# href / xlink:href that is not a same-document fragment.
EXT_HREF = re.compile(r"\s(?:xlink:)?href\s*=\s*(\"|')(?!#)([^\"']*)\1", re.I)
IMPORT = re.compile(r"@import[^;]*;", re.I)
EXT_URL = re.compile(r"url\(\s*['\"]?(?!#)(?:https?:|//|data:)[^)]*\)", re.I)
DOCTYPE = re.compile(r"<!DOCTYPE[^>]*>", re.I)
ENTITY = re.compile(r"<!ENTITY[^>]*>", re.I)


def sanitize(src: str) -> tuple[str, list[str]]:
    removed = []

    def note(what):
        removed.append(what)

    out = SCRIPTISH.sub(lambda m: (note("<%s> block" % m.group(1)), "")[1], src)
    out = SELF_CLOSING.sub(lambda m: (note("<%s/>" % m.group(1)), "")[1], out)
    out = ON_ATTR.sub(lambda m: (note("event handler %s" % m.group(0).split("=")[0].strip()), "")[1], out)
    out = EXT_HREF.sub(lambda m: (note("external href %s" % m.group(2)[:60]), "")[1], out)
    out = IMPORT.sub(lambda m: (note("@import"), "")[1], out)
    out = EXT_URL.sub(lambda m: (note("external url()"), "none")[1], out)
    out = DOCTYPE.sub("", out)
    out = ENTITY.sub("", out)
    return out, removed


def main():
    src_path, dst_path = sys.argv[1], sys.argv[2]
    with open(src_path, "r", encoding="utf-8", errors="strict") as fh:
        src = fh.read()
    out, removed = sanitize(src)

    # Prove it: re-scan the OUTPUT. If anything dangerous survived the regexes
    # (nested, obfuscated, whatever), fail loudly rather than ship it.
    leftovers = []
    for pat, label in ((re.compile(r"<\s*script", re.I), "<script"),
                       (ON_ATTR, "on* handler"),
                       (EXT_HREF, "external href"),
                       (EXT_URL, "external url()"),
                       (re.compile(r"javascript:", re.I), "javascript: URI")):
        if pat.search(out):
            leftovers.append(label)
    if leftovers:
        print("UNSAFE %s: %s" % (src_path, ", ".join(leftovers)), file=sys.stderr)
        sys.exit(1)

    with open(dst_path, "w", encoding="utf-8") as fh:
        fh.write(out)
    print("%s -> %s%s" % (src_path.split("/")[-1], dst_path.split("/")[-1],
                          ("  [stripped: %s]" % "; ".join(sorted(set(removed)))) if removed else "  [clean]"))


if __name__ == "__main__":
    main()
