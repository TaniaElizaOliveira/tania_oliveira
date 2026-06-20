# Tânia Oliveira Portfolio

Premium multilingual portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion and next-intl.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/pt](http://localhost:3000/pt).

Available routes:

- `/pt`
- `/en`
- `/es`

## Structure

- `messages/*.json` contains localized content and SEO metadata.
- `src/i18n/*` contains next-intl routing and request configuration.
- `src/components/site/*` contains the portfolio UI sections.
- `messages/*.json` currently uses `/TODO_CV_FILE.pdf` as the CV path until the real file is added.

## Production Tasks

- Replace placeholder contact/social links.
- Replace placeholder project cards with real case studies.
- Replace the CV placeholder with the final PDF.
- Wire the contact form to a real server action or route handler.
