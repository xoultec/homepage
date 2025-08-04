# XoulTec Website - React + TanStack Router

A modern, responsive website built with React, Vite, TanStack Router, TailwindCSS, and DaisyUI.

## 🚀 Migration Complete

This project has been successfully migrated from Astro to React + TanStack Router while maintaining:
- ✅ All existing functionality and design
- ✅ TailwindCSS v4 and DaisyUI v5 styling
- ✅ Custom corporate theme
- ✅ Contact form with enhanced UX
- ✅ Responsive design and components
- ✅ Type-safe routing with TanStack Router

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TanStack Router** - Type-safe, file-based routing
- **TanStack Form** - Powerful form management with validation
- **Vite** - Fast build tool and dev server
- **TypeScript** - Full type safety
- **TailwindCSS v4** - Utility-first CSS
- **DaisyUI v5** - Beautiful component library

## 📁 Project Structure

```text
/
├── public/           # Static assets (images, favicon, etc.)
├── src/
│   ├── components/   # Reusable React components
│   │   ├── NavBar.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Products.tsx
│   │       ├── Services.tsx
│   │       └── Contact.tsx
│   ├── routes/       # File-based routing
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── portfolio.tsx
│   │   └── contact.tsx
│   ├── index.css     # Global styles with DaisyUI theme
│   ├── main.tsx      # App entry point
│   └── router.tsx    # Router configuration
├── index.html        # HTML template
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `http://localhost:3000` |
| `npm run build`   | Build for production to `./dist/`          |
| `npm run preview` | Preview production build locally            |
| `npm run lint`    | Run ESLint                                  |

## 🎨 Features

### Routing
- File-based routing with TanStack Router
- Type-safe navigation
- Route-level code splitting
- Built-in devtools

### Styling
- Custom DaisyUI corporate theme
- Responsive design with Tailwind
- Consistent branding and colors
- Modern UI components

### Components
- **NavBar**: Responsive navigation with routing
- **Hero**: Eye-catching landing section
- **Products**: Showcase of company products
- **Services**: Business services overview
- **Contact**: Enhanced contact form with validation

### Contact Form (TanStack Form)
- **Advanced validation** - Real-time field validation as you type
- **Type-safe form handling** - Full TypeScript support
- **Smart form state management** - Automatic dirty/pristine tracking
- **DaisyUI integration** - Beautiful error states and styling
- **Field-level validation** - Name, email, and message validation
- **Form submission handling** - Loading states and success/error feedback

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env` and configure:

```env
VITE_MAILGUN_API_KEY=your_mailgun_api_key
VITE_MAILGUN_DOMAIN=your_mailgun_domain  
VITE_TO_EMAIL=support@xoultec.com
VITE_DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

### Theme Customization
The DaisyUI corporate theme is configured in `src/index.css` with custom colors and styling.

## 🚀 Deployment

Build the project and deploy the `dist/` folder to your hosting provider:

```bash
npm run build
```

The built files are optimized and ready for production deployment.

### Deployment Options

#### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### Netlify
1. Connect your repository to Netlify
2. Add environment variables in site settings
3. Build command: `npm run build`
4. Publish directory: `dist`

#### Static Hosting
Deploy the `dist/` folder to any static hosting provider (GitHub Pages, AWS S3, etc.)

## 📞 Contact

- **Phone**: +1 (816) 919-3349
- **Email**: support@xoultec.com
- **Website**: [xoultec.com](https://xoultec.com)

## 🔗 Learn More

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Form Documentation](https://tanstack.com/form/latest)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [DaisyUI Documentation](https://daisyui.com)
