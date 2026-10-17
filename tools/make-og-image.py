#!/usr/bin/env python3
"""Generate 1200x630 OG card for just-the-docs.com — docs theme aesthetic."""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (255, 255, 255)
INK = (56, 24, 133)          # #381885 purple-300
MUTED = (108, 108, 108)      # grey body text
ACCENT = (114, 83, 237)      # #7253ed purple-000 (site link color)
ACCENT_DARK = (94, 65, 208)  # #5e41d0 purple-100 (btn-primary)
LINE = (232, 228, 250)       # light purple border

FONT_DIR = os.environ.get("FONT_DIR", "/usr/share/fonts/truetype/dejavu")

def font(size):
    for name in ("DejaVuSans-Bold.ttf", "DejaVuSans.ttf"):
        p = os.path.join(FONT_DIR, name)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

f_name = font(76)
f_tag = font(40)
f_sub = font(30)
f_domain = font(34)

# Top rule like the site's header accent
d.rectangle([0, 0, W, 8], fill=ACCENT)

# Title block
d.text((90, 150), "Just the Docs", font=f_name, fill=INK)
# Tagline
d.text((90, 268), "A Jekyll theme for documentation", font=f_tag, fill=MUTED)

# Feature pills from the theme's selling points
pills = [["Responsive layout", "Built-in search"], ["GitHub Pages ready", "Easy customization"]]
y = 380
for row in pills:
    x = 90
    for p in row:
        w = d.textlength(p, font=f_sub) + 44
        d.rounded_rectangle([x, y, x + w, y + 56], radius=28, fill=(245, 242, 254), outline=ACCENT)
        d.text((x + 22, y + 11), p, font=f_sub, fill=ACCENT_DARK)
        x += w + 18
    y += 74

# Domain chip bottom-left
d.rounded_rectangle([90, 530, 460, 590], radius=12, fill=ACCENT)
d.text((118, 546), "just-the-docs.com", font=f_domain, fill=(255, 255, 255))

# Docs motif: simple book icon bottom-right
book_x, book_y = 990, 500
d.rounded_rectangle([book_x, book_y, book_x + 120, book_y + 100], radius=8, outline=ACCENT, width=5)
d.line([book_x + 60, book_y, book_x + 60, book_y + 100], fill=ACCENT, width=5)

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "og-image.png")
img.save(out, "PNG")
print("saved", out, img.size)