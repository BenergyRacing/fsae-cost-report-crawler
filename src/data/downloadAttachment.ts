import { Page } from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { environment } from '../environment/environment';
import { CostAttachment } from '../models/cost-attachment';
import { get, getHeader, waitToEndStream } from '../utils/https';

export async function downloadAttachment(page: Page, outputDir: string, attachment: CostAttachment): Promise<void> {
  const url = new URL(attachment.downloadUrl, environment.baseUrl);

  const cookies = await page.cookies(environment.baseUrl);

  const cookieHeader = cookies
    .map(cookie => encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value))
    .join('; ');

  const response = await get(url, {
    Cookie: cookieHeader,
  });

  const headers = response.headers;

  const disposition = getHeader(headers['content-disposition']) || '';

  attachment.filename = disposition.replace('inline; filename=', '');
  attachment.size = +getHeader(headers['content-length']);

  const attachmentId = url.searchParams.get('attachmentid') || attachment.filename;
  const ext = path.extname(attachment.filename);

  attachment.path = attachmentId + ext;

  const writeStream = fs.createWriteStream(path.join(outputDir, attachment.path));

  response.pipe(writeStream);

  await waitToEndStream(writeStream);
}
