# Application Deadline Tracker

A single-page web app that keeps every application deadline in one place —
with a live countdown and a checklist for each one, so a deadline never
closes while you are busy with something else.

Built by **Tasleem Bibi** (final-year BSCS, Sukkur, Sindh, Pakistan) as a
unique, practical project for her own job hunt: after the LAT test on
15 November 2026, her next deadlines were SPSC CCE-2026 (23 Nov), the STS
challan payment (25 Nov) and the LAT result (24 Dec) — all on different days,
all with a step that had to be done before the last date.

## How to run

No build step and no server needed:

1. Open `index.html` in any modern browser (double-click it, or serve the folder).
2. The tracker comes pre-filled with the demo example: **four sample deadlines**
   (SPSC CCE-2026, 23 Nov 2026; STS challan payment, 25 Nov 2026;
   SPSC Ad 07/2026, 14 Dec 2026; HEC LAT result, 24 Dec 2026).
3. Tick off each step as you finish it — the count updates instantly.
4. Add your own deadline with the form, or remove a sample one.
5. Your list is saved in your browser (localStorage), so it is still there
   when you come back.

## Features

- Live countdowns, nearest deadline first ("7 days · 10h left").
- **Urgent flag** — anything closing within 7 days is highlighted, with the
  most urgent deadline named at the top.
- Per-deadline checklist (e.g. "set my own password", "pay the fee after
  approval") with a done/total count.
- Add / remove deadlines, with date and closing time.
- Saved in the browser — no account, no server, no personal data sent anywhere.
- Clean, professional design in dark navy and teal (TB branding),
  mobile-responsive. No personal photo, no fake logos.

## Demo result (pre-filled values)

On 16 November 2026 the demo list shows:

- **SPSC CCE-2026 application** — 7 days left, 0/3 steps done
- **STS challan payment** — 9 days left, 0/2 steps done
- **SPSC Ad 07/2026 Assistant posts** — 28 days left
- **HEC LAT result** — 38 days left

## Files

- `index.html` — page structure and the add-deadline form
- `style.css` — dark navy / teal styling, mobile-responsive
- `script.js` — countdown maths, checklists and localStorage saving
- `README.md` — this file

## Note

This is a demo tracker. The sample dates are public closing dates, not
personal application details — never put a password, CNIC number, bank
detail or application number into a tracker or a public post. Always check
the official portal for the final date and fee before you apply.
