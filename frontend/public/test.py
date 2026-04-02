import os
import numpy as np
from PIL import Image

# =========================
# CONFIG
# =========================
INPUT_DIR = "seq_1"
OUTPUT_DIR = "output_images"

# Target background color (R, G, B)
TARGET_COLOR = np.array([0,0,0])  # white

# Threshold (tune this!)
THRESHOLD = 60  # higher = removes more shades

# Supported formats
EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp", ".bmp")


# =========================
# CORE FUNCTION
# =========================
def remove_bg(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    data = np.array(img)

    rgb = data[:, :, :3]
    alpha = data[:, :, 3]

    # Compute distance from target color
    distance = np.linalg.norm(rgb - TARGET_COLOR, axis=2)

    # Create mask: pixels close to background
    mask = distance < THRESHOLD

    # Make them transparent
    alpha[mask] = 0

    # Update image
    data[:, :, 3] = alpha

    result = Image.fromarray(data)
    result.save(output_path, "PNG")


# =========================
# MAIN LOOP
# =========================
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    files = [
        f for f in os.listdir(INPUT_DIR)
        if f.lower().endswith(EXTENSIONS)
    ]

    if not files:
        print("No images found.")
        return

    for f in files:
        in_path = os.path.join(INPUT_DIR, f)
        out_name = os.path.splitext(f)[0] + ".png"
        out_path = os.path.join(OUTPUT_DIR, out_name)

        try:
            remove_bg(in_path, out_path)
            print(f"[OK] {f} -> {out_name}")
        except Exception as e:
            print(f"[ERROR] {f}: {e}")

    print("\nDone.")


if __name__ == "__main__":
    main()
