# Favicon Files

The following favicon files are currently placeholder files and should be replaced with proper branded icons:

## Required Files:
- `favicon.ico` - 32x32 pixel favicon for browsers
- `favicon-16x16.png` - 16x16 pixel PNG favicon
- `favicon-32x32.png` - 32x32 pixel PNG favicon
- `apple-touch-icon.png` - 180x180 pixel Apple touch icon
- `android-chrome-192x192.png` - 192x192 pixel Android chrome icon
- `android-chrome-512x512.png` - 512x512 pixel Android chrome icon

## Tools for Generation:
- Use https://realfavicongenerator.net/ to generate all favicon files from a single source image
- Or use https://favicon.io/ for simple favicon generation
- Upload your brand logo or profile picture to generate all required sizes

## Current Implementation:
- All favicon files are properly referenced in layout.tsx
- Web app manifest (site.webmanifest) is configured to use these icons
- Meta tags are set up for proper theme colors and display

## Next Steps:
1. Create or obtain a square brand logo/image (minimum 512x512px)
2. Use a favicon generator tool to create all required files
3. Replace the placeholder files with the generated ones
4. Test the favicon display across different browsers and devices
