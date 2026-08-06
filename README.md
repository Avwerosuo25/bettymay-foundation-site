# The BettyMay Foundation — Website

A React + Tailwind single-page site, built with Vite.

## Run it locally in VS Code

1. **Open this folder in VS Code** (`File > Open Folder...`).
2. **Open a terminal** in VS Code (`` Ctrl+` `` / `` Cmd+` ``).
3. Install dependencies (this now includes `react-router-dom` — re-run this
   even if you installed before):
   ```bash
   npm install
   ```
4. Start the live dev server:
   ```bash
   npm run dev
   ```
5. Vite will print a local URL, usually:
   ```
   http://localhost:5173
   ```
   Open that in your browser — the site will hot-reload as you edit files.

## Project structure

```
bettymay-site/
├── index.html            # HTML shell Vite serves
├── package.json          # dependencies + scripts
├── vite.config.js        # build tool config
├── tailwind.config.js    # Tailwind setup
├── postcss.config.js     # required for Tailwind
├── public/
│   └── team/              # drop real team headshots here
└── src/
    ├── main.jsx           # mounts <App /> with BrowserRouter
    ├── App.jsx            # site shell: Nav + routed pages + Footer + DonateModal
    ├── index.css          # Tailwind imports
    ├── lib/
    │   ├── theme.js              # colors, fonts, logo, nav links, contact email
    │   ├── scroll.js              # smooth-scroll-to-section helper
    │   └── DonateModalContext.jsx # shared open/close state for the Donate popup
    ├── components/
    │   ├── Nav.jsx          # top navigation, shared across pages
    │   ├── Footer.jsx       # footer, shared across pages
    │   ├── Logomark.jsx     # renders the logo image
    │   ├── Wave.jsx         # decorative section divider
    │   ├── AdireUnderline.jsx
    │   ├── TestimonialCarousel.jsx  # rotating testimonials
    │   └── DonateModal.jsx   # "Donate" popup: bank transfer + Paystack/Flutterwave
    └── pages/
        ├── Home.jsx         # "/" — hero, about, outreach, contact, etc.
        └── Team.jsx         # "/team" — the Our Team page
```

The site now has real, separate pages via `react-router-dom`:
- `/` — the main site
- `/team` — the Our Team page

Add more pages by creating a new file in `src/pages/`, then registering it
as a `<Route>` in `src/App.jsx`.

## Things to update with real content

- **Contact form (important — set this up)**: `src/lib/theme.js` →
  `FORM_ENDPOINT`. The form used to rely on `mailto:` links, which only
  work if the visitor's device has a desktop email app configured — most
  people on phones/webmail don't, so messages were silently never sent.
  It now posts to [Formspree](https://formspree.io) instead (free, no
  backend needed):
  1. Sign up at formspree.io with `Kelvinklein425@gmail.com`
  2. Create a new form — you'll get a form ID
  3. Replace `YOUR_FORM_ID` in `FORM_ENDPOINT` with it
  4. Formspree emails a confirmation link the first time someone submits
     the form — click it to activate the form
  Until this is set up, the form automatically falls back to opening the
  visitor's email client instead (same as before).
- **Contact email**: `src/lib/theme.js` → `CONTACT_EMAIL`. Used as the
  Formspree fallback and shown in the Donate popup's bank-transfer note.
- **Bank transfer details**: `src/components/DonateModal.jsx` →
  `BANK_ACCOUNTS`. The Naira account is filled in with real details; the
  USD account is still a placeholder — update it once a domiciliary
  account is opened.
- **Paystack / Flutterwave links**: same file, `PAYSTACK_URL` and
  `FLUTTERWAVE_URL` — currently point to each provider's homepage as a
  safe placeholder. Once you set up a Payment Page on Paystack or a Store
  link on Flutterwave, swap in the real links so the buttons take donors
  straight to checkout.
- **Team photos**: `src/pages/Team.jsx` → the `TEAM` array — real photos
  are already wired up for everyone.
- **Team social links**: same array → each person's `socials` object
  (`instagram`, `twitter`, `linkedin`, `facebook`) — currently all `"#"`
  placeholders. Replace with real profile URLs as they're available.

## Why the file didn't run on its own

A `.jsx` file is just a component — it needs a bundler (Vite here), an HTML
page to mount into, and Tailwind's CSS generated from config. Opening the
`.jsx` file directly (or just its folder) in a browser or plain server has
none of that, so you just see the raw file/folder listing instead of a
rendered page. This project wraps the component with everything it needs.

## Building for production

```bash
npm run build
```
Outputs static files to `dist/`, which you can deploy to Netlify, Vercel,
GitHub Pages, or any static host.
