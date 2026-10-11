# Architecture

React/Vite provides the browser client. It calls an Express JSON API with a JWT bearer token. The API hashes passwords with bcrypt, checks user roles, validates request payloads, and stores records in MongoDB through Mongoose.

Customer: register → post a job → inspect ranked matches → request a booking → receive worker response → confirm a counter-offer or complete the accepted work.

Worker: register → complete the trade profile → review booking requests → accept, reject, or counter → start accepted work.

The match score is deterministic and explainable. It ranks trade fit, proximity, budget, availability, and reputation; it does not call a hosted AI model.
