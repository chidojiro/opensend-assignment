# Dashboard Widget Grid

A flexible and responsive dashboard grid system built with React and TypeScript. This system allows for dynamic widget layouts with features like drag-and-drop, resizing, and aspect ratio preservation.

Demo: https://profound-sawine-a4575d.netlify.app/

## Features

- Authentication and conditional routing

  - Email/password authentication
  - Protected dashboard routes
  - Role-based onboarding page and page access

- Dashboard
  - Responsive grid layout that adapts to different screen sizes
  - Resizable, draggable widgets
  - Aspect ratio preservation during resizing
  - Persist widgets layout between sessions

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Installation

```
npm install
```

### Running the development server

```
npm run dev
```

### Building the production version

```
npm run build
```

### Running the production version

```
npm run preview
```

## Folder Structure

- `src/`: Contains the source code for the application.
  - `features/`: Contains the main features of the application.
    - `dashboard/`: Contains the dashboard component and its related files.
      - `WidgetGridLayout.tsx`: The main component for the dashboard grid layout.
      - `utils.ts`: Utility functions for the dashboard.
      - `types.ts`: Type definitions for the dashboard.
      - ...
    - `auth/`: Contains the authentication component and its related files.
      - `AuthProvider.tsx`: The main component for the authentication provider.
      - `utils.ts`: Utility functions for the authentication.
      - `types.ts`: Type definitions for the authentication.
      - ...
    - ...
  - `core/`: Contains core functionality and shared components.
    - `components/`: Reusable UI components.
    - `hooks/`: Custom React hooks.
    - `utils/`: Utility functions used across the application.

## Major Libraries

- `tailwindcss`: A utility-first CSS framework for rapidly building custom designs.
- `react-grid-layout`: A library for creating a draggable and resizable grid layout.
- `react-hook-form`: A library for building forms with React.
- `react-redux`: A library for managing state in React applications.
- `redux-toolkit`: A library for managing state in React applications.
- `lucide-react`: A library for icons.
- `@radix-ui/*`: A headless UI library for building core components.
