
// Yeh ek "blueprint" hai ek navigation item ka.
import type { ReactNode } from "react";

// Har link mein yeh teeno cheezein ZAROOR hongi.
export interface NavItem {
  label: string;   // Jo text dikhega — "Dashboard", "Leads"
  path: string;    // URL path — "/dashboard", "/leads"
  icon: ReactNode; // Jo icon dikhega (hum SVG icons use karenge)
}