// Small shared UI helpers + formatting utilities used by pages/components.
import type { Event } from "@/lib/db/schema";

// Present a MySQL DATETIME value (string or Date) as a friendly date.
export function formatDate(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(String(input).replace(" ", "T") + "Z");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(String(input).replace(" ", "T") + "Z");
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

// Relative time for the live pulse (e.g. "2m ago").
export function timeAgo(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(String(input).replace(" ", "T") + "Z");
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Short rating bar label helper.
export function ratingBars(event: Event) {
  return [
    { label: "Content Quality", score: event.rating },
    { label: "Speaker Performance", score: Math.min(5, Math.max(1, event.rating - 0.0)) },
    { label: "Venue & Logistics", score: Math.min(5, Math.max(1, event.rating - 0.1)) },
  ];
}

export const clamp = (v: number, min = 1, max = 5) => Math.min(max, Math.max(min, v));