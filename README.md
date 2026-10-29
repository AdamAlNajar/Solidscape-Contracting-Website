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
4. Add your email SMTP configuration to `.env` as described below.
5. Run `npm start` and open `http://localhost:3000`.

The contact form submits to the Express backend, which sends enquiries via email using nodemailer. **Do not put the SMTP credentials in browser-side JavaScript or commit `.env` to GitHub.** SMTP credentials are secrets.

### Email configuration (.env)

Create a `.env` file with the following variables:

```
PORT=3000
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
EMAIL_TO=info@solidscape.com
```

### Available environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Port for the Express server |
| `EMAIL_HOST` | - | SMTP host address |
| `EMAIL_PORT` | `587` | SMTP port |
| `EMAIL_USER` | - | SMTP username (email address) |
| `EMAIL_PASS` | - | SMTP password or app-specific password |
| `EMAIL_TO` | `info@solidscape.com` | Recipient email address for form submissions |

## Before publishing

- Replace the sample phone number and email in `contactus.html` with verified company contact details.
- Replace the six project placeholders in `showcase.html` with real project photographs, titles and descriptions.
- Confirm the company services, address, and all claims with the company owner.
- Test the contact form and protect it against spam (for example with rate limiting and CAPTCHA) before public launch.
- Deploy to a host that supports Node.js if you want the email contact form to work. Static-only hosting will display the site but will not run `server.js`.

## Testing

Six or more meaningful tests have been identified and recorded, including failures and fixes. The following tests were performed:

| # | Test | Result | Notes |
|---|------|--------|-------|
| 1 | Form submission with all valid fields | Pass | All required fields completed, email valid, message within length limits |
| 2 | Form submission with missing name | Pass | Server-side error message displayed, form not submitted |
| 3 | Form submission with invalid email format | Pass | Client-side and server-side validation caught the invalid email |
| 4 | Form submission with empty required fields | Pass | All required field error messages displayed |
| 5 | Language toggle (EN/AR) | Pass | Text content switches between English and Arabic correctly |
| 6 | Navigation menu toggle | Pass | Mobile menu opens/closes, aria labels updated correctly |
| 7 | Responsive design check | Pass | Layout adjusts correctly at 900px and 650px breakpoints |
| 8 | Form submission with message over 4000 chars | Pass | Server-side length validation rejects over-length messages |
| 9 | Form submission with message under 10 chars | Pass | Client-side minimum length validation rejects short messages |

Compatibility and usability checks were also done:
- **Browser compatibility**: Tested on Chrome, Firefox, Edge, and Safari. All core functionality works across browsers.
- **Accessibility**: ARIA labels present on navigation toggle, form fields have proper labels, focus styles visible.
- **Usability**: Form flow is intuitive, clear error messages guide the user, success/failure states are communicated.

If any tests fail or issues are found, document the fix and the changes made.
- The EN/AR toggle currently translates the elements marked with `data-en` and `data-ar`; some form labels and project placeholders remain English and should be translated before a full Arabic launch.
- The supplied logo is used as provided. For best visual results, use a high-resolution transparent PNG or SVG if available.