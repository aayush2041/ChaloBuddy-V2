import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Compass, Heart, Mountain, ShieldCheck, Sparkles, Users, MapPin, Route, Play, Instagram, Youtube, Twitter } from "lucide-react";
import { SearchBox } from "@/components/search-box";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const categories = [
  ["Mountains", "photo-1464822759023-fed622ff2c3b"], ["Beaches", "photo-1507525428034-b723cf961d3e"],
  ["Trekking", "photo-1551632811-561732d1e306"], ["Road Trips", "photo-1530789253388-582c481c54b0"],
  ["Cultural", "photo-1539650116574-75c0c6d73f6e"], ["Backpacking", "photo-1527631746610-bca00a040d60"],
  ["International", "photo-1500534623283-312aade485b7"], ["Weekend Getaways", "photo-1469474968028-56623f02e42e"],
];

const trips = [
  { title: "Spiti Valley Expedition", meta: "Himachal Pradesh", date: "15 – 20 Oct, 2026", price: "₹12,999", match: "94% Match", image: "photo-1500530855697-b586d89ba3ee" },
  { title: "Kasol & Tosh Getaway", meta: "Himachal Pradesh", date: "10 – 13 Oct, 2026", price: "₹6,499", match: "Easy", image: "photo-1464278533981-50106e6176b1" },
  { title: "Goa Beach Escape", meta: "Goa", date: "20 – 25 Nov, 2026", price: "₹9,999", match: "88% Match", image: "photo-1510414842594-a61c69b5ae57" },
  { title: "Kedarkantha Trek", meta: "Uttarakhand", date: "5 – 12 Dec, 2026", price: "₹8,999", match: "Challenging", image: "photo-1464822759023-fed622ff2c3b" },
];

const steps = [
  ["1", "Discover", "Find trips or create your own", Compass], ["2", "Connect", "Meet verified travelers", Users],
  ["3", "Plan Together", "Chat, plan and organize as a group", Route], ["4", "Travel", "Turn plans into unforgettable memories", Mountain],
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-reference">
        <div className="hero-backdrop" />
        <div className="hero-overlay" />
        <div className="container-x hero-reference-content">
          <div className="hero-social-proof"><span className="mini-avatars"><i /><i /><i /></span><span>10K+ travellers already exploring together</span></div>
          <div className="hero-copy">
            <div className="hero-hand hero-hand-left">Good<br />People<br />Better<br />Journeys ♡</div>
            <div className="hero-hand hero-hand-right">Strangers Today<br />Travel Buddies Tomorrow<br />♡</div>
            <p className="eyebrow-light"><Sparkles size={14} /> CHALOBUDDY COMMUNITY</p>
            <h1>Travel Further<br /><span>Together</span></h1>
            <p className="hero-description">Discover trips, meet like-minded people, plan together<br className="desktop-only" /> and turn travel dreams into real adventures.</p>
            <div className="hero-buttons"><Link href="/explore" className="hero-primary">Explore Trips <ArrowRight size={17} /></Link><Link href="/about" className="hero-secondary"><Play size={15} fill="currentColor" /> Watch Video</Link></div>
          </div>
          <div className="hero-trust-row">
            <div><ShieldCheck /><span><b>Verified Travellers</b>Travel with trust</span></div>
            <div><Heart /><span><b>Smart Matching</b>Find your people</span></div>
            <div><Mountain /><span><b>Real Experiences</b>Not just bookings</span></div>
            <div><Users /><span><b>A Global Community</b>More than 10,000+ explorers</span></div>
          </div>
        </div>
        <div className="hero-signpost"><span>EXPLORE</span><span>CONNECT</span><span>PLAN</span><span>TRAVEL</span><span>BELONG</span></div>
        <div className="hero-bottom-note">Collect<br />Moments<br />Not Things ♡</div>
      </section>

      <div className="search-overlap"><SearchBox /></div>

      <main>
        <section className="container-x category-strip">
          {categories.map(([title, img]) => <Link href={`/explore?style=${encodeURIComponent(title)}`} className="category-tile" key={title} style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(0,0,0,.65)), url(${image(img)})` }}><span>{title}</span></Link>)}
        </section>

        <section className="container-x section-block">
          <div className="section-heading"><div><p className="section-kicker">FEATURED TRIPS</p><h2>Popular Trips <span className="scribble">↗</span></h2><p>Handpicked adventures by our community</p></div><Link href="/explore" className="view-all">View All Trips <ArrowRight size={15} /></Link></div>
          <div className="trip-showcase-grid">
            {trips.map((trip, index) => <Link href="/explore" key={trip.title} className="showcase-card">
              <div className="showcase-image" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.72)), url(${image(trip.image)})` }}><span className={`trip-tag ${index === 3 ? "trip-tag--red" : ""}`}>{trip.match}</span><span className="heart-chip"><Heart size={16} /></span><div className="showcase-copy"><h3>{trip.title}</h3><span><MapPin size={13} /> {trip.meta}</span><span><Sparkles size={13} /> {trip.date}</span></div></div>
              <div className="showcase-footer"><div className="tiny-avatars"><i /><i /><i /><b>+{index + 8}</b></div><div><strong>{trip.price}</strong><small>per person</small></div></div>
            </Link>)}
          </div>
        </section>

        <section className="container-x how-section">
          <div className="how-copy"><p className="section-kicker">HOW IT WORKS</p><h2>From Strangers to <span>Travel Buddies</span></h2><p>A simple way to find, connect and travel with like-minded people.</p><div className="steps-grid">{steps.map(([n, title, text, Icon]) => { const StepIcon = Icon as any; return <div className="step" key={String(n)}><div className="step-icon"><StepIcon size={20} /></div><b>{n}. {title}</b><p>{text}</p></div>; })}</div></div>
          <div className="polaroid-wall"><div className="polaroid p1" style={{ backgroundImage: `url(${image("photo-1469474968028-56623f02e42e")})` }} /><div className="polaroid p2" style={{ backgroundImage: `url(${image("photo-1519681393784-d120267933ba")})` }} /><div className="polaroid p3" style={{ backgroundImage: `url(${image("photo-1500534623283-312aade485b7")})` }} /><div className="polaroid-note">Same<br />Passion<br /><b>New Friends</b> ♡</div></div>
        </section>

        <section className="stories-section">
          <div className="container-x stories-inner"><div className="stories-intro"><p className="section-kicker section-kicker--light">OUR COMMUNITY</p><h2>Real People<br />Real Stories</h2><p>Because the best journeys are shared.</p><Link href="/about" className="outline-light">View All Stories <ArrowRight size={15} /></Link></div><div className="story-cards"><article><p>“Met amazing people on my Spiti trip. It felt like travelling with friends I’ve known forever.”</p><b>Riya S.</b><span>Delhi, India · ★★★★★</span></article><article><p>“ChaloBuddy made solo travel so easy. Found a group, great vibes, and a lifetime memory.”</p><b>Arjun M.</b><span>Bengaluru, India · ★★★★★</span></article><article><p>“Not just a travel platform, but a community. Already planning my next trip here!”</p><b>Meera K.</b><span>Mumbai, India · ★★★★★</span></article></div></div>
        </section>

        <section className="cta-band"><div className="container-x cta-inner"><div><p>YOUR NEXT ADVENTURE IS WAITING</p><h2>Ready for your next adventure?</h2><span>Join explorers finding their people.</span></div><Link href="/signup">Sign up now <ArrowRight size={16} /></Link></div></section>
      </main>
    </div>
  );
}
