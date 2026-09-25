export function buildItinerary(input: { destination: string; startingLocation: string; days: number; budget: number; style: string; transport: string; accommodation: string }) {
  const days = Math.max(1, Math.min(14, input.days));
  const perDay = Math.round(input.budget / days);
  return Array.from({ length: days }, (_, i) => ({ dayNumber: i + 1, title: i === 0 ? "Arrival & explore" : i === days - 1 ? "Return journey" : `${input.style} day`, items: [
    { time: "08:30", activity: i === 0 ? `Travel from ${input.startingLocation}` : "Breakfast & local start", location: input.destination, estimatedCost: Math.round(perDay * 0.15) },
    { time: "11:00", activity: i === 0 ? "Check-in and settle" : "Signature sightseeing / activity", location: input.destination, estimatedCost: Math.round(perDay * 0.35) },
    { time: "15:00", activity: "Lunch + flexible exploration", location: input.destination, estimatedCost: Math.round(perDay * 0.2) },
    { time: "19:00", activity: i === days - 1 ? "Prepare for return" : "Dinner & evening walk", location: input.destination, estimatedCost: Math.round(perDay * 0.3) }
  ] }));
}
