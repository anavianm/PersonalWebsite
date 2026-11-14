"""Builds assets/moop/manual.html (the website's copy of the MOOP language manual)
from the README.md on the Moop repo's language-manual branch.

Usage: python dev/build_manual.py path/to/Moop/README.md
"""
import os
import re
import sys

import markdown  # pip install markdown

src = open(sys.argv[1], encoding="utf-8").read()

# website tweaks: local image, names without email addresses, no repo-relative note
src = src.replace('src="documentation/moopert.png"', 'src="assets/moop/moopert.png"')
src = re.sub(r" \([a-z.]+@tufts\.edu\)", "", src)
src = re.sub(r"^> This is the language manual from .*\n", "", src, flags=re.M)

html = markdown.markdown(src, extensions=["tables", "fenced_code", "toc"])
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "moop", "manual.html")
open(out, "w", encoding="utf-8", newline="\n").write(html + "\n")
print(f"wrote {out} ({len(html)} bytes)")
