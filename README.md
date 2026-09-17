# [BUSINESS NAME] — WordPress Development Services

## Project Overview

Professional marketing website for WordPress development services. Built as a static site with HTML5, CSS3, and vanilla JavaScript.

**Live site**: `https://[YOUR-DOMAIN]/`

---

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Grid, Flexbox
- **Vanilla JavaScript** — No frameworks or libraries
- **EmailJS** — Contact form email delivery
- **Google Fonts** — Inter, JetBrains Mono

---

## Quick Start

1. Clone the repository
2. Open `index.html` in a browser (no build step needed)
3. Or serve locally:
   ```bash
   npx serve .
   ```

---

## Configuration

### Placeholders to Replace

Before deploying, search for and replace all placeholder values:

| Placeholder | Where | Description |
|---|---|---|
| `[BUSINESS NAME]` | HTML, README | Your business/brand name |
| `[YOUR EMAIL]` | HTML | Contact email address |
| `[YOUR WHATSAPP NUMBER]` | HTML | Display number |
| `[YOUR_WHATSAPP_NUMBER]` | HTML | WhatsApp link number (no spaces, with country code) |
| `[YOUR-DOMAIN]` | HTML, sitemap.xml | Your website domain |
| `[PRICE]` | HTML | Package starting prices |
| `[PROJECT TITLE]` | HTML | Portfolio project names |

### Contact Form (Formspree)

The contact form submits natively to Formspree endpoint `https://formspree.io/f/mnpnqrqk` with standard inputs (`name`, `email`, `message`, `service`, `budget`). No client-side API keys or script dependencies required.

### Portfolio Images

Replace the placeholder images in `assets/images/`:
- `portfolio-1.webp`
- `portfolio-2.webp`
- `portfolio-3.webp`

Recommended size: 640×400px, WebP format.

---

## Deployment (GitHub Pages)

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Save — your site will be live at `https://username.github.io/repo-name/`

The `.nojekyll` file is already included to bypass Jekyll processing.

---

## Project Structure

```
├── index.html              Main page
├── css/
│   ├── variables.css       Design tokens
│   ├── reset.css           CSS reset
│   ├── base.css            Base element styles
│   ├── components.css      Reusable components
│   ├── sections.css        Section layouts
│   └── responsive.css      Media queries
├── js/
│   ├── main.js             Navigation, FAQ, animations
│   └── form.js             Contact form + EmailJS
├── assets/
│   ├── images/             Portfolio images
│   └── favicon/            Favicon files
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .nojekyll
└── README.md
```

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## License

All rights reserved. [BUSINESS NAME] © 2024.
