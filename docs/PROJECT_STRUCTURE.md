# SmartAttend Project Structure

This document explains the organization of the SmartAttend monorepo.

## 📁 Directory Structure

```
smartattend/
├── frontend/                 # React + Vite frontend application
│   ├── src/                  # Source code
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility libraries
│   │   └── ...
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   └── ...
├── backend/                  # Node.js + Express backend API
│   ├── src/                 # Source code
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── index.ts         # Main entry point
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript configuration
├── shared/                   # Shared types and utilities
│   ├── src/                 # Source code
│   │   ├── types.ts         # Shared TypeScript types
│   │   └── index.ts         # Main exports
│   ├── package.json         # Shared dependencies
│   └── tsconfig.json        # TypeScript configuration
├── docs/                     # Documentation
├── package.json              # Root package.json (monorepo config)
└── README.md                 # Project README
```

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18.x
- npm or yarn

### Installation

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install all workspace dependencies:**
   ```bash
   npm run install:all
   ```

### Development

1. **Start both frontend and backend:**
   ```bash
   npm run dev
   ```

2. **Start only frontend:**
   ```bash
   npm run dev:frontend
   ```

3. **Start only backend:**
   ```bash
   npm run dev:backend
   ```

### Building

1. **Build all packages:**
   ```bash
   npm run build
   ```

2. **Build specific package:**
   ```bash
   npm run build:frontend
   npm run build:backend
   ```

## 📦 Package Details

### Frontend (`frontend/`)
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router DOM

### Backend (`backend/`)
- **Framework:** Express.js with TypeScript
- **Database:** MongoDB with Mongoose (planned)
- **Authentication:** JWT
- **Validation:** Zod
- **Security:** Helmet, CORS, Rate limiting

### Shared (`shared/`)
- **Purpose:** Common types and utilities
- **Validation:** Zod schemas
- **Usage:** Imported by both frontend and backend

## 🔧 Development Workflow

1. **Adding new features:**
   - Frontend changes go in `frontend/src/`
   - Backend API changes go in `backend/src/`
   - Shared types go in `shared/src/types.ts`

2. **Type safety:**
   - Use shared types from `@smartattend/shared`
   - Ensure frontend and backend use the same type definitions

3. **Testing:**
   - Frontend tests: `npm run test --workspace=frontend`
   - Backend tests: `npm run test --workspace=backend`

## 📝 Notes

- The monorepo uses npm workspaces for dependency management
- All packages share the same TypeScript configuration patterns
- Environment variables should be configured per workspace
- The shared package ensures type consistency across the application 