#!/usr/bin/env python3
"""Verify pinned numerical sources before replacement. No hidden network on build.
Default: fetch the two small NACRE-II source tables, check hashes, then regenerate JSON.
--verify-jina: additionally retrieve the pinned 18.7MB mirror, check full hash and extract
only the six selected additive records to src/data/raw/reaclib-selected.txt.
Third-party data retain their original attribution; this script grants no data license.
"""
import argparse,hashlib,json,pathlib,re,urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--verify-jina',action='store_true');args=p.parse_args()
for name,expected in [('2hpg3he','1277206c9c14817482239e5b7f053943c4674e7c2f1a7dfab0f20a9c012fea18'),('3he3he2p4he','ae753487ff5dfba39fc8dfa0341442493f0cd4145904c7bd25def7a773b8afb1')]:
 url=f'https://www.astro.ulb.ac.be/nacreii/data/{name}.dat';raw=urllib.request.urlopen(url,timeout=45).read()
 if hashlib.sha256(raw).hexdigest()!=expected:raise SystemExit(f'{name}: source changed, review scientifically before updating.')
 rows=[]
 for line in raw.decode().splitlines():
  if line.strip() and not line.startswith('#'):
   T9,rate,low,high=map(float,line.split());rows.append(dict(T9=T9,rate=rate,low=low,high=high))
 (ROOT/'src/data/raw'/f'{name}.dat').write_bytes(raw);(ROOT/'src/data'/f'{name}.json').write_text(json.dumps(rows,indent=2)+'\n')
 print(f'{name}: verified {len(rows)} rows')
if args.verify_jina:
 url='https://raw.githubusercontent.com/pynucastro/pynucastro/0c22729e39bc14b0510a03f53faf92526b0a2bd6/pynucastro/data/reaclib_default2_20250330'
 raw=urllib.request.urlopen(url,timeout=120).read()
 if hashlib.sha256(raw).hexdigest()!='24e1f37c502cf8521109b7dd91cb73d2d4acf38f94ffd1fe1fb1e4beec3ba862':raise SystemExit('JINA snapshot hash mismatch')
 lines=raw.decode().splitlines();selected=[]
 for i,line in enumerate(lines[:-2]):
  parts=line.split()
  if len(parts)>3 and parts[:3] in [['p','c12','n13'],['p','n14','o15']]:selected.extend(lines[i:i+3])
 if len(selected)!=18:raise SystemExit(f'Unexpected selected record lines: {len(selected)}; expected18. Review format.')
 (ROOT/'src/data/raw/reaclib-selected.txt').write_text('\n'.join(selected)+'\n');print('JINA: full source hash verified, six additive records extracted.')
