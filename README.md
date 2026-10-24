# Folio — A life, thoughtfully collected.

Folio is a personal experience journal built using the MERN stack. It provides a space for users to collect meaningful moments, discoveries, and experiences in one place.

## Features

- User registration and login
- Secure password hashing using bcryptjs
- JWT-based authentication with HttpOnly cookies
- Protected personal journal
- Create, view, edit, and delete journal entries (CRUD)
- Categories: Book, Film & Series, Place, Skill, and Reflection
- Optional tags for organizing entries
- Responsive interface for desktop and mobile devices
- MongoDB persistence for journal entries
- User-specific journal access to keep entries associated with their owners

## Technology Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Authentication:** JSON Web Tokens (JWT), HttpOnly cookies, bcryptjs
- **Validation:** Zod
- **Deployment:** Vercel

## Project Structure

```text
Folio/
├── client/                  # React frontend
├── server/                  # Express backend
│   └── .env.example         # Backend environment variable template
├── .gitignore               # Excludes dependencies and sensitive files
└── README.md                # Project documentation
```

## Prerequisites

- Node.js and npm
- A MongoDB Atlas database or compatible MongoDB instance
- Git, if cloning the repository

## Local Setup

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd Folio
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Install frontend dependencies

From the project root, run:

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a second terminal in the project root and run:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `server/.env` file using `server/.env.example` as a reference.

Configure the following variables with the values required by your application:

- `MONGODB_URI` — your MongoDB connection string.
- `JWT_SECRET` — a strong, randomly generated secret for signing authentication tokens.
- `PORT` — the backend port for local development, typically `5000`.
- `CLIENT_URL` — the frontend origin allowed by the backend, typically `http://localhost:5173` during local development.

Use your actual configuration values locally. Never commit real database credentials, JWT secrets, or other sensitive environment variables to GitHub.

### 5. Start the backend

From the `server` directory, run:

```bash
npm run dev
```

### 6. Start the frontend

In a separate terminal, from the `client` directory, run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

`http://localhost:5173`

Make sure your database is accessible and the required environment variables are configured before testing the application.

## Usage

1. Register a new account.
2. Log in using your credentials.
3. Access your personal journal.
4. Create entries with a title, category, description, and optional tags.
5. View, edit, or delete journal entries.
6. Log out when finished.

## Testing

The main authentication and journal CRUD flows have been tested through the application's deployed public URL.

Testing includes the core user workflows for registration, login, logout, and journal entry management.

The application has also been tested during local development. Further testing can be performed to verify edge cases, security, and reliability across different devices and environments.

## Deployment

Folio has been deployed on Vercel and is accessible through a public URL.

The deployed application has been tested using its live URL rather than relying solely on local development testing.

For deployment and configuration:

- Configure the required environment variables in the appropriate hosting environment.
- Keep database credentials and authentication secrets out of source control.
- Ensure the frontend and backend URLs, cookie settings, and CORS configuration match the deployed environment.
- Confirm that the deployed backend can connect to MongoDB Atlas.

## Security Notes

- Passwords are hashed before being stored.
- Authentication uses JWTs and HttpOnly cookies.
- Journal operations are scoped to the authenticated user.
- Environment files and sensitive credentials must remain private.
- The `.gitignore` file helps prevent sensitive files and generated dependencies from being committed.
- The `.env.example` file documents required configuration variables using placeholders rather than real secrets.

## Project Status

Folio is a deployed MERN-stack personal experience journal hosted on Vercel. Its main authentication and journal CRUD flows have been tested through the deployed application's public URL.

The application supports account authentication and personal journal entry management, with MongoDB persistence.

Folio is functional and deployed. Additional testing, security reviews, and production-readiness checks may be performed as the project evolves.

## Author

**Izzah Raiyan**
