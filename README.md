# KaamConnect AI

A full-stack MVP for connecting customers, skilled workers, and contractors in one local services marketplace. The VS Code workspace contains a React/Vite client and an Express/MongoDB API.

## Features

- Customer, worker, and contractor sign-up with bcrypt password hashing and JWT authentication.
- Worker profiles for trade, skills, experience, rates, city, and availability.
- Customer/contractor job posts with optional budgets.
- Transparent match ranking by trade fit (30%), proximity (25%), budget fit (20%), availability (15%), and reputation (10%).
- Booking requests with accept, reject, counter, confirm, cancel, start, and completion actions.
- Reviews for completed bookings and a basic incident report endpoint.
- Responsive dashboard and a simple rule-based service helper.

## Project layout

```text
KaamConnect-AI/
├── client/                 # React + Vite frontend
│   └── src/                # Application, API client, styles
├── server/                 # Express API
│   └── src/                # Models, routes, auth, matching, database
├── docs/                   # API contract, architecture, demo notes
├── .vscode/                # Recommended editor extension
├── package.json            # Workspace commands
├── KaamConnect-AI.code-workspace
└── render.yaml             # Deployment blueprint
```

## Run in VS Code

Requirements: Node.js 20+ and MongoDB (local or Atlas).

1. Open `KaamConnect-AI.code-workspace` or this project folder in VS Code.
2. Run `npm install` from the project root.
3. Copy `server/.env.example` to `server/.env`; set `MONGO_URI` and a random `JWT_SECRET` of at least 32 characters. Optionally copy `client/.env.example` to `client/.env`.
4. Run `npm run seed` to add demo customer and worker profiles.
5. Run `npm run dev`; open `http://localhost:5173`. API health: `http://localhost:5000/health`.

Seed demo accounts use password `Demo@1234`: customer `customer@demo.com`, workers `worker1@demo.com` through `worker5@demo.com`. Local demo credentials must never be used in production.

## Configuration

- Server settings: `server/.env.example`
- Frontend API URL: `client/.env.example`
- REST routes and transitions: [docs/api-contract.md](docs/api-contract.md)
- Data models: [docs/data-models.md](docs/data-models.md)

## MVP limits

Matching is deterministic scoring rather than a hosted AI model. The helper uses keyword rules and listed rates. Live payments/escrow, real-time chat, SMS, media upload, identity verification, and interactive maps are not included. Production deployment needs a MongoDB database, secure secrets, configured `CLIENT_URL` and `VITE_API_URL`, and a security review before real users are onboarded.
