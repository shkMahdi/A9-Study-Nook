# StudyNook

A full-stack room booking platform where users can list, discover, and reserve study rooms by the hour.

---

## Features

- **Browse Rooms** — Explore all available study rooms with details like capacity, floor, hourly rate, and amenities
- **Room Listings** — Authenticated users can list their own rooms with photos, descriptions, and amenity tags
- **Hourly Booking** — Book a room by selecting a date, start time, and end time with automatic cost calculation
- **My Bookings** — View and manage all your reservations with booking status tracking
- **My Listings** — Manage rooms you've listed, with options to edit or delete
- **Authentication** — Email/password sign-up and Google OAuth via Better Auth
- **Protected Routes** — JWT-based session handling to secure user-specific pages
- **Toast Notifications** — Real-time feedback for booking, listing, and cancellation actions

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [DaisyUI v5](https://daisyui.com/) | Component library built on Tailwind |
| [React Hook Form](https://react-hook-form.com/) | Form state management and validation |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Spinners](https://www.davidhu.io/react-spinners/) | Loading indicators |

### Backend & Auth
| Technology | Purpose |
|---|---|
| [Better Auth](https://www.better-auth.com/) | Authentication (email/password + Google OAuth) |
| [MongoDB](https://www.mongodb.com/) | Database via MongoDB Atlas |
| JWT Plugin | Token-based session management |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the StudyNook backend server (default: `http://localhost:5000`)
- MongoDB Atlas cluster
- Google OAuth credentials

### Environment Variables

Create a `.env` file in the root with the following:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_secret_here
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
