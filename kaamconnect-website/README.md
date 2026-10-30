# KaamConnect

A responsive job marketplace prototype for daily wage workers and contractors in India. It includes a React + TypeScript + Vite frontend and an Express + TypeScript API backed by MongoDB.

## Requirements

- Node.js 20 or newer and npm
- MongoDB Community Server locally, or a MongoDB Atlas connection string

## Start locally

1. In this folder, run `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` and a long random `JWT_SECRET`. The example URI uses local MongoDB.
3. Start MongoDB.
4. In one terminal run `npm run server` (API at http://localhost:4000).
5. In another terminal run `npm run dev` (website at http://localhost:5173).
6. Optional: run `npm run seed` to add clearly marked example job listings to MongoDB.

The frontend can also run without the API: it displays labeled local demo listings, supports search/filter and an in-browser demo sign-in, application feedback, and demo job posting. Demo authentication is not secure and is only for preview. With the API, register accounts to use hashed-password authentication, JWT authorization, Mongo-backed job listings, applications, and contractor review that creates bookings.

## Main workflows

- Register as a worker or contractor. The API requires an eight-character password and stores a bcrypt hash.
- Workers browse and filter jobs, then apply. The API prevents duplicate applications.
- Contractors post and manage their own listings and review applications. Accepting creates a confirmed booking.
- Booking participants can update work status to in progress or completed.
- Profiles can be updated via `PATCH /api/profile` (worker profile fields are available in the API).

## Project layout

```text
src/                 React pages and responsive styles
server/index.ts      Express API, Mongoose models, auth, validation, workflows
server/seed.ts       Idempotent demo listing seed
```

## Limitations

- Demo-mode applications are kept in this browser only. API-backed job posting, application and booking actions need MongoDB and a signed-in API account.
- OAuth, email/SMS notifications, real payment processing, GPS tracking, and a live AI assistant are not configured. No payment details or location data are collected.
- The assistant integration is intentionally omitted from this initial core workflow; no AI provider is claimed or called.
- The interface is English-first, with centralized labels ready for later localization.
- The current design uses a construction photo from Unsplash and Google Fonts, so those visuals need internet access. No external service credentials are required.

## Judging: AI and infrastructure disclosure

This submitted build **does not call NVIDIA Nemotron or another NVIDIA open model**, and it does not use Nebius Token Factory or other Nebius services. There is no configured model endpoint or API key. The assistant/model integration described in the project brief remains a documented future integration point; no working AI assistant is claimed.

Token Factory did not accelerate this implementation because it was not used. The prototype was built and packaged locally with React, Vite, Express, and MongoDB interfaces. No model training, inference, fine-tuning, or Nebius infrastructure usage is represented here. This disclosure is intentional so judges can distinguish implemented features from planned integrations.

## License

The project is released under the repository's [MIT License](../LICENSE), an OSI-approved open source license.

## Production notes

Set `CLIENT_URL` to the deployed frontend origin, `MONGODB_URI` to a secured database, and `JWT_SECRET` to a strong secret. Set `VITE_API_URL` to the deployed API URL before building the frontend (`https://your-api.example/api`). Deploy the static `dist/` output to a static host and run `npm run server` on a Node host. Enforce HTTPS and configure database network access and backups at the hosting provider. Review API rate limits, logging, monitoring, and privacy requirements before launch.
