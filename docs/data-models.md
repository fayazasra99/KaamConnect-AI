# Data model notes

- User: name, email, password hash, role, optional phone and preferred language.
- Worker: user reference, trade, skills, experience, rate, average rating, review count, city, radius, availability, and GeoJSON location.
- Job: customer reference, title, description, requested trade, skills, optional budget range, schedule, city, location, and status.
- Booking: job, customer and worker references, schedule, proposed and agreed price, state, and offer history.
- Review: completed booking, reviewer, worker, rating, and comment.
- Report: reporter, optional booking, category, details, and review status.

GeoJSON points store coordinates as `[longitude, latitude]`. Password hashes are excluded from ordinary account queries and never returned by routes.
