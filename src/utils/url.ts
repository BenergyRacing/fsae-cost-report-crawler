import * as path from 'path';

export function hasFileName(url: string, filename: string): boolean {
  const urlObj = new URL(url);
  const file = path.basename(urlObj.pathname);

  return file.toLowerCase().includes(filename.toLowerCase());
}

export function getQueryStringParam(url: string, param: string): string | null {
  return new URL(url).searchParams.get(param);
}
