export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  iconLink?: string;
  size?: string;
  modifiedTime?: string;
}

const blobUrlCache = new Map<string, string>();

/**
 * Searches and lists files in Google Drive.
 * Defaults to image files or folders.
 */
export async function listDriveFiles(
  token: string,
  options: {
    folderId?: string;
    searchTerm?: string;
    onlyImages?: boolean;
    pageSize?: number;
  } = {}
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> {
  const { folderId, searchTerm, onlyImages = true, pageSize = 40 } = options;

  const queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (onlyImages) {
    queryParts.push("(mimeType contains 'image/' or mimeType = 'application/vnd.google-apps.folder')");
  }

  if (searchTerm && searchTerm.trim().length > 0) {
    const cleanTerm = searchTerm.replace(/'/g, "\\'");
    queryParts.push(`name contains '${cleanTerm}'`);
  }

  const q = queryParts.join(' and ');
  const fields = 'nextPageToken, files(id, name, mimeType, thumbnailLink, webViewLink, iconLink, size, modifiedTime)';
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    q
  )}&fields=${encodeURIComponent(fields)}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Erro ao carregar arquivos do Drive (${response.status})`
    );
  }

  const data = await response.json();
  return {
    files: data.files || [],
    nextPageToken: data.nextPageToken,
  };
}

/**
 * Fetches an image file blob from Google Drive using the Bearer token
 * and converts it to a reusable local blob URL.
 */
export async function getDriveFileBlobUrl(fileId: string, token: string): Promise<string> {
  if (blobUrlCache.has(fileId)) {
    return blobUrlCache.get(fileId)!;
  }

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao baixar imagem do Google Drive (${response.status})`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  blobUrlCache.set(fileId, objectUrl);
  return objectUrl;
}

/**
 * Formats byte size to human readable string
 */
export function formatFileSize(bytes?: string): string {
  if (!bytes) return '';
  const num = parseInt(bytes, 10);
  if (isNaN(num)) return '';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(1)} MB`;
}
