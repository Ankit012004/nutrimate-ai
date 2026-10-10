/**
 * Client-side image compression and resizing utility
 * Resizes large phone camera photos (e.g. 5-15MB) to under 800px and ~150KB for fast uploads
 */
export function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(file.type || "image/jpeg", quality);
        resolve({
          dataUrl,
          width,
          height,
          mimeType: file.type || "image/jpeg"
        });
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Generate lightweight high-resolution SVG sample food data URLs for 1-click testing
 */
export function getSampleFoodImage(type) {
  let title = "Avocado Chicken Bowl";
  let color1 = "#10b981";
  let color2 = "#047857";
  let icon = "🥗";
  let subtitle = "Fresh Greens • Quinoa • Sliced Avocado";

  if (type === "oats") {
    title = "Berry Oatmeal Bowl";
    color1 = "#f59e0b";
    color2 = "#d97706";
    icon = "🥣";
    subtitle = "Rolled Oats • Chia • Blueberries";
  } else if (type === "salmon") {
    title = "Mediterranean Salmon";
    color1 = "#f97316";
    color2 = "#c2410c";
    icon = "🐟";
    subtitle = "Grilled Salmon • Veggies • Lemon";
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color1}" />
        <stop offset="100%" stop-color="${color2}" />
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#grad)" rx="24"/>
    <circle cx="300" cy="170" r="90" fill="rgba(255,255,255,0.2)" />
    <text x="300" y="200" font-size="90" text-anchor="middle" font-family="system-ui, sans-serif">${icon}</text>
    <text x="300" y="300" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="system-ui, sans-serif">${title}</text>
    <text x="300" y="335" font-size="16" fill="rgba(255,255,255,0.85)" text-anchor="middle" font-family="system-ui, sans-serif">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
