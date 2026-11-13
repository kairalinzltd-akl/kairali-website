# kairali.nz

Static site for **Kairali** — Keralan restaurant, 1/754 Manukau Road, Royal Oak, Auckland 1023.
Phone 09 213 3313. Open daily 11.00–22.00.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Home — hero, three pillars, map, contact strip |
| `menu.html` | Menu by section (breakfast/tiffin, sadya, coast, biryani, sweets, drinks) |
| `about.html` | Story and kitchen principles |
| `contact.html` | Address, phone, hours, reservation form, embedded map |
| `404.html` | Not-found page |
| `assets/css/style.css` | The only stylesheet. All design lives here. |

## Notes
- No build step, no framework, no database. Plain HTML + one CSS file, served by GitHub Pages.
- Reservation form composes a `mailto:` to `kairalinzltd@gmail.com`. No server, no third party sees the message.
- `CNAME` holds `kairali.nz` — do not delete it or the custom domain drops.
- `robots.txt` and `sitemap.xml` point at the live domain.

## Deploying
GitHub → Settings → Pages → Source: **Deploy from a branch** → branch `kairali-site`, folder `/ (root)`.
DNS at the registrar: `A` records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `CNAME` for `www` to `kairalinzltd-akl.github.io`.

## Changing the photos yourself
Put the files in `assets/img/` with the fixed names below and the pages pick them up — nothing else to touch.

| File | Where it lands |
|---|---|
| `hero.jpg` | the big background photo behind "Taste the heritage" |
| `dish-1.jpg` … `dish-6.jpg` | the six tiles in "A few things we cook" |

On github.com: open `assets/img` → **Add file** → **Upload files** → drag the photo in → rename it to the exact name above → **Commit changes** to the `kairali-site` branch. A missing photo hides its own tile, so nothing breaks while you are part-finished.

JPG only, 1200px wide is plenty, under 300 KB each. See `assets/img/README.txt`.

## Deliberately absent
Prices (they change with the catch and the season — confirmed at the counter), and photography. Both are placeholders for the next pass.
