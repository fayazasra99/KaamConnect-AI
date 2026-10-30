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
7. To enable the Nemotron guide, set `NEBIUS_API_KEY` in the backend `.env`. Defaults select `nvidia/Nemotron-3_5-Lightning` through `https://api.tokenfactory.nebius.com/v1`; use a model ID enabled for your Token Factory account.

The frontend can also run without the API: it displays labeled local demo listings, supports search/filter and an in-browser demo sign-in, application feedback, and demo job posting. Demo authentication is not secure and is only for preview. With the API, register accounts to use hashed-password authentication, JWT authorization, Mongo-backed job listings, applications, and contractor review that creates bookings. The optional assistant uses NVIDIA Nemotron through Nebius Token Factory when configured.

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
- OAuth, email/SMS notifications, real payment processing, and GPS tracking are not configured. No payment details or location data are collected.
- The Nemotron guide remains inactive until a valid Token Factory API key with access to the selected model is configured. Live inference was not tested here because no API key was provided.
- The interface is English-first, with centralized labels ready for later localization.
- The current design uses a construction photo from Unsplash and Google Fonts, so those visuals need internet access. Live Nemotron replies require a Nebius Token Factory API key.

## Judging: AI and infrastructure disclosure

The in-app assistant is implemented to answer basic KaamConnect and job-search questions with **NVIDIA Nemotron 3.5 Lightning** (`nvidia/Nemotron-3_5-Lightning`) through Nebius Token Factory’s OpenAI-compatible Chat Completions API. The browser calls only the KaamConnect backend; the backend keeps `NEBIUS_API_KEY` server-side, sends up to eight prior conversation messages, caps replies at 350 tokens, and rate-limits assistant requests. The assistant has no job-database access and cannot apply to jobs, make payments, verify workers, or track location.

**Credential and usage status:** no Token Factory API key was supplied in this workspace, so the endpoint could not be called or live-tested here. Set the key as described above; the UI reports when the assistant is not configured. This project uses Token Factory at runtime after configuration, but Token Factory did **not** accelerate the coding workflow for this submission. No other Nebius infrastructure or services were used. No model training or fine-tuning is included.

Official references: [Nebius Token Factory Nemotron inference](https://nebius.com/services/token-factory/models/nvidia-nemotron-models-inference) and [Token Factory API overview](https://dev.nebius.com/token-factory).

## License

The project is released under the repository's [MIT License](../LICENSE), an OSI-approved open source license.

## Production notes

Set `CLIENT_URL` to the deployed frontend origin, `MONGODB_URI` to a secured database, and `JWT_SECRET` to a strong secret. Set `VITE_API_URL` to the deployed API URL before building the frontend (`https://your-api.example/api`). Deploy the static `dist/` output to a static host and run `npm run server` on a Node host. Enforce HTTPS and configure database network access and backups at the hosting provider. Review API rate limits, logging, monitoring, and privacy requirements before launch.
