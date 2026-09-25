"use client";

import { ArrowRightLeft, CalendarDays, Search, Users, MapPin, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function LocationInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value.trim().length < 2) { setItems([]); return; }
      try {
        const response = await fetch(`/api/locations?q=${encodeURIComponent(value.trim())}`);
        const json = await response.json();
        setItems(json.data || []);
        setShow(true);
      } catch { setItems([]); }
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative min-w-0 flex-1">
      <div className="search-label"><MapPin size={15} />{label}</div>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 180)}
        className="search-value"
        placeholder={label === "From" ? "e.g. Delhi" : "e.g. Manali"}
        aria-label={label}
      />
      {show && items.length > 0 && (
        <div className="location-results">
          {items.slice(0, 5).map((x, i) => (
            <button key={`${x.displayName}-${i}`} type="button" onMouseDown={() => { onChange(x.name); setShow(false); }}>
              <strong>{x.name}</strong>
              <span>{x.type} · {x.displayName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DateField({ label, value, min, onChange }: { label: string; value: string; min: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const openPicker = () => {
    const input = ref.current;
    if (!input) return;
    try { input.showPicker?.(); } catch { input.focus(); }
  };
  const display = value ? new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Select date";

  return (
    <button type="button" className="date-field" onClick={openPicker} aria-label={`Select ${label}`}>
      <span className="search-label"><CalendarDays size={15} />{label}</span>
      <span className={`search-value ${value ? "date-selected" : "date-placeholder"}`}>{display}</span>
      <input ref={ref} type="date" value={value} min={min} onChange={e => onChange(e.target.value)} className="date-native-input" tabIndex={-1} aria-hidden="true" />
    </button>
  );
}

export function SearchBox() {
  const router = useRouter();
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [departure, setDeparture] = useState(""); const [returnDate, setReturnDate] = useState(""); const [passengers, setPassengers] = useState(2);
  const today = new Date().toISOString().slice(0, 10);
  const submit = () => router.push(`/explore?${new URLSearchParams({ from, to, departure, return: returnDate, passengers: String(passengers) })}`);

  return (
    <div className="travel-search-shell">
      <div className="travel-search">
        <div className="search-location"><LocationInput label="From" value={from} onChange={setFrom} /></div>
        <button aria-label="Swap locations" type="button" onClick={() => { setFrom(to); setTo(from); }} className="swap-button"><ArrowRightLeft size={16} /></button>
        <div className="search-location"><LocationInput label="To" value={to} onChange={setTo} /></div>
        <DateField label="When" value={departure} min={today} onChange={setDeparture} />
        <div className="search-travelers">
          <span className="search-label"><Users size={15} />Travelers</span>
          <div className="traveler-control">
            <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} aria-label="Remove traveler">−</button>
            <span>{passengers === 1 ? "Solo" : `${passengers} people`}</span>
            <button type="button" onClick={() => setPassengers(Math.min(20, passengers + 1))} aria-label="Add traveler">+</button>
          </div>
        </div>
        <button type="button" onClick={submit} className="search-submit"><Search size={19} /><span>Search</span></button>
      </div>
      <div className="search-return-row">
        <DateField label="Return" value={returnDate} min={departure || today} onChange={setReturnDate} />
        <span className="search-tip"><ChevronDown size={13} /> Add return date for round trips</span>
      </div>
    </div>
  );
}
