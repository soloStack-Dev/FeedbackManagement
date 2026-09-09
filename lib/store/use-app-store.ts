// zustand store — EventFlow shared client state.
// Holds the Events-page filter bar, the Feedback-form draft, and the event
// currently selected for feedback (e.g. via "Give Feedback" on an event card).
import { create } from "zustand";

// ---------------------------------------------------------------------------
// Events page filter state
// ---------------------------------------------------------------------------
export type EventStatus = "All Events" | "Upcoming" | "Past" | "Feedback Open";
export type EventCategory =
  | "All Categories"
  | "Technology & AI"
  | "Web Development"
  | "Design & UX"
  | "Startups & Biz";
export type SortOrder = "Most Recent" | "Top Rated" | "Most Feedback";

export const STATUS_PILLS: EventStatus[] = ["All Events", "Upcoming", "Past", "Feedback Open"];
export const CATEGORY_PILLS: EventCategory[] = [
  "All Categories",
  "Technology & AI",
  "Web Development",
  "Design & UX",
  "Startups & Biz",
];
export const SORT_OPTIONS: SortOrder[] = ["Most Recent", "Top Rated", "Most Feedback"];

interface EventFilterState {
  search: string;
  status: EventStatus;
  category: EventCategory;
  sort: SortOrder;
  setSearch: (search: string) => void;
  setStatus: (status: EventStatus) => void;
  setCategory: (category: EventCategory) => void;
  setSort: (sort: SortOrder) => void;
  resetFilters: () => void;
}

export const useEventStore = create<EventFilterState>((set) => ({
  search: "",
  status: "All Events",
  category: "All Categories",
  sort: "Most Recent",
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setCategory: (category) => set({ category }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({ search: "", status: "All Events", category: "All Categories", sort: "Most Recent" }),
}));

// ---------------------------------------------------------------------------
// Feedback form state (draft) + which event is being rated
// ---------------------------------------------------------------------------
export interface FeedbackDraft {
  eventId: number | null;
  attendeeName: string;
  attendeeRole: string;
  overallRating: number;
  contentQuality: number;
  speakerPerformance: number;
  venueLogistics: number;
  likedMost: string;
  couldImprove: string;
  wouldRecommend: boolean;
  notes: string;
}

export const EMPTY_DRAFT: FeedbackDraft = {
  eventId: null,
  attendeeName: "",
  attendeeRole: "",
  overallRating: 0,
  contentQuality: 0,
  speakerPerformance: 0,
  venueLogistics: 0,
  likedMost: "",
  couldImprove: "",
  wouldRecommend: true,
  notes: "",
};

interface FeedbackState {
  draft: FeedbackDraft;
  isSubmitting: boolean;
  submitResult: "idle" | "success" | "error";
  lastErrorMessage: string;
  setDraft: (patch: Partial<FeedbackDraft>) => void;
  resetDraft: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmitResult: (result: FeedbackState["submitResult"], message?: string) => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  draft: EMPTY_DRAFT,
  isSubmitting: false,
  submitResult: "idle",
  lastErrorMessage: "",
  setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
  resetDraft: () => set({ draft: EMPTY_DRAFT, submitResult: "idle", lastErrorMessage: "" }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setSubmitResult: (submitResult, message = "") =>
    set({ submitResult, lastErrorMessage: message }),
}));