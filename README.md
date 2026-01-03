# Barbershop Appointment Booking - Frontend

A modern React-based frontend application for barbershop appointment booking with internationalization support and Material Design components.

## Technology Stack

- **Framework**: [React](https://react.dev/) - A JavaScript library for building user interfaces
- **Routing**: [React Router](https://reactrouter.com/) - Declarative routing for React applications
- **HTTP Client**: [Axios](https://axios-http.com/) - Promise-based HTTP client for API requests
- **State Management**: [TanStack Query](https://tanstack.com/query) - Powerful data synchronization for React
- **UI Components**: [Material-UI (MUI)](https://mui.com/) - React components implementing Google's Material Design
- **Internationalization**: [react-i18next](https://react.i18next.com/) - Internationalization framework for React

## Project Overview

This frontend application provides an intuitive user interface for the barbershop appointment booking system, allowing customers to easily browse services, book appointments, and manage their bookings.

### Key Features

- **Responsive Design**: Mobile-first approach with Material Design components
- **Multi-language Support**: Full internationalization with language switching
- **Real-time Updates**: Live appointment availability using TanStack Query
- **User Authentication**: Secure login and registration system
- **Appointment Management**: Book, reschedule, and cancel appointments
- **Service Catalog**: Browse available services with pricing and descriptions
- **Barber Profiles**: View barber information and specializations
- **Schedule View**: Interactive calendar for appointment selection
- **User Dashboard**: Personal appointment history and profile management

### Main Pages

- **Home**: Landing page with service overview and quick booking
- **Services**: Complete catalog of available barbershop services
- **Booking**: Step-by-step appointment booking process
- **Barbers**: Staff profiles and availability
- **Dashboard**: User account management and appointment history
- **Login/Register**: Authentication pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd TIN_frontend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5001
REACT_APP_DEFAULT_LANGUAGE=en
REACT_APP_SUPPORTED_LANGUAGES=en,pl,ru
```

## Available Languages

The application supports multiple languages:
- **English** (en) - Default
- **Russian** (ru)

Language files are located in `src/locales/`

## API Integration

The frontend communicates with the backend API using Axios and TanStack Query:

- **Base URL**: `http://localhost:3001`
- **Authentication**: JWT tokens stored in cookies
- **Caching**: Intelligent caching with TanStack Query
- **Error Handling**: Global error interceptors and user-friendly messages

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Modal, etc.)
│   ├── forms/           # Form components
│   └── layout/          # Layout components (Header, Footer, etc.)
├── pages/               # Page components
│   ├── Home/
│   ├── Services/
│   ├── Booking/
│   ├── Dashboard/
│   └── Auth/
├── hooks/               # Custom React hooks
├── services/            # API service functions
├── store/               # TanStack Query configuration
├── locales/             # Translation files
│   ├── en/
│   ├── pl/
│   └── ru/
├── theme/               # Material-UI theme configuration
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── App.tsx              # Main application component
```

### Key Dependencies

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.11.0",
    "axios": "^1.13.2",
    "@tanstack/react-query": "^5.90.16",
    "@mui/material": "^7.3.6",
    "@mui/icons-material": "^7.3.6",
    "i18next": "^25.6.1",
    "react-i18next": "^16.5.0"
  },
  "devDependencies": {
    "vite": "^5.1.2",
    "@vitejs/plugin-react": "^5.1.1"
  }
}

```

### Material-UI Theme

The application uses a custom Material-UI theme with:
- **Primary Color**: Barbershop brand colors
- **Typography**: Custom font stack optimized for readability
- **Breakpoints**: Mobile-first responsive design
- **Dark Mode**: Optional dark theme support

### TanStack Query Setup

Data fetching is handled by TanStack Query with:
- **Automatic Caching**: Intelligent background updates
- **Error Boundaries**: Graceful error handling
- **Loading States**: Consistent loading indicators
- **Optimistic Updates**: Immediate UI feedback

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Testing

The project includes:
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: End-to-end user flow testing

Run tests with:
```bash
npm test
```
## License

Bro chill it's uni project (MIT)
