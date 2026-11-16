# Live City Life, Anywhere

Topic **hub** in B.A.N.K.'s hub-and-spoke network. Theme: keep ordinary city-life comforts (reliable water, lights, heat, a cold fridge) when you live off the municipal grid or ride out outages.

Live URL: https://live-city-life-anywhere.vercel.app/

## Four problem-first buckets

Every tool and guide lives in exactly one bucket:

- **Power** (`/power/`) — Power's out. Well Pump Generator Planner, power-station / battery runtime check, backup-power guide.
- **Water** (`/water/`) — No water pressure. Well Pressure Tank Sizer, well-water guide.
- **Heat & Air** (`/heat-air/`) — House is cold / air is bad. Space Heater Planner, Snowblower Size Picker, heat-without-the-grid guide.
- **Safety** (`/safety/`) — Is my house safe? Smoke & CO Alarm Planner (full working tool at `/safety/smoke-co-alarm-planner/`), winter prep checklist.

The main nav is those four buckets plus About. Existing `/tools/*` and `/guides/*` URLs still work and now point at their bucket.

Some tools also live on standalone bait sites and link back to their bucket:

- Well Pump Generator Planner: https://wellpump-generator-planner.vercel.app/ → `/power/`
- Well Pressure Tank Sizer: https://well-pressure-tank-sizer.vercel.app/ → `/water/`
- Space Heater Planner: https://space-heater-planner.vercel.app/ → `/heat-air/`
- Smoke & CO Alarm Planner: https://smoke-co-alarm-planner.vercel.app/ → `/safety/` (full tool also on the hub)

## What's here

- `index.html`: hub home with the four problem buckets and five key rules
- `power/`, `water/`, `heat-air/`, `safety/`: bucket landing pages
- `safety/smoke-co-alarm-planner/`: full Smoke & CO Alarm Planner ported onto the hub
- `guides/` and `tools/`: original URLs kept (explainers, the snowblower tool, indexes reorganized by bucket)
- `about.html`: about, sourcing policy, affiliate disclosure
- `404.html`, `robots.txt`, `sitemap.xml`, `vercel.json`
- `styles.css`, `assets/hub.js`, `assets/snowblower.js`, `assets/favicon.svg`

Static HTML/CSS/JS only: no npm, no framework, no build step, no external fonts or CDNs. Guides work without JavaScript.

## Affiliate

Amazon Associates tag `wellpumpplann-20`. Every Amazon link is a search link with `tag=wellpumpplann-20` and `rel="sponsored nofollow noopener"`. No prices or ratings are shown. There's a disclosure strip on every page, plus a footer line and `about.html#disclosure`.

## Deploy (static)

Any static host works. For Vercel: framework preset "Other", no build command, output directory = folder root. Upload this folder as-is. Existing `.html` tool and guide paths are unchanged, so no redirects are required for those. New bucket URLs are directory indexes (`/power/`, `/water/`, `/heat-air/`, `/safety/`).

Planning information only. Not professional electrical, plumbing or well-system advice.
