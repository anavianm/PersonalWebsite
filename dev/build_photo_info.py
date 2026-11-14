"""Builds assets/photos.json: camera details for the Photos viewer's Info panel.

Reads EXIF from the originals in Photographs/ (the web copies in photos/ have none).
Only camera settings are kept. Location (GPS) and names (Artist, Copyright, camera
owner, serial numbers, comments) are never read, and anything not in ALLOWED is
dropped before writing, overrides included.
Photos without EXIF can be filled in by hand in dev/photo_info_overrides.json,
e.g. {"photo_41": {"camera": "Nikon FM2", "film": "Kodak Portra 400"}}.

Usage: python dev/build_photo_info.py
"""
import glob
import json
import os
from fractions import Fraction

from PIL import Image  # pip install pillow

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXIF_IFD = 0x8769
TAG = {"Make": 0x010F, "Model": 0x0110, "LensModel": 0xA434, "FocalLength": 0x920A,
       "FocalLength35": 0xA405, "FNumber": 0x829D, "ExposureTime": 0x829A,
       "ISO": 0x8827, "DateTimeOriginal": 0x9003}
SCANNERS = ("Digital Link",)  # EXIF "camera" values that are really scanner software
# the only fields that may reach the public site
ALLOWED = ("camera", "lens", "film", "focal", "aperture", "shutter", "iso", "date")


def clean(s):
    return " ".join(str(s).replace("\x00", "").split())


def camera_name(make, model):
    make, model = clean(make or ""), clean(model or "")
    if model.upper().startswith(make.upper()):  # "PENTAX" + "PENTAX K-50" -> "Pentax K-50"
        make = ""
    name = f"{make} {model}".strip()
    return name.replace("PENTAX", "Pentax").replace("NIKON CORPORATION", "Nikon").replace("NIKON", "Nikon") \
               .replace("Canon Canon", "Canon").replace("SONY", "Sony").replace("FUJIFILM", "Fujifilm")


def shutter(t):
    t = float(t)
    if t >= 1:
        return f"{t:g} s"
    return f"1/{round(1 / t)} s"


def info_for(path):
    try:
        im = Image.open(path)
        exif = im.getexif()
    except OSError:
        return None
    if not exif:
        return None
    sub = exif.get_ifd(EXIF_IFD)
    get = lambda k: sub.get(TAG[k], exif.get(TAG[k]))
    model = get("Model")
    if not model:
        return None
    if any(s in clean(model) for s in SCANNERS):
        return {"camera": "Film (scanned)"}
    out = {"camera": camera_name(get("Make"), model)}
    if get("LensModel"):
        out["lens"] = clean(get("LensModel"))
    if get("FocalLength"):
        out["focal"] = f"{float(get('FocalLength')):.0f} mm"
        if get("FocalLength35") and int(get("FocalLength35")) != round(float(get("FocalLength"))):
            out["focal"] += f" ({int(get('FocalLength35'))} mm equiv.)"
    if get("FNumber"):
        out["aperture"] = f"f/{float(get('FNumber')):g}"
    if get("ExposureTime"):
        out["shutter"] = shutter(Fraction(str(get("ExposureTime"))))
    if get("ISO"):
        iso = get("ISO")
        out["iso"] = f"ISO {iso[0] if isinstance(iso, tuple) else iso}"
    if get("DateTimeOriginal"):
        d = clean(get("DateTimeOriginal"))[:10].replace(":", "-")
        if d[:4].isdigit() and d != "0000-00-00":
            out["date"] = d
    return out


def main():
    result = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "Photographs", "photo_*"))):
        name, ext = os.path.splitext(os.path.basename(path))
        if ext.lower() == ".png" and os.path.exists(path[:-4] + ".Tif"):
            continue  # the .Tif scan next to it carries the metadata
        info = info_for(path)
        if info and name not in result:
            result[name] = info
    overrides = os.path.join(ROOT, "dev", "photo_info_overrides.json")
    if os.path.exists(overrides):
        for name, extra in json.load(open(overrides, encoding="utf-8")).items():
            result.setdefault(name, {}).update(extra)
    result = {name: {k: v for k, v in info.items() if k in ALLOWED} for name, info in result.items()}
    out = os.path.join(ROOT, "assets", "photos.json")
    json.dump(dict(sorted(result.items())), open(out, "w", encoding="utf-8", newline="\n"), indent=1)
    print(f"wrote {out}: {len(result)} photos with camera info")


if __name__ == "__main__":
    main()
