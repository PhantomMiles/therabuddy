# Therabuddy - AI Mental Health Companion

Therabuddy is an AI-powered mental health companion built specifically with cultural sensitivity for the African demographic. It uses AI to detect early signs of anxiety, depression, and burnout, offering private, 24/7 support.

## Features

- **🧠 AI Diagnostics:** Real-time detection of anxiety, depression, and burnout signals using evidence-based screening.
- **💬 Safe Chat:** Talk to Therabuddy anytime. It's completely private, non-judgmental, and available 24/7.
- **📊 Mood Insights:** Track emotional patterns over time with a personal wellness dashboard.
- **🛡️ Crisis Detection:** High-risk flags trigger immediate support resources and professional referrals.
- **🌍 Built for Africa:** Culturally sensitive support designed for the realities of African students and professionals.
- **🤲 Coping Tools:** Guided breathing, journaling prompts, and grounding exercises built directly into the app.
- **👨‍⚕️ Therapist Dashboard:** A unified platform for therapists to manage connected patients, view sessions, and track progress securely.

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Database:** SQLite via LibSQL
- **ORM:** Prisma using `@prisma/adapter-libsql`
- **Authentication:** NextAuth (Credentials + Google OAuth)
- **Styling:** TailwindCSS 
- **Icons:** FontAwesome

## Getting Started

First, ensure you have your `.env.local` configured with the necessary environment variables:

```env
DATABASE_URL="file:./therabuddy.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<your-secret-here>"
GOOGLE_ID="<your-google-client-id>"
GOOGLE_SECRET="<your-google-client-secret>"
```

### Database Sync

If you modify the `schema.prisma` file, you must push the changes to the database:
```bash
npx prisma db push
```
*(Note: Prisma automatically generates the client utilizing the new `prisma.config.ts` configuration logic.)*

### Run the Dev Server

Once your environment is set up, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

- **"Property '...' does not exist on type 'PrismaClient'":**
  If you add a new model, run `npx prisma generate` to update the TypeScript types locally.
- **Next.js Turbopack ChunkLoadError:**
  Simply trigger a hard-refresh (`Ctrl + Shift + R`) on your browser.
- **Database Schema Sync Errors / "URL Invalid" Error:**
  If you recently regenerated the Prisma Client or changed the config, Next.js might be caching the old Prisma Client in memory. **Stop the dev server (`Ctrl + C`) and restart it.**
