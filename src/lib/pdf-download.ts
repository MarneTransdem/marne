type PdfGenerationResult = {
  contentBase64?: string;
  fileName?: string;
  mimeType?: string;
  url?: string;
};

function triggerDownload(url: string, fileName: string, openInNewTab = false) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  if (openInNewTab) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function base64ToBlob(base64: string, mimeType: string) {
  const binary = atob(base64);
  const chunks: Uint8Array[] = [];
  const chunkSize = 1024;

  for (let offset = 0; offset < binary.length; offset += chunkSize) {
    const slice = binary.slice(offset, offset + chunkSize);
    const bytes = new Uint8Array(slice.length);
    for (let index = 0; index < slice.length; index += 1) {
      bytes[index] = slice.charCodeAt(index);
    }
    chunks.push(bytes);
  }

  return new Blob(chunks, { type: mimeType });
}

export function downloadGeneratedPdf(result: PdfGenerationResult, fallbackFileName: string) {
  const fileName = result.fileName || fallbackFileName;

  if (result.contentBase64) {
    const blob = base64ToBlob(result.contentBase64, result.mimeType || 'application/pdf');
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, fileName);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 30_000);
    return;
  }

  if (result.url) {
    triggerDownload(result.url, fileName, true);
    return;
  }

  throw new Error('Fichier PDF indisponible dans la reponse serveur.');
}
