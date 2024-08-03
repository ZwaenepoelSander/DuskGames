// utils.ts
export const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
// utils.ts
export const extractColorsFromBase64Image = (base64Image: string): string[] => {
  const colors: Set<string> = new Set();

  // Removing the data URL part to only get the base64-encoded string
  const base64Data = base64Image.replace(/^data:image\/(png|jpeg);base64,/, "");

  // Decode the base64 string to binary data
  const binaryString = atob(base64Data);
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  // Assuming the image is in PNG format and extracting colors
  // PNG format specifics (Skipping the header, IHDR chunk, etc.)
  // For simplicity, assuming a basic format and directly accessing pixel data.
  // This part should be adapted based on actual PNG file structure if needed.

  // Typically, pixel data in PNG is found after IHDR and IDAT chunks
  let pixelStartIndex = 33; // Simplified assumption, may need adjustments
  for (let i = pixelStartIndex; i < uint8Array.length; i += 4) {
    const r = uint8Array[i];
    const g = uint8Array[i + 1];
    const b = uint8Array[i + 2];
    const a = uint8Array[i + 3] / 255;
    colors.add(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return Array.from(colors);
};


// utils/colorUtils.ts
export function hexToRgba(hex: string, alpha: number = 1): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

