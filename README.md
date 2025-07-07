# XoulTec Website - Astro 5

A modern, fast business website built with Astro 5, React, TypeScript, and Tailwind CSS 4.

## 🚀 Features

- **Static-first** with server-side API routes for forms
- **Astro Islands** - React components load only when needed
- **Tailwind CSS 4** - Latest version with modern features
- **TypeScript** - Full type safety
- **Secure contact forms** - Mailgun integration with server-side API
- **Responsive design** - Mobile-first approach
- **SEO optimized** - Fast loading and search engine friendly

## 📁 Project Structure

```
src/
├── components/          # React components (islands)
│   ├── ContactForm.tsx  # Interactive contact form
│   ├── QuoteForm.tsx    # Interactive quote request form
│   ├── NavBar.tsx       # Navigation component
│   └── ...
├── layouts/
│   └── Layout.astro     # Base layout template
├── pages/
│   ├── index.astro      # Home page
│   ├── services.astro   # Services page
│   ├── portfolio.astro  # Portfolio page
│   ├── contact.astro    # Contact page
│   └── api/            # Server-side API routes
│       ├── contact.ts  # Contact form handler
│       └── quote.ts    # Quote request handler
└── styles/
    └── global.css      # Global styles with Tailwind
```

## 🔧 Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Mailgun credentials:
   ```env
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_domain.com
   TO_EMAIL=support@xoultec.com
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build:**
   ```bash
   npm run build
   ```

## 📧 Mailgun Setup

1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Add and verify your domain
3. Get your API key from the dashboard
4. Add the credentials to your `.env` file

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in site settings
3. Build command: `npm run build`
4. Publish directory: `dist`

### Node.js Server
1. Build the project: `npm run build`
2. Upload `dist/` folder to your server
3. Run: `node dist/server/entry.mjs`
4. Set environment variables on your server

## 🔒 Security

- API keys are stored as environment variables
- Server-side API routes protect sensitive operations
- Form validation on both client and server
- No sensitive data exposed to the browser

## 📊 Performance

- **Static pages** for maximum speed
- **Island architecture** - minimal JavaScript
- **Tailwind CSS 4** optimizations
- **Modern build tools** (Vite + Astro)

## 🛠️ Commands

| Command                | Action                           |
| :--------------------- | :------------------------------- |
| `npm install`          | Install dependencies             |
| `npm run dev`          | Start dev server at `localhost:4321` |
| `npm run build`        | Build production site to `./dist/` |
| `npm run preview`      | Preview build locally            |
| `npm run astro ...`    | Run CLI commands like `astro add` |

## 📞 Contact Forms

The website includes two interactive contact forms:

1. **General Inquiry** - For general questions and support
2. **Quote Request** - For service quotes with detailed project information

Both forms:
- Validate input on client and server
- Send emails via Mailgun API
- Provide real-time feedback to users
- Include loading states and error handling

## 🔗 Learn More

- [Astro Documentation](https://docs.astro.build)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Mailgun Documentation](https://documentation.mailgun.com)
