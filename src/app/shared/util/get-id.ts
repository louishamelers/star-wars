export function getIdFromUrl(url: string): string | undefined {
  return url.match(/\d+/)?.[0];
}
