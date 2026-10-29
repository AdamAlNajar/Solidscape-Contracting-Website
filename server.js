// Minimal backend for the contact form. Keep the Discord webhook private in .env.
require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone = '', subject, message } = req.body || {};
  if (![name, email, subject, message].every(v => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ error: 'Please complete all required fields.' });
  }
  if (name.length > 120 || email.length > 254 || phone.length > 40 || subject.length > 120 || message.length > 4000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) {
    console.error('DISCORD_WEBHOOK_URL is not configured.');
    return res.status(503).json({ error: 'Contact form is not configured yet.' });
  }

  const safe = value => String(value).replace(/@everyone|@here/g, '@\u200b$&');
  const content = [
    '**New Solidscape website enquiry**',
    `**Name:** ${safe(name.trim())}`,
    `**Email:** ${safe(email.trim())}`,
    `**Phone:** ${safe(phone.trim() || 'Not provided')}`,
    `**Project type:** ${safe(subject.trim())}`,
    `**Message:** ${safe(message.trim())}`
  ].join('\\n');

  try {
    const discordResponse = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, allowed_mentions: { parse: [] } })
    });
    if (!discordResponse.ok) {
      console.error('Discord webhook returned status:', discordResponse.status);
      return res.status(502).json({ error: 'Unable to deliver your enquiry.' });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error('Contact delivery failed:', error.message);
    return res.status(502).json({ error: 'Unable to deliver your enquiry.' });
  }
});

app.listen(PORT, () => console.log(`Solidscape website running at http://localhost:${PORT}`));
