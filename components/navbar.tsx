"use client";

import Link from "next/link";
import { Compass, Menu, Route, Search, X, Mountain } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const links = [
    { href: "/explore", label: "Explore" },
    { href: "/explore", label: "Trips" },
    { href: "/about", label: "How it Works" },
    { href: "/about", label: "Stories" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className={`site-nav ${onHome ? "site-nav--hero" : "site-nav--solid"}`}>
      <div className="container-x nav-inner">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)} aria-label="ChaloBuddy home">
          <span className="brand-icon"><Mountain size={21} strokeWidth={2.6} /></span>
          <span>Chalo<span className="brand-accent">Buddy</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(({ href, label }) => (
            <Link key={`${href}-${label}`} href={href}>{label}</Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-search" aria-label="Search trips" onClick={() => window.location.href = "/explore"}><Search size={18} /></button>
          <Link href="/login" className="nav-login">Log in</Link>
          <Link href="/signup" className="nav-signup">Sign up</Link>
          <button className="nav-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={`mobile-nav ${onHome ? "mobile-nav--hero" : ""}`}>
          <div className="container-x mobile-nav-inner">
            {links.map(({ href, label }) => <Link key={`${href}-${label}`} href={href} onClick={() => setOpen(false)}>{label}</Link>)}
            <Link href="/trip-planner" onClick={() => setOpen(false)}>Trip Planner</Link>
            <Link href="/list-trip" onClick={() => setOpen(false)}>List a Trip</Link>
            <div className="mobile-nav-buttons">
              <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
              <Link href="/signup" onClick={() => setOpen(false)}>Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
