# TIN Frontend - Barber Shop Application

A modern Single Page Application (SPA) for a barber shop management system built with React Router v7.

## Tech Stack

- **[React Router v7](https://reactrouter.com/)** - Framework mode with SPA architecture ([SPA Mode Documentation](https://reactrouter.com/how-to/spa))
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS v4** - Styling
- **i18next** - Internationalization (English & Russian)
- **Vite** - Build tool and dev server
- **Prettier** - Code formatting

## Features

- ✨ Single Page Application (SPA) architecture
- 🌍 Multi-language support (English, Russian)
- 🎨 Custom font (Indie Flower)
- 🔐 Authentication routes (Login, Registration)
- 📱 Responsive design with TailwindCSS
- ⚡️ Hot Module Replacement (HMR)
- 🔒 TypeScript by default
- 💅 Code formatting with Prettier

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Configuration

The project uses environment variables for configuration. A `.env.example` file is provided with all required variables.

Copy `.env.example` to `.env` and adjust values as needed:

```bash
cp .env.example .env
```

**Note:** The environment configuration is automatically checked when running `dev` or `build` commands.

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:3001`.

### Code Formatting

Format your code:

```bash
npm run format
```

Check code formatting:

```bash
npm run format:check
```

### Type Checking

Run TypeScript type checking:

```bash
npm run typecheck
```

## Building for Production

Create a production build:

```bash
npm run build
```

The build output will be in the `build/client` directory.

## Project Structure

```
app/
├── i18n/                 # Internationalization setup
│   ├── locales/         # Translation files (en.json, ru.json)
│   └── index.ts         # i18n configuration
├── routes/              # Application routes
│   ├── dashboard.tsx    # Main dashboard (/)
│   ├── login.tsx        # Login page (/login)
│   └── registration.tsx # Registration page (/registration)
├── app.css              # Global styles
├── root.tsx             # Root layout component
└── routes.ts            # Route configuration

scripts/
└── check-env.cjs        # Environment validation script

.env.example             # Example environment variables
.env                     # Your local environment variables (git-ignored)
```

## Available Routes

- `/` - Dashboard (main page after login)
- `/login` - Login page
- `/registration` - Registration page

## SPA Mode

This project uses React Router v7 in SPA mode, which means:

- Server-side rendering is disabled at runtime
- The root route is pre-rendered at build time to generate `index.html`
- All routing happens on the client side
- Perfect for static hosting services

Learn more about [React Router SPA Mode](https://reactrouter.com/how-to/spa).

## Building for Production

After running `npm run build`, the production-ready files will be in the `build/client` directory.

---

Built with ❤️ using React Router v7
