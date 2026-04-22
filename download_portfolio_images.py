import os
import sys
import requests
from urllib.parse import urlparse
from pathlib import Path
from collections import Counter

BASE = "https://jasonwidjaja.weebly.com"
UP = "/uploads/1/4/7/6/147605262"

IMAGES = [
    # HOME
    f"{UP}/published/screenshot-2024-12-24-012357.png",

    # EXTRACURRICULARS PAGE
    f"{UP}/published/bourbot.png",
    f"{UP}/published/hammer.jpg",
    f"{UP}/published/hammer2.jpg",
    f"{UP}/published/thumbnail-img-3388.jpg",
    f"{UP}/screenshot-2025-02-01-182356_orig.png",
    f"{UP}/published/screenshot-2024-12-24-122014.png",
    f"{UP}/published/screenshot-2024-05-05-233601.png",
    f"{UP}/published/screenshot-2024-01-21-163135.png",
    f"{UP}/published/screenshot-2024-01-21-163040.png",
    f"{UP}/editor/original.png",
    f"{UP}/published/img-8805.jpg",
    f"{UP}/screenshot-2024-12-24-120029_orig.png",
    f"{UP}/2022-big-idea-challenge-theme-1024x355_orig.png",
    f"{UP}/published/screenshot-2024-01-21-172643.png",
    f"{UP}/editor/ner.png",
    f"{UP}/published/screenshot-2023-11-05-013408.png",

    # WORK EXPERIENCE PAGE
    f"{UP}/published/ot-logo-bg.png",
    f"{UP}/published/download.png",
    f"{UP}/editor/images.png",

    # OFF DUTY ADVENTURES
    f"{UP}/editor/436514984-1505891307020408-8002921743487547005-n.png",
    f"{UP}/editor/img-5365.gif",
    f"{UP}/published/dsc5236.jpg",

    # BOURBOT
    f"{UP}/published/barrel-1.gif",
    f"{UP}/editor/img-8672-720.jpg",
    f"{UP}/editor/circle.gif",
    f"{UP}/full-barrel-rolling_orig.gif",
    f"{UP}/clocking_orig.gif",
    f"{UP}/lifting-mechanism-front-view-online-video-cutter_orig.gif",
    f"{UP}/img-7658_orig.gif",
    f"{UP}/published/screenshot-2025-05-19-004650.png",
    f"{UP}/published/img-9793-online-video-cutter-com.gif",
    f"{UP}/published/screenshot-2025-07-03-004616.png",
    f"{UP}/published/screenshot-2025-07-03-004803.png",
    f"{UP}/published/screenshot-2025-07-03-004839.png",

    # GENERAL PURPOSE HAMMER
    f"{UP}/published/hammergif.gif",
    f"{UP}/published/hammer-cad.png",

    # ROBOTIC HAND
    f"{UP}/thumbnail-img-3388_orig.jpg",
    f"{UP}/published/robot-hand1.jpg",
    f"{UP}/published/robot-hand2.jpg",
    f"{UP}/published/thumbnail-image0.jpg",
    f"{UP}/published/thumbnail-image1.jpg",
    f"{UP}/thumbnail-image2_orig.jpg",
    # Gallery _orig attempts
    f"{UP}/thumbnail-image0_orig.jpg",
    f"{UP}/thumbnail-image1_orig.jpg",

    # FITOLUX
    f"{UP}/published/screenshot-2024-12-23-193302.png",
    f"{UP}/editor/screenshot-2024-12-24-010324.png",
    f"{UP}/editor/screenshot-2024-12-25-200420.png",
    f"{UP}/editor/screenshot-2024-12-25-005133.png",
    f"{UP}/published/screenshot-2024-12-25-200436.png",
    f"{UP}/published/screenshot-2024-12-23-234103.png",
    f"{UP}/published/screenshot-2024-12-23-234817.png",
    f"{UP}/editor/sweeper-mechanism.gif",
    f"{UP}/published/fitolux-countertop-ezgif-com-crop-1.gif",
    f"{UP}/published/fitlolux-portable-clip.gif",
    f"{UP}/published/thumbnail-image4.jpg",
    f"{UP}/published/thumbnail-image6.jpg",
    f"{UP}/published/thumbnail-image7.jpg",
    f"{UP}/published/thumbnail-image8.jpg",
    # Gallery _orig attempts
    f"{UP}/thumbnail-image4_orig.jpg",
    f"{UP}/thumbnail-image5_orig.jpg",
    f"{UP}/thumbnail-image6_orig.jpg",
    f"{UP}/thumbnail-image7_orig.jpg",
    f"{UP}/thumbnail-image8_orig.jpg",

    # C-STAR
    f"{UP}/editor/screenshot-2024-12-24-010605.png",
    f"{UP}/published/cstar-08.jpg",
    f"{UP}/screenshot-2024-05-05-234133_orig.png",
    f"{UP}/published/screenshot-2024-12-23-204111.png",
    f"{UP}/editor/screenshot-2024-01-30-005326.png",
    f"{UP}/published/screenshot-2024-12-23-200721.png",
    f"{UP}/cstar-13_orig.jpg",
    f"{UP}/published/soundermechanism-10-1.gif",
    f"{UP}/published/screenshot-2024-12-23-203621.png",

    # WAVEWISE
    f"{UP}/editor/screenshot-2024-01-21-163135.png",
    f"{UP}/screenshot-2024-01-21-162635_orig.png",
    f"{UP}/published/screenshot-2024-01-21-164135.png",

    # BRAILLEFORGE
    f"{UP}/editor/screenshot-2023-11-05-015117.png",
    f"{UP}/published/img-7243.jpeg",
    f"{UP}/full-assembly-cad-2_orig.png",

    # AUTOMATIC GOLF TEE
    f"{UP}/editor/img-6961-mov-adobeexpress.gif",
    f"{UP}/published/screenshot-2024-01-21-171844.png",
    f"{UP}/screenshot-2024-01-21-171918_orig.png",

    # NASA BIG IDEA CHALLENGE 2022
    f"{UP}/published/2022-big-idea-challenge-theme-768x266.png",
    f"{UP}/screenshot-2025-05-25-013343_orig.png",
    f"{UP}/published/screenshot-2023-11-05-000419.png",
    f"{UP}/northeastern-cobra-highlights_orig.gif",
    f"{UP}/screenshot-2024-01-21-173004_orig.png",
    f"{UP}/published/screenshot-2024-01-21-172942.png",
    f"{UP}/published/screenshot-2024-01-21-172919.png",
    f"{UP}/published/screenshot-2024-01-21-174042.png",

    # NORTHEASTERN ELECTRIC RACING
    f"{UP}/ner_orig.png",
    f"{UP}/screenshot-2023-11-05-013320_orig.png",
    f"{UP}/screenshot-2023-11-05-013350-orig_orig.png",
    f"{UP}/screenshot-2023-03-12-155740-orig_orig.png",

    # MINI PROJECTS
    f"{UP}/published/simulation-motor.png",
    f"{UP}/simulated_orig.png",
    f"{UP}/simulink-motor_orig.png",
    f"{UP}/hardware_orig.png",
    f"{UP}/editor/whisk.png",
    f"{UP}/published/whisk.gif",
    f"{UP}/screenshot-2024-12-27-013053_orig.png",
    f"{UP}/editor/screenshot-2024-02-21-084246.png",
    f"{UP}/editor/screenshot-2024-02-21-084734.png",
    f"{UP}/projecta2simulink_orig.gif",
    f"{UP}/published/screenshot-2024-05-05-231355.png",
    f"{UP}/editor/front-view-joradn-access-cad.png",
    f"{UP}/editor/jordan-access-1-right-view-cad.png",
    f"{UP}/screenshot-2023-11-05-010357-orig_orig.png",
    f"{UP}/published/singapore.gif",

    # BERKSHIRE GREY
    f"{UP}/bgsquad_orig.jpg",
    f"{UP}/published/fedex-dims-brightspotgocdn.webp",
    f"{UP}/published/sideviewdrivetrain.png",
    f"{UP}/editor/old-transfer-drivetrain-redesign.png",
    f"{UP}/published/new-trans-module-drivetrain.png",
    f"{UP}/published/picture1-ezgif-com-optimize.gif",
    f"{UP}/frontviewdrivetrain_orig.png",
    f"{UP}/published/billericadrivetrain.png",
    f"{UP}/editor/whaletail.png",
    f"{UP}/picture8-ezgif-com-crop_orig.gif",
    f"{UP}/published/picture6.gif",
    f"{UP}/package-counter-midd1_orig.png",
    f"{UP}/published/picture2.png",
    f"{UP}/packagecountermount2_orig.png",
    f"{UP}/published/conveyor-incl.png",
    f"{UP}/picture9_orig.gif",
    f"{UP}/pli-loading-interface_orig.png",
    f"{UP}/first-iteration-pli_orig.png",
    f"{UP}/v2-pli_orig.png",
    f"{UP}/fullramp_orig.png",
    f"{UP}/gerry-ramp_orig.png",
    f"{UP}/published/nc-button.png",
    f"{UP}/center-gap_orig.png",
    f"{UP}/published/guarding.png",
    f"{UP}/published/hmi-back-cover.png",
    f"{UP}/wing-commission_orig.png",
    f"{UP}/published/test-fixture-4.png",
    f"{UP}/picture8_orig.gif",
    f"{UP}/mini-scoop-models_orig.png",
    f"{UP}/vinylstickerdesign_orig.png",

    # DRAPER (uses uploads subdomain)
    "https://uploads.weebly.com/1/4/7/6/147605262/published/screenshot-2025-03-25-143254.png",
    "https://uploads.weebly.com/1/4/7/6/147605262/published/drawing-tree-template.webp",
    "https://uploads.weebly.com/1/4/7/6/147605262/published/screenshot-2025-03-25-145500.png",
    "https://uploads.weebly.com/1/4/7/6/147605262/published/screenshot-2025-03-25-145914.png",

    # AMAZON ROBOTICS
    f"{UP}/image-1_orig.jpg",
    f"{UP}/editor/img-0436-1.jpg",
    f"{UP}/published/screenshot-2024-01-23-003333.png",
    f"{UP}/published/screenshot-2023-12-25-003235.png",
    f"{UP}/published/thumbnail-597b7f92-5da0-43cc-89e9-1f9362fbf00e.jpg",
    f"{UP}/screenshot-2024-03-09-220401_orig.png",
    f"{UP}/published/screenshot-2023-12-25-144649.png",
    f"{UP}/editor/screenshot-2023-12-25-175121.png",
    f"{UP}/editor/20231109-135637-1.gif",
    f"{UP}/published/istockphoto-1171544923-612x612.jpg",
    f"{UP}/editor/screenshot-2023-12-25-180054.png",
    # Gallery _orig attempt
    f"{UP}/thumbnail-597b7f92-5da0-43cc-89e9-1f9362fbf00e_orig.jpg",
]

output_dir = Path(r"C:\Users\jason\Engineering Portfolio\portfolio_images")
output_dir.mkdir(exist_ok=True)

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
})

# Build full URLs and deduplicate by path
seen_paths = set()
unique_urls = []
for img in IMAGES:
    url = img if img.startswith("http") else BASE + img
    path = urlparse(url).path
    if path not in seen_paths:
        seen_paths.add(path)
        unique_urls.append(url)

print(f"Total unique image URLs: {len(unique_urls)}\n")

# Detect basename conflicts so we can disambiguate
basenames = [Path(urlparse(u).path).name for u in unique_urls]
name_count = Counter(basenames)
conflict_tracker = {name: 0 for name, count in name_count.items() if count > 1}

ok = skip = fail = 0

for url in unique_urls:
    path = urlparse(url).path
    basename = Path(path).name

    if basename in conflict_tracker:
        conflict_tracker[basename] += 1
        stem, ext = Path(basename).stem, Path(basename).suffix
        # Use directory hint (pub/edit/root) to disambiguate
        parts = path.split("/")
        folder = parts[-2] if len(parts) >= 2 else "root"
        abbrev = {"published": "pub", "editor": "edit"}.get(folder, folder[:4])
        filename = f"{stem}__{abbrev}{ext}"
    else:
        filename = basename

    filepath = output_dir / filename

    if filepath.exists():
        print(f"  [exists]  {filename}")
        skip += 1
        continue

    try:
        r = session.get(url, timeout=30)
        if r.status_code == 200:
            filepath.write_bytes(r.content)
            kb = len(r.content) // 1024
            print(f"  [OK {kb:>4}KB]  {filename}")
            ok += 1
        elif r.status_code == 404:
            print(f"  [404]     {filename}")
            fail += 1
        else:
            print(f"  [{r.status_code}]     {filename}")
            fail += 1
    except Exception as e:
        print(f"  [ERROR]   {filename}: {e}")
        fail += 1

print(f"\nDone: {ok} downloaded, {skip} skipped (existed), {fail} failed/missing")
