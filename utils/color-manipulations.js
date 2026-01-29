export function getTextColorForBackground(hexColor) {
  // remove #
  const hex = hexColor.replace('#', '');

  // convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
export function getComplementaryColor(hexColor) {
  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  const toHex = (value) => value.toString(16).padStart(2, '0');

  return `#${toHex(compR)}${toHex(compG)}${toHex(compB)}`;
}

/**
 * Lighten a hex color by a given amount (0–1)
 * @param {string} hexColor - e.g. "#3A5AFF"
 * @param {number} amount - 0 = no change, 1 = white
 */
export function lightenColor(hexColor, amount = 0.2) {
  const hex = hexColor.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const lighten = (channel) => Math.round(channel + (255 - channel) * amount);

  const toHex = (value) => value.toString(16).padStart(2, '0');

  return `#${toHex(lighten(r))}${toHex(lighten(g))}${toHex(lighten(b))}`;
}
