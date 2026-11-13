# kairali.nz

Static site for **Kairali** — Keralan restaurant, 1/754 Manukau Road, Royal Oak, Auckland 1023.
Phone 09 213 3313. Open daily 11.00–22.00.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home — full-screen photo slider, quick-action bar, our story, menu preview with tabs, gallery, visit block with map |
| `menu.html` | The full menu, six sections with a sticky section nav |
| `about.html` | The story, the three kitchen principles, the room |
| `contact.html` | Address, hours, phone, booking form, embedded map |
| `404.html` | Not-found page |
| `assets/css/style.css` | The only stylesheet. All design lives here. |
| `assets/js/main.js` | Header on scroll, mobile nav, hero slider, menu tabs, scroll reveal. No dependencies. |

## Design
Dark green / turmeric / cream, set in Marcellus and Jost (Google Fonts). Layout follows the
modern Indian restaurant pattern: full-bleed opening slider, three quick actions, a story block
with overlapping photos, a menu preview that switches category without leaving the page,
a photo wall, then hours and map.

## Notes
- No build step, no framework, no database. Plain HTML + one CSS file, served by GitHub Pages.
- The booking form composes a `mailto:` to `kairalinzltd@gmail.com`. No server, no third party sees the message.
- The map is a plain Google Maps embed — no API key, nothing to expire.
- `CNAME` holds `kairali.nz` — do not delete it or the custom domain drops.
- `robots.txt` and `sitemap.xml` point at the live domain.

## Deploying
GitHub → Settings → Pages → Source: **Deploy from a branch** → branch `kairali-site`, folder `/ (root)`.
DNS at the registrar: `A` records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `CNAME` for `www` to `kairalinzltd-akl.github.io`.

## Changing the photos yourself
Put the files in `assets/img/` with the fixed names and the pages pick them up — nothing else to touch.

| File | Where it lands |
|---|---|
| `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` | the three full-screen slides on the home page |
| `about-1.jpg` | the tall photo in "Our story" |
| `about-2.jpg` | the smaller overlapping photo |
| `g1.jpg` … `g6.jpg` | the six gallery tiles |

On github.com: open `assets/img` → **Add file** → **Upload files** → drag the photo in → rename it to the exact name → **Commit changes** to the `kairali-site` branch. A missing photo hides its own tile, so nothing breaks while you are part-finished.

JPG only, 1200px wide is plenty, under 300 KB each. See `assets/img/README.txt`.

## Deliberately absent
- **Prices** — resolved at the counter. Ask for a price list and it can be added per dish.
- The old WordPress, the theme mirror and the `indexXXXX.html` stubs are all gone; this repo is the whole site.
