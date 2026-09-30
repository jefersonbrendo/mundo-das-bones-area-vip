/**
 * Converts Google Drive shareable links into direct image URLs
 * or returns standard image URLs unchanged.
 */
export function formatShareableImageUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  // If it's a Google Drive file link: /file/d/{id}/...
  const driveFileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveFileMatch && driveFileMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveFileMatch[1]}`;
  }

  // If it's a Google Drive link with ?id={id}
  const driveIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
  }

  return trimmed;
}
