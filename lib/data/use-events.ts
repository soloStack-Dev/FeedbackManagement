// React Query hooks — typed wrappers around the orpc client.
// Server procedures are called through these so data is cached, deduped,
// and gets background-refreshed automatically.
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orpc } from "@/lib/orpc/client";

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------
export function useEvents() {
  return useQuery({
    queryKey: ["events", "list"],
    queryFn: () => orpc.event.list(),
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useEventDetail(id: number | null) {
  return useQuery({
    queryKey: ["events", "detail", id],
    queryFn: () => orpc.event.detail({ id: id! }),
    enabled: id != null,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------
export function useFeedback() {
  return useQuery({
    queryKey: ["feedback", "list"],
    queryFn: () => orpc.feedback.list(),
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useFeedbackByEvent(eventId: number | null) {
  return useQuery({
    queryKey: ["feedback", "byEvent", eventId],
    queryFn: () => orpc.feedback.listByEvent({ eventId: eventId! }),
    enabled: eventId != null,
    staleTime: 0,
    refetchOnMount: "always",
  });
}

// ---------------------------------------------------------------------------
// Mutation — submitting feedback writes to MySQL and returns the new row.
// After success we invalidate the affected queries so Events + Home refresh.
// ---------------------------------------------------------------------------
export function useCreateFeedback() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof orpc.feedback.create>[0]) => orpc.feedback.create(input),
    onSuccess: (_, vars) => {
      // Wait for all affected views to refetch before the form reports success.
      return Promise.all([
        qc.invalidateQueries({ queryKey: ["feedback", "list"] }),
        qc.invalidateQueries({ queryKey: ["feedback", "byEvent", vars.eventId] }),
        qc.invalidateQueries({ queryKey: ["events"] }), // rating/reviewCount changed
      ]);
    },
  });
}