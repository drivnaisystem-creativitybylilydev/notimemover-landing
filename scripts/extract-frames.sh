#!/bin/bash
set -e

INPUT="public/hero-raw.mp4"
OUTPUT_DIR="public/frames"

if [ ! -f "$INPUT" ]; then
  echo "❌ No video found at $INPUT"
  echo "   Generate it on Higgsfield and place the MP4 there first."
  exit 1
fi

echo "🎬 Extracting frames from $INPUT..."
mkdir -p "$OUTPUT_DIR"

FFMPEG=$(node -e "console.log(require('ffmpeg-static'))" 2>/dev/null || echo "ffmpeg")
$FFMPEG -i "$INPUT" \
  -vf "fps=24" \
  -vcodec libwebp -lossless 0 -compression_level 6 -q:v 80 \
  -an -vsync 0 \
  "$OUTPUT_DIR/frame_%04d.webp" \
  -hide_banner -loglevel error

TOTAL=$(ls "$OUTPUT_DIR"/*.webp 2>/dev/null | wc -l | tr -d ' ')
echo "✅ Done! $TOTAL frames extracted to $OUTPUT_DIR/"
echo "   Update TOTAL_FRAMES in components/HeroCanvas.tsx to: $TOTAL"
