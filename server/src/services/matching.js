export function haversineKm(a, b) { const rad = d => d * Math.PI / 180; const dLat = rad(b[1] - a[1]), dLon = rad(b[0] - a[0]); const x = Math.sin(dLat/2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLon/2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x)); }
export function rankWorkers(job, workers) {
  return workers.map(worker => {
    const distance = haversineKm(job.location?.coordinates || [79.5941,17.9689], worker.location?.coordinates || [79.5941,17.9689]);
    const skill = (worker.profession.toLowerCase() === job.profession.toLowerCase() ? 1 : worker.skills?.some(s => `${job.title} ${job.description}`.toLowerCase().includes(s.toLowerCase())) ? .8 : 0);
    const radius = Math.max(1, worker.serviceRadiusKm || 20);
    const proximity = Math.max(0, 1 - distance / radius);
    const budget = job.budgetMax ? Math.max(0, 1 - Math.max(0, worker.hourlyRate - job.budgetMax) / job.budgetMax) : .7;
    const availability = worker.available ? .9 : .15;
    const reputation = ((worker.rating || 0) * (worker.reviewCount || 0) + 4 * 5) / ((worker.reviewCount || 0) + 5) / 5;
    const score = Math.round((skill*.3 + proximity*.25 + budget*.2 + availability*.15 + reputation*.1) * 100);
    const reasons = []; if(skill) reasons.push('matches the requested trade'); reasons.push(`${distance.toFixed(1)} km away`); if(budget >= .8) reasons.push('fits the budget'); if(worker.available) reasons.push('is available');
    return { worker, score, distanceKm: Math.round(distance*10)/10, explanation: reasons.join(', ') };
  }).filter(x => x.score > 10).sort((a,b) => b.score-a.score);
}
