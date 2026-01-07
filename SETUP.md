# Frontend Setup Guide

## Project Structure

```
src/
├── features/
│   └── auth/
│       ├── api/
│       │   └── authApi.ts          # React Query hooks for auth
│       ├── components/
│       │   └── AuthGuard.tsx       # HOC for protected routes
│       ├── store/
│       │   └── authStore.ts        # Zustand auth state
│       └── types/
│           └── auth.types.ts       # TypeScript interfaces
├── pages/
│   ├── HomePage.tsx                # Protected home page
│   ├── LoginPage.tsx               # Login form
│   └── RegistrationPage.tsx       # Registration form
├── shared/
│   └── api/
│       └── baseApi.ts              # Axios client with interceptors
├── App.tsx                         # Main app with routing & providers
└── main.tsx                        # Entry point
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **TanStack React Query** - Data fetching & caching
- **Zustand** - State management

## Installation

```bash
npm install
```

## Environment Setup

Create `.env` file in the root:

```env
PORT=3000
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Features Implemented

### Authentication System

#### 1. Base API Client (`src/shared/api/baseApi.ts`)
- Axios instance with `withCredentials: true`
- Automatic token refresh on 401 errors
- Request queuing during refresh
- Redirect to login when refresh fails

#### 2. Auth Store (`src/features/auth/store/authStore.ts`)
- Zustand store for `isAuthenticated` state
- No tokens stored (security best practice)

#### 3. Auth API Service (`src/features/auth/api/authApi.ts`)
- `useLogin()` - Login mutation
- `useRegister()` - Registration mutation
- `useLogout()` - Logout mutation
- `useMe()` - Get current user query

#### 4. AuthGuard Component (`src/features/auth/components/AuthGuard.tsx`)
- Protects routes requiring authentication
- Shows loading spinner during auth check
- Redirects to `/login` if not authenticated

#### 5. Pages
- **LoginPage** - Email/password form with error handling
- **RegistrationPage** - Full registration form
- **HomePage** - Protected page showing user info with logout

## API Endpoints

Base URL: `http://localhost:5001/api/v1/auth/customers`

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `POST /refresh` - Refresh tokens
- `GET /me` - Get current user

## Security Features

✅ Tokens in HTTP-only cookies (not accessible via JavaScript)
✅ Automatic token refresh with queue system
✅ No sensitive data in frontend state
✅ Secure redirects on authentication failure
✅ CORS with credentials enabled

## Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

- `@/*` → `src/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/shared/*`
- `@pages/*` → `src/pages/*`

## Code Style

Prettier is configured with:
- 100 character line width
- 2 spaces indentation
- Semicolons enabled
- Double quotes
- ES5 trailing commas

Format code:
```bash
npm run format
```

Check formatting:
```bash
npm run format:check
```

## Usage Examples

### Protecting Routes

```tsx
import { AuthGuard } from "@features/auth/components/AuthGuard";

<Route
  path="/protected"
  element={
    <AuthGuard>
      <YourProtectedComponent />
    </AuthGuard>
  }
/>
```

### Using Auth Hooks

```tsx
import { useLogin, useLogout, useMe } from "@features/auth/api/authApi";

const { data: userData } = useMe();
const loginMutation = useLogin();
const logoutMutation = useLogout();

await loginMutation.mutateAsync({ email, password });
await logoutMutation.mutateAsync();
```

### Accessing Auth State

```tsx
import { useAuthStore } from "@features/auth/store/authStore";

const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

## Next Steps

1. Create `.env` file with backend URL
2. Start backend server
3. Run `npm run dev`
4. Navigate to `http://localhost:3000`
5. Register a new account or login

## Troubleshooting

### CORS Issues
Make sure backend has CORS enabled with credentials:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### 401 Errors
Check that cookies are being sent with requests. The `withCredentials: true` option must be set.

### Path Alias Not Working
Restart the dev server after changing `vite.config.ts` or `tsconfig.json`.

