# Einstein IQ Test

A free, modern, fast and SEO-friendly online IQ style quiz built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4** and **shadcn/ui**. The site is designed to deploy cleanly to **Vercel** and runs the quiz fully on the client side, with no database or API keys required.

> The website name is inspired by the popular idea of intelligence, reasoning and problem solving associated with Albert Einstein. It is **not** affiliated with Albert Einstein, his estate, or any organization that administers clinical intelligence tests. The quiz is for practice and entertainment only and is **not** a clinical or professionally administered IQ assessment.

## What is included

- **Home** (`/`) - hero, fully working 22-question IQ quiz, SEO content sections, and FAQ with structured data.
- **About Us** (`/about`) - project background, commitments, and the difference between an online quiz and a clinical assessment.
- **Contact Us** (`/contact`) - validated front-end form, direct contact email, and response time info.
- **Privacy Policy** (`/privacy-policy`) - detailed policy with a sticky table of contents, honest about what the site does and does not collect.
- **404 / API health** (`/api`) - simple JSON health endpoint.

## Quiz features

- 22 questions across 9 reasoning types: number sequences, pattern recognition, logical reasoning, odd one out, verbal reasoning, mathematical reasoning, shape and pattern logic, analytical thinking, and problem solving.
- One question at a time with a progress bar and question counter.
- Previous, Next, and Clear controls with required-answer validation.
- Instant score with a 4-band result interpretation.
- Expandable answer review with short explanations.
- Try Again button that resets all quiz state.
- Fully responsive and keyboard-friendly.

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui (New York style)
- Lucide icons
- No database required (Prisma is included in the scaffold but not used by the quiz)

## Run locally

```bash
bun install
bun run dev
```

Open http://localhost:3000 in your browser.

## Production build

```bash
bun run build
bun run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Go to https://vercel.com/new.
3. Import the repository.
4. Vercel auto-detects Next.js. No environment variables are required for the basic website.
5. Click Deploy.

## Project structure

```
.
├── public/
│   ├── logo.svg
│   ├── og-image.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── api/route.ts
│   │   ├── contact/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── privacy-policy/page.tsx
│   ├── components/
│   │   ├── contact-form.tsx
│   │   ├── iq-quiz.tsx
│   │   ├── site-footer.tsx
│   │   ├── site-header.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/
│   ├── lib/
│   │   ├── quiz-data.ts
│   │   ├── site-config.ts
│   │   └── utils.ts
│   └── prisma/schema.prisma
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Single source of truth

`src/lib/site-config.ts` holds the site name, domain, contact email, navigation links, and OpenGraph image URL. Update it once when you move to your real domain and it propagates everywhere.

## License

For personal and educational use. The Einstein name is used referentially to evoke the idea of intelligence and reasoning. This project is not affiliated with, endorsed by, or sponsored by any estate or organization associated with Albert Einstein.
