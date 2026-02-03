# CrowdReview

A modern, crowdsourced review platform for local businesses, built with Next.js 16.

## Features

- **Browse Businesses**: Discover local restaurants, shops, and services.
- **Submit Reviews**: Share your experiences with the community.
- **Business Registration**: Register your own business to get listed.
- **Admin Dashboard**: Approve or reject user-submitted reviews.
- **Search**: Find businesses by name or category.
- **Responsive Design**: Looks great on mobile and desktop.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: SQLite (via Prisma)
- **Styling**: Tailwind CSS v4, Glassmorphism
- **UI Components**: Radix UI, Lucide Icons, Framer Motion
- **Language**: TypeScript

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed the database:**
   This populates the SQLite database with initial demo data.
   ```bash
   npx prisma db seed
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
├── app
│   ├── admin           # Admin dashboard routes
│   ├── business        # Business details and registration routes
│   ├── search          # Search functionality
│   ├── actions.ts      # Server Actions (form submissions, DB logic)
│   ├── globals.css     # Global styles & Tailwind
│   └── layout.tsx      # Application root layout
├── components
│   ├── ui              # Reusable UI components (Button, Card, etc.)
│   ├── hero.tsx        # Homepage hero section
│   ├── main-nav.tsx    # Navigation bar
│   └── review-form.tsx # Review submission form
├── lib
│   └── utils.ts        # Helper functions
├── prisma
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Data seeding script
└── public              # Static assets
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the built application.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npx prisma studio`: A GUI to view and edit database data.
