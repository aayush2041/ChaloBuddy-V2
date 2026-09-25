import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, ShieldCheck, Users } from "lucide-react";

export function TripCard({ trip }: { trip: any }) {
  const members = trip._count?.members ?? trip.members?.length ?? 0;
  const days = Math.max(1, Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / 86400000) + 1);
  const styles: Record<string, string> = { ADVENTURE: "Adventure", RELAXED: "Relaxed", BACKPACKING: "Backpacking", NATURE: "Nature", CULTURAL: "Cultural", LUXURY: "Luxury" };
  return (
    <article className="group overflow-hidden rounded-[28px] border border-black/[.07] bg-white shadow-[0_14px_45px_rgba(16,35,27,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(16,35,27,.12)]">
      <div className="relative h-36 overflow-hidden bg-[#e9f5ec] p-5">
        <div className="absolute -right-8 -top-16 h-44 w-44 rounded-full bg-[#ffc94f]/45" />
        <div className="absolute -bottom-24 left-20 h-40 w-40 rounded-full bg-[#1f7a52]/10" />
        <div className="relative flex items-start justify-between gap-3"><span className="badge bg-white/80">{styles[trip.travelStyle] || trip.travelStyle?.toLowerCase()}</span><span className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-extrabold text-[#53615a]">{trip.transport}</span></div>
        <h3 className="relative mt-6 text-[21px] font-black tracking-tight">{trip.startingCity} <span className="text-[#1f7a52]">→</span> {trip.destination}</h3>
      </div>
      <div className="p-5">
        <div className="grid gap-2.5 text-[13px] font-semibold text-[#68756e]">
          <div className="flex items-center gap-2"><CalendarDays size={15} className="text-[#1f7a52]" />{new Date(trip.startDate).toLocaleDateString("en-IN")} · {days} days</div>
          <div className="flex items-center gap-2"><MapPin size={15} className="text-[#1f7a52]" />{trip.destination}</div>
          <div className="flex items-center gap-2"><Users size={15} className="text-[#1f7a52]" />{members}/{trip.groupSize} travelers · {Math.max(0, trip.groupSize - members)} spots left</div>
        </div>
        <div className="my-5 border-t border-black/[.06]" />
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-[11px] font-bold uppercase tracking-wider text-[#8a948f]">Estimated budget</p><p className="mt-1 text-lg font-black">₹{trip.budgetMin.toLocaleString()}–₹{trip.budgetMax.toLocaleString()}</p></div>
          <Link href={`/trips/${trip.id}`} className="group/btn inline-flex items-center gap-1.5 rounded-full bg-[#10231b] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#1f7a52]">View <ArrowUpRight size={15} className="transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /></Link>
        </div>
        {trip.creator?.verification?.verified && <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#1f7a52]"><ShieldCheck size={14} /> Verified creator · {trip.creator.name}</div>}
      </div>
    </article>
  );
}
