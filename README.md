# Live The Day Holidays — website (livetheday.nz)

Static site. No build step, no framework, no database. Plain HTML, one CSS file,
one JS file, and SVG artwork that ships with the site (no external image hosts).

## Files

    index.html          Home
    packages.html       Nine itineraries
    about.html          Company and offices
    contact.html        Enquiry form + contact details
    404.html            Not-found page
    assets/css/style.css
    assets/js/main.js
    assets/img/*.svg    12 scenic illustrations
    robots.txt, sitemap.xml

Preview locally by opening `index.html` in a browser, or:

    python3 -m http.server 8000

## Before it goes live — 4 things only you can supply

1. **Phone number.** No phone number is published yet. WhatsApp links point to
   +64 22 156 2163 — change these if that is not the business line.
2. **Postal address** for the Auckland office (footer and About page).
3. **India office** detail — currently just "Kerala, India".
4. **Enquiry form delivery.** The form has no backend. It currently opens the
   visitor's mail app addressed to travel@livetheday.nz. To collect leads
   properly, create a free Formspree form and add its URL:

       <form data-enquiry data-endpoint="https://formspree.io/f/XXXXXXX" ...>

   Nothing else needs changing — the JS handles both modes.

## Later additions worth doing

- Real photography replacing `assets/img/*.svg` (same filenames, JPG/WebP works,
  just update the `src`).
- Genuine customer reviews — do not invent testimonials.
- Google Analytics or Plausible, and Google Search Console verification.

## Deploying to livetheday.nz (domain at Crazy Domains)

### Option A — Crazy Domains hosting (simplest, if the plan has cPanel)

1. Crazy Domains → Hosting → cPanel → **File Manager**.
2. Open `public_html`, upload `livetheday-site.zip`, then **Extract**.
3. Make sure `index.html` sits directly in `public_html` (not inside a subfolder).
4. Turn on the free SSL certificate in cPanel (AutoSSL / Let's Encrypt).
5. Point the domain: Crazy Domains → DNS, `A` record `@` → your hosting IP,
   `CNAME` `www` → `livetheday.nz`.

### Option B — Cloudflare Pages / Netlify (free, faster, HTTPS by default)

1. Push this folder to a GitHub repo (private is fine).
2. Cloudflare Pages → Create project → connect the repo → no build command,
   output directory `/`.
3. Add the custom domain `livetheday.nz` in Pages.
4. In Crazy Domains DNS, either change the nameservers to the pair Cloudflare
   gives you, or add the `CNAME`/`A` records Pages shows you.
5. `www` redirects to the apex automatically.

Either way, DNS changes take 1–24 hours to settle.

## Editing content

- Package cards: `packages.html` (one `<article class="pkg-row">` each) and the
  three highlights on `index.html`.
- Colours and spacing: the `:root` block at the top of `assets/css/style.css`.
- Artwork: `tools/make-images.cjs` regenerates all 12 SVGs
  (`node tools/make-images.cjs`) — edit the palette map inside it to recolour.
