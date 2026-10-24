# Folio — A life, thoughtfully collected.

Folio is a personal experience journal built using the MERN stack. It helps users collect meaningful moments, discoveries, and experiences in one place.

## Features

- User registration and login
- Protected personal journal
- Create, view, edit, and delete journal entries
- Categories: Book, Film & Series, Place, Skill, and Reflection
- Optional tags for organizing entries
- Responsive interface for desktop and mobile devices
- MongoDB persistence for journal entries

## Technology Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens, HttpOnly cookies, bcryptjs
- **Validation:** Zod

## Project Structure

```text
Folio/
├── client/       # React frontend
├── server/       # Express backend
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- A MongoDB Atlas database or compatible MongoDB instance

## Setup

### 1. Install frontend dependencies

Open a terminal in the project root and run:

```bash
cd client
npm install
```

### 2. Install backend dependencies

Open a second terminal in the project root and run:

```bash
cd server
npm install
```

### 3. Configure environment variables
Create a `server/.env` file and configure the following environment variables:

- `MONGODB_URI` — your MongoDB connection string.
- `JWT_SECRET` — a strong, random secret used for authentication.
- `PORT` — the backend server port (use `5000` for local development).
- `CLIENT_URL` — the frontend URL (use `http://localhost:5173` for local development).

Never commit your real database credentials or JWT secrets to GitHub. Use `server/.env.example` as a reference.
### 4. Start the backend

From the `server` directory:

```bash
npm run dev
```

### 5. Start the frontend

In another terminal, from the `client` directory:

```bash
npm run dev
```

Open the local URL printed by Vite in the terminal, usually `http://localhost:5173`.

## Usage

1. Create an account or log in.
2. Open your personal journal.
3. Add an entry with a title, category, description, and optional tags.
4. Edit or delete entries as needed.
5. Log out when finished.

## Security Notes

- Passwords are hashed before being stored.
- Authentication uses an HttpOnly cookie.
- Journal operations are scoped to the authenticated user.
- Keep environment files and secrets private.

## Project Status

The main authentication and journal CRUD flows have been tested locally. Further testing and deployment configuration may be needed before production use.

## Author

Student project.
