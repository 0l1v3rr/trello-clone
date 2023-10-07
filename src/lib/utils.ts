import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUsernameFromEmail(email: string) {
  return email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-_.]/g, "");
}

export function generateInitials(name: string) {
  return name
    .toUpperCase()
    .split(" ")
    .slice(0, 2)
    .map((x) => x.at(0))
    .join("");
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-\s]/g, "")
    .replace(/[\s]/g, "-");
}

export function generateRandomHex() {
  return `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}`;
}

export function getTextColor(hex: string): "white" | "black" {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
