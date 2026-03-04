# Mini LMS - Contour Education Technical Assessment

A lightweight Learning Management System (LMS) where students can sign up, book consultations, and track completion status.

This project focuses on secure full-stack delivery with `Next.js` and `Supabase`, including row-level data isolation and server-side validation.

## Highlights

- Email/password authentication with Supabase Auth
- Secure dashboard with per-user consultation data
- Consultation booking with validation and past-date prevention
- Completion toggle for each consultation
- Defense-in-depth security via middleware, server checks, and RLS

## Tech Stack

- Framework: `Next.js` (App Router)
- Language: `TypeScript`
- Database: `PostgreSQL` (Supabase)
- Authentication: `Supabase Auth` (password-based)
- Validation: `Zod`
- Supabase libraries:
  - `@supabase/supabase-js`
  - `@supabase/ssr`
- Local tooling: `Supabase CLI` + `Docker`

## Features

### Authentication

Users can:

- Sign up with email and password
- Log in
- Log out

UX support includes:

- Confirm password check
- Friendly error messages
- Form loading states

Sessions are managed using Supabase SSR and cookies.

### Student Dashboard

After login, students can:

- View their consultations
- See consultation details
- See complete/incomplete status
- Toggle complete/incomplete

Consultations are sorted by scheduled date.

### Consultation Booking

Students can create a consultation with:

- First name
- Last name
- Reason for consultation
- Date and time

Validation includes:

- Required field checks
- Minimum reason length
- Prevention of booking in the past

## Security

Security is implemented in layers.

### Row Level Security (RLS)

RLS is enabled on all user-owned tables.

- `profiles`: users can only access records where `auth.uid() = id`
- `consultations`: users can only access records where `auth.uid() = user_id`

This prevents cross-user data access even for direct API calls.

### Defense in Depth

- Middleware route protection
- Server-side session validation
- Database-level RLS policies

## Database Schema

### `profiles`

Stores non-auth profile metadata.

| Column | Type |
| --- | --- |
| `id` | `uuid` (PK, references `auth.users`) |
| `first_name` | `text` |
| `last_name` | `text` |
| `phone` | `text` (optional) |
| `created_at` | `timestamptz` |

### `consultations`

Stores booked consultations.

| Column | Type |
| --- | --- |
| `id` | `uuid` (PK) |
| `user_id` | `uuid` (FK -> `auth.users`) |
| `first_name` | `text` |
| `last_name` | `text` |
| `reason` | `text` |
| `scheduled_at` | `timestamptz` |
| `is_complete` | `boolean` |
| `created_at` | `timestamptz` |

Indexes:

- `user_id`
- `scheduled_at`

## Project Structure

```text
src
├── app
│   ├── actions
│   │   ├── auth.ts
│   │   └── consultations.ts
│   ├── consultations
│   ├── dashboard
│   ├── login
│   └── signup
├── lib
│   ├── supabase
│   │   ├── client.ts
│   │   └── server.ts
│   └── validation
│       └── consultation.ts
middleware.ts
supabase/
└── migrations/
```

## Local Development

### Prerequisites

Install:

- Node.js
- Docker Desktop
- Supabase CLI

Verify:

```bash
docker --version
supabase --version
```

### 1. Install dependencies

```bash
npm install
```

### 2. Start local Supabase stack

```bash
supabase start
```

This starts local PostgreSQL, Auth, API, Studio, Storage, and Realtime services.

### 3. Configure environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_KEY
```

Use the publishable key printed by `supabase start`.

### 4. Apply migrations

```bash
supabase db reset
```

### 5. Start the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Design Decisions

### Password Authentication

Password auth was chosen because it:

- matches common UX expectations
- is easy to test locally
- avoids external email infrastructure during assessment

In production, email verification would typically be enabled.

### Separate `profiles` Table

User metadata is stored outside `auth.users` to:

- separate identity/auth from app profile data
- support future profile feature growth

### Server Actions for Mutations

Critical mutations are implemented with Next.js Server Actions:

- signup
- login
- consultation creation
- completion toggle

This keeps write logic server-side and easier to secure.

## Potential Improvements

- Add automated tests (`Vitest`, `Playwright`)
- Enable email verification
- Add consultation edit/cancel flows
- Add tutor/admin roles and interfaces
- Add pagination for large consultation lists
- Add calendar-based consultation view

## Summary

This project demonstrates:

- secure full-stack architecture
- Supabase migrations and local workflow
- database-level authorization with RLS
- server-side validation and protected mutations
- clean App Router implementation with modern Next.js patterns
