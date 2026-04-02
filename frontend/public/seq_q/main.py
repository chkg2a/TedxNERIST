import os
from PIL import Image

TARGET_HEIGHT = 300
SUPPORTED = (".jpg", ".jpeg", ".png", ".webp")

for filename in os.listdir("."):
    if not filename.lower().endswith(SUPPORTED):
        continue

    try:
        with Image.open(filename) as img:
            width, height = img.size

            # Skip already 300 height
            if height == TARGET_HEIGHT:
                print(f"Skipped: {filename} (already {width}x{height})")
                continue

            # Keep aspect ratio, set height = 300
            new_width = int((TARGET_HEIGHT / height) * width)
            resized = img.resize((new_width, TARGET_HEIGHT), Image.LANCZOS)

            ext = filename.lower()

            if ext.endswith(".png"):
                resized.save(filename, optimize=True)

            elif ext.endswith(".webp"):
                resized.save(filename, format="WEBP", quality=85, method=6)

            else:  # jpg / jpeg
                if resized.mode in ("RGBA", "LA", "P"):
                    background = Image.new("RGB", resized.size, (255, 255, 255))
                    if resized.mode in ("RGBA", "LA"):
                        background.paste(resized, mask=resized.split()[-1])
                    else:
                        background.paste(resized)
                    resized = background
                elif resized.mode != "RGB":
                    resized = resized.convert("RGB")

                resized.save(filename, quality=85, optimize=True)

        print(f"Resized: {filename} -> {new_width}x300")

    except Exception as e:
        print(f"Failed: {filename} -> {e}")

print("Done!")
