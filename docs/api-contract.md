# API contract

Successful responses use `{ "success": true, "data": ... }`. Errors use `{ "success": false, "error": { "code", "message" } }`. Protected endpoints require `Authorization: Bearer <token>`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | API health |
| POST | `/api/auth/register` | Customer, worker, or contractor signup |
| POST | `/api/auth/login` | Password login and JWT issuance |
| GET/PATCH | `/api/auth/me` | Read or update signed-in profile |
| GET | `/api/workers` | Filter professionals by trade, city, rate, availability |
| GET | `/api/workers/:id` | Read worker profile |
| GET/PUT | `/api/workers/me` | Read or update own worker profile |
| PATCH | `/api/workers/me/availability` | Update worker availability |
| POST | `/api/jobs` | Create a job |
| GET | `/api/jobs/mine` | List current user's jobs |
| GET | `/api/jobs/:id/matches` | Return ranked recommendations |
| POST | `/api/bookings` | Request a booking with an initial offer |
| GET | `/api/bookings/mine` | List current user's bookings |
| POST | `/api/bookings/:id/accept` | Accept initial worker offer |
| POST | `/api/bookings/:id/reject` | Reject request |
| POST | `/api/bookings/:id/counter` | Send counter-offer |
| POST | `/api/bookings/:id/confirm` | Confirm worker counter |
| POST | `/api/bookings/:id/decline-counter` | Decline counter |
| POST | `/api/bookings/:id/start` | Start accepted work |
| POST | `/api/bookings/:id/complete` | Complete accepted work |
| POST | `/api/bookings/:id/cancel` | Cancel eligible booking |
| POST | `/api/reviews` | Review a completed booking |
| POST | `/api/reports` | File a safety report |

Invalid booking state transitions return HTTP 409. Booking reads and updates verify the participant.
