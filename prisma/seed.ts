import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await bcrypt.hash("Demo@12345", 12);
  const demo = await prisma.user.upsert({ where: { email: "demo@chalobuddy.app" }, update: {}, create: { email: "demo@chalobuddy.app", name: "Aarav Sharma", passwordHash, profile: { create: { bio: "Weekend mountain chaser and slow-travel fan.", city: "Delhi", travelStyle: "ADVENTURE", tripsCompleted: 8, citiesVisited: 21, countriesVisited: 2, companionRating: 4.9 } }, verification: { create: { verified: true, verifiedAt: new Date() } } } });
  const names = ["Riya Mehta", "Kabir Singh", "Ananya Rao", "Vihaan Kapoor"];
  const styles = ["BACKPACKING", "NATURE", "CULTURAL", "RELAXED"] as const;
  const creators = [] as any[];
  for (let i = 0; i < names.length; i++) creators.push(await prisma.user.upsert({ where: { email: `traveler${i + 1}@chalobuddy.app` }, update: {}, create: { email: `traveler${i + 1}@chalobuddy.app`, name: names[i], passwordHash, profile: { create: { bio: "Travel enthusiast looking for good company.", city: i % 2 ? "Mumbai" : "Delhi", travelStyle: styles[i], companionRating: 4.7 - i * 0.1 } }, verification: { create: { verified: i < 2 } } } }));
  const specs: any[] = [
    [demo, "Delhi", "Manali", 6500, 11000, "Adventure in the Himalayas", "ADVENTURE", "CAR", "HOTEL"],
    [creators[0], "Delhi", "Rishikesh", 3500, 7000, "Rafting, cafes and river sunsets.", "ADVENTURE", "BUS", "HOSTEL"],
    [creators[1], "Mumbai", "Goa", 7000, 14000, "Beach weekend with a relaxed pace.", "RELAXED", "TRAIN", "HOTEL"],
    [creators[2], "Bangalore", "Coorg", 4500, 8500, "Coffee estates and waterfalls.", "NATURE", "CAR", "HOMESTAY"],
    [creators[3], "Delhi", "Jaipur", 3000, 6500, "Culture, food and old-city walks.", "CULTURAL", "TRAIN", "HOTEL"]
  ];
  for (let i = 0; i < specs.length; i++) { const [creator, from, to, min, max, desc, style, transport, accommodation] = specs[i]; const start = new Date(Date.now() + 86400000 * (10 + i * 4)); const end = new Date(start.getTime() + 86400000 * 3); const exists = await prisma.trip.findFirst({ where: { creatorId: creator.id, destination: to } }); if (!exists) await prisma.trip.create({ data: { creatorId: creator.id, title: `${from} → ${to} escape`, startingCity: from, destination: to, startDate: start, endDate: end, budgetMin: min, budgetMax: max, groupSize: 4 + (i % 2), description: desc, included: "Shared planning and group coordination.", excluded: "Personal shopping and optional activities.", transport, accommodation, travelStyle: style, intensity: "MODERATE", status: "GROUP_FORMING", room: { create: {} } } }); }
  console.log(`Seeded demo user: ${demo.email}`);
}
main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
