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
