# Solidscape Contracting LTD website

A responsive four-page starter website based on your sitemap:
- `index.html` — Home
- `about.html` — About the company
- `showcase.html` — Project showcase
- `contactus.html` — Contact form

## Run locally

1. Install Node.js (LTS).
2. Open a terminal in this folder and run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your Discord webhook URL to `.env` as `DISCORD_WEBHOOK_URL=...`.
5. Run `npm start` and open `http://localhost:3000`.

The contact form submits to the Express backend, which forwards enquiries to Discord. **Do not put the Discord webhook URL in browser-side JavaScript or commit `.env` to GitHub.** A webhook URL is a secret.

## Before publishing

- Replace the sample phone number and email in `contactus.html` with verified company contact details.
- Replace the six project placeholders in `showcase.html` with real project photographs, titles and descriptions.
- Confirm the company services, address, and all claims with the company owner.
- Test the contact form and protect it against spam (for example with rate limiting and CAPTCHA) before public launch.
- Deploy to a host that supports Node.js if you want the Discord contact endpoint to work. Static-only hosting will display the site but will not run `server.js`.
- The EN/AR toggle currently translates the elements marked with `data-en` and `data-ar`; some form labels and project placeholders remain English and should be translated before a full Arabic launch.
- The supplied logo is used as provided. For best visual results, use a high-resolution transparent PNG or SVG if available.
