import * as https from 'https';
import * as http from 'http';
import { Stream } from 'stream';

export function get(url: URL, headers: Record<string, string>): Promise<http.IncomingMessage> {
  return new Promise(resolve => {
    https.get(url, {
      headers: headers,
    }, (response) => {
      resolve(response);
    });
  });
}

export async function getWithRetries(url: URL, headers: Record<string, string>, retriesLeft: number = 3): Promise<http.IncomingMessage> {
  const result = await get(url, headers);
  const statusCode = result.statusCode || 500;

  if (statusCode >= 200 && statusCode < 300)
    return result;

  if (retriesLeft <= 0)
    throw new Error('HTTP error ' + statusCode + ' when downloading ' + url);

  console.warn('HTTP error ' + statusCode + ' when fetching ' + url);

  return await getWithRetries(url, headers, retriesLeft - 1);
}

export function getHeader(value: string | string[] | undefined): string {
  if (Array.isArray(value))
    return value[0];

  return value || '';
}

export function waitToEndStream(stream: Stream): Promise<void> {
  return new Promise((resolve, reject) => {
    stream.once('close', resolve);
    stream.once('error', reject);
  });
}
