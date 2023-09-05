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
