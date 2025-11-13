# Stratagentic.ai Landing Page

## Overview

This is a landing page application for Stratagentic.ai, designed to showcase business transformation and automation services. The project implements a minimalist, high-contrast design inspired by has.works, featuring a monochrome aesthetic with blue and teal accents. The hero section features an interactive 3D globe field animation with magnetic particle effects and physics-based rotation. Built as a full-stack TypeScript application using React, Express, and PostgreSQL with Drizzle ORM.

## Application Pages

### Landing Page (/)
- Hero section with interactive 3D globe animation
- Expandable accordion grid showcasing services
- Manifesto section with large typography
- Case study carousel
- Contact form with PostgreSQL backend
- Analytics tracking

### Team Page (/team)
- Ethos section styled like manifesto (large bold text)
- Founder profiles with interactive headshots
- Each headshot cycles through 5 photo variants on click
- Accessible button controls with keyboard support
- Consistent design system with landing page
- Mobile-responsive layout

### FAQ Page (/faq)
- Two-column layout with sticky image
- Left-aligned content (max-width 700px)
- Follows the same minimalist design system

### Case Study Pages
- Individual pages for each case study (/case-studies/*)
  - Manufacturing
  - Logistics
  - Prospect Research
  - Sales Collateral
  - LinkedIn Growth
  - Outreach Engine
  - Sales Deck Automation
- Consistent brutalist design aesthetic with CSS variables
- Each page follows the same structure: challenge, solution, results, system diagram, CTA

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (landing page and 404 page)

**UI Component System**
- Shadcn UI component library (New York style variant) providing a comprehensive set of accessible, customizable components
- Radix UI primitives for accessible, unstyled component foundations
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming with support for light/dark modes

**Design System**
- 8-point spacing grid system with consistent spacing tokens (8px to 80px)
- Fluid typography using clamp() for responsive text sizing
- Custom color palette: black/white dominance with blue/teal accents
  - Primary Blue: #2563EB (hsl 217 84% 53%)
  - Secondary Dark Blue: #051538 (hsl 221 84% 12%)
  - Tertiary Teal: #14B8AB (hsl 175 80% 40%)
  - Tertiary Dark Teal: #063733 (hsl 175 80% 12%)
- Inter font family across all typography
- High-contrast monochrome aesthetic with strategic color accents

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React hooks for local component state
- Custom hooks for common patterns (use-mobile, use-toast)

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the stack
- Session-based request logging middleware

**Development Tooling**
- TSX for running TypeScript files in development
- ESBuild for production bundling
- Vite middleware integration for development with HMR support
- Replit-specific plugins for error overlays and development banners

**API Design**
- RESTful API pattern with `/api` prefix for all routes
- JSON request/response format
- Centralized route registration in `server/routes.ts`

### Data Storage Solutions

**Database**
- PostgreSQL as the primary relational database
- Neon Database serverless PostgreSQL driver for connection pooling and edge compatibility
- Drizzle ORM for type-safe database queries and schema management
- Migrations stored in `/migrations` directory

**Schema Design**
- Users table with UUID primary keys (using PostgreSQL's gen_random_uuid())
- Zod integration via drizzle-zod for runtime validation
- Schema definitions in `shared/schema.ts` for sharing between client and server

**Storage Abstraction**
- IStorage interface pattern for swappable storage implementations
- MemStorage class for in-memory development/testing
- Storage singleton exported from `server/storage.ts`

### Authentication & Authorization

**Current Implementation**
- User schema with username/password fields prepared
- No active authentication middleware implemented yet
- Session infrastructure ready via connect-pg-simple for PostgreSQL-backed sessions

### Build & Deployment

**Development**
- Separate client and server TypeScript compilation
- Vite dev server with Express backend proxy
- Hot module replacement for instant UI updates

**Production Build**
- Vite builds client to `dist/public`
- ESBuild bundles server to `dist/index.js` with ESM format
- Static file serving from built client assets

**Path Resolution**
- TypeScript path aliases: `@/` for client source, `@shared/` for shared code, `@assets/` for assets
- Vite alias configuration matches TypeScript paths for seamless imports

## External Dependencies

### UI Component Libraries
- **Radix UI** - Comprehensive suite of unstyled, accessible component primitives (accordion, dialog, dropdown, select, etc.)
- **Shadcn UI** - Pre-styled component layer built on Radix UI primitives
- **Lucide React** - Icon library for consistent iconography
- **cmdk** - Command palette component
- **Embla Carousel React** - Touch-friendly carousel component
- **Vaul** - Drawer component for mobile interfaces

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework with custom configuration
- **class-variance-authority** - Component variant management
- **clsx & tailwind-merge** - Conditional className utilities
- **PostCSS & Autoprefixer** - CSS processing pipeline

### Data & Forms
- **React Hook Form** - Form state management with validation
- **Zod** - Schema validation library
- **@hookform/resolvers** - Integration between React Hook Form and Zod

### State & Data Fetching
- **TanStack Query** - Server state management, caching, and synchronization
- **date-fns** - Date manipulation and formatting

### Database & ORM
- **@neondatabase/serverless** - Serverless PostgreSQL driver optimized for edge environments
- **Drizzle ORM** - Type-safe SQL ORM with zero-cost abstractions
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **drizzle-kit** - CLI tool for migrations and schema management
- **connect-pg-simple** - PostgreSQL session store for Express

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Development error overlay
- **@replit/vite-plugin-cartographer** - Replit integration for code navigation
- **@replit/vite-plugin-dev-banner** - Development environment banner

### Third-Party Services
- **Neon Database** - Serverless PostgreSQL hosting (configured via DATABASE_URL environment variable)
- **Google Fonts** - Inter font family hosting