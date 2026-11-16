# Live City Life, Anywhere

First topic **hub** in B.A.N.K.'s hub-and-spoke network (Nov 8, 2026). Theme: keep ordinary city-life comforts (reliable water, lights, heat, a cold fridge) when you live off the municipal grid or ride out outages.

Planned URL: https://live-city-life-anywhere.vercel.app/

## What's here
- `index.html`: hub home with the promise, who it's for, a tool rail, a numbered guide index, five key rules and a nameplate quick check
- `guides/`: `index.html`, `backup-power.html`, `well-water.html`, `heat-without-the-grid.html`, `winter-prep.html` (printable checklist)
- `tools/`: `index.html` (tool rail plus five quick checks) and one explainer page per live standalone tool:
  - Well Pump Generator Planner: https://wellpump-generator-planner.vercel.app/
  - Well Pressure Tank Sizer: https://well-pressure-tank-sizer.vercel.app/
  - Space Heater Planner: https://space-heater-planner.vercel.app/
- `tools/snowblower-size-picker.html`: a working tool that lives on the hub itself (no separate app), script in `assets/snowblower.js`. Added by hand Nov 8, 2026; not in hub-gen.
- `about.html`: about, sourcing policy, affiliate disclosure
- `404.html`, `robots.txt`, `sitemap.xml`
- `styles.css`: one shared stylesheet. `assets/hub.js`: small optional widgets and checklist memory (localStorage). `assets/favicon.svg`

Static HTML/CSS/JS only: no npm, no framework, no build step, no external fonts or CDNs. Guides work without JavaScript.

## Affiliate
Amazon Associates tag `wellpumpplann-20`. Every Amazon link is a search link with `tag=wellpumpplann-20` and `rel="sponsored nofollow noopener"`. No prices or ratings are shown. There's a disclosure strip on every page, plus a footer line and `about.html#disclosure`.

## Deploy (static)
Any static host works. For Vercel:
1. Create a project with framework preset "Other", no build command, and the output directory set to the folder root.
2. Upload or deploy this folder as-is (for example `vercel deploy --prod` from inside this folder, or a file-upload deploy like the other B.A.N.K. sites).
3. Vercel serves `404.html` automatically for missing paths. Internal links use explicit `.html` paths, so no rewrites are needed.
4. After it's live, add the URL to the Amazon Associates website list for `wellpumpplann-20` and link back to the hub from each standalone tool's footer.

## Editing
Pages were generated once from small Python templates kept outside the site (`/workspace/bank/hub-gen/`, run `python3 build_hub.py`). The output is plain HTML, so you can edit it directly; just don't regenerate over hand edits.

Planning information only. Not professional electrical, plumbing or well-system advice.
