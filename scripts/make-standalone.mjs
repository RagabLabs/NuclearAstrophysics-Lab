import {build} from 'esbuild';
import {writeFileSync,readFileSync} from 'node:fs';
const result=await build({entryPoints:['src/main.tsx'],bundle:true,write:false,outdir:'dist-inline',format:'iife',platform:'browser',minify:true,jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'eof',logLevel:'warning'});
const js=result.outputFiles.find(f=>f.path.endsWith('.js')).text,css=result.outputFiles.find(f=>f.path.endsWith('.css')).text;
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nuclear Astrophysics Lab v1.0.0</title><style>${css}</style></head><body><div id="root"></div><script>${js.replaceAll('</script','<\\/script')}</script></body></html>`;
writeFileSync('standalone.html',html);writeFileSync('dist/standalone.html',html);console.log(`Self-contained browser application: ${Buffer.byteLength(html)} bytes; no network assets.`);
