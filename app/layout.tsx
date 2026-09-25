import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "ChaloBuddy — Travel better. Find your people.",
  description: "Discover trips, meet fellow travelers, and plan journeys together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container-x footer-inner">
            <div>
              <div className="brand-mark footer-brand">Chalo<span>Buddy</span></div>
              <p className="footer-copy">Travel discovery · Trip sharing · Smart planning</p>
            </div>
            <div className="footer-links">
              <a href="/explore">Explore</a>
              <a href="/trip-planner">Trip Planner</a>
              <a href="/list-trip">List a Trip</a>
              <a href="/about">About</a>
            </div>
            <span className="footer-copy">© 2026 ChaloBuddy</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
