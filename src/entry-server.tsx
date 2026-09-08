import React from 'react';
import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    let failed = false;
    output.on('data', chunk => chunks.push(Buffer.from(chunk)));
    output.on('end', () => { if (!failed) resolve(Buffer.concat(chunks).toString('utf8')); });
    output.on('error', reject);
    const stream = renderToPipeableStream(<App initialUrl={url} />, {
      onAllReady() { clearTimeout(timeout); stream.pipe(output); },
      onError(error) { failed = true; clearTimeout(timeout); reject(error); },
    });
    const timeout = setTimeout(() => { failed = true; stream.abort(); reject(new Error(`SSR timeout: ${url}`)); }, 30000);
  });
}
