// Events page — discovery grid built from Context/event-page-build-prompt.md.
"use client";

import { useMemo, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EventCard, EventCardSkeleton } from "@/components/events/EventCard";
import { EventDetailDialog } from "@/components/events/EventDetailDialog";
import { EventFilters } from "@/components/events/EventFilters";
import { StarRating } from "@/components/ui/EventStars";
import { useEvents, useFeedback } from "@/lib/data/use-events";
import { useEventStore } from "@/lib/store/use-app-store";
import { useReveal } from "@/lib/hooks/use-animations";
import { timeAgo } from "@/lib/utils";

const PAGE_SIZE = 6;

export default function EventsPage() {
  const reveal = useReveal<HTMLDivElement>();
  const { data = [], isPending } = useEvents();
  const { data: feedback = [], isPending: feedbackPending } = useFeedback();
  const { search, status, category, sort, resetFilters } = useEventStore();
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [detailId, setDetailId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = data.filter((e) => {
      if (status !== "All Events" && e.status !== status) return false;
      if (category !== "All Categories" && e.category !== category) return false;
      if (q) {
        const haystack = `${e.title} ${e.description} ${e.venue} ${e.city} ${e.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
    const sorted = [...list];
    if (sort === "Top Rated") sorted.sort((a, b) => b.rating - a.rating);
    else if (sort === "Most Feedback") sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    else sorted.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    return sorted;
  }, [data, search, status, category, sort]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const feedbackCount = data.reduce((total, event) => total + event.reviewCount, 0);
  const recentFeedback = feedback.slice(0, 6);

  const headerStats = [
    { icon: CalendarMonthIcon, tint: "rgba(99,102,241,0.12)", color: "#4f46e5", value: data.length.toLocaleString(), label: "Curated events" },
    { icon: RateReviewIcon, tint: "rgba(124,58,237,0.12)", color: "#7c3aed", value: feedbackCount.toLocaleString(), label: "Feedback threads" },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 6, md: 8 } }} ref={reveal}>
          {/* Header */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "flex-end", justifyContent: "space-between", mb: 5 }}>
            <Box>
              <SectionLabel>REAL-TIME SENTIMENT & VERIFICATION</SectionLabel>
              <Typography variant="h1" sx={{ fontSize: { xs: 34, md: 46 }, lineHeight: 1.1, mb: 1.5 }}>
                Explore Events
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: 16.5, maxWidth: 520, lineHeight: 1.6 }}>
                Browse technology, design, and developer community events with honest, verified attendee reviews — from the people who were actually there.
              </Typography>
            </Box>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 1.75, flexWrap: "wrap" }}>
              {headerStats.map((s) => {
                const Icon = s.icon;
                return (
                  <Box
                    key={s.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      px: 2.5,
                      py: 1.8,
                      borderRadius: "16px",
                      background: "#ffffff",
                      border: "1px solid #eef0f5",
                      boxShadow: "0 8px 22px rgba(15,23,42,0.05)",
                    }}
                  >
                    <Box sx={{ width: 38, height: 38, borderRadius: "12px", display: "grid", placeItems: "center", bgcolor: s.tint, color: s.color }}>
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#111827", lineHeight: 1 }}>{s.value}</Typography>
                      <Typography sx={{ fontSize: 12.5, color: "#6b7280", mt: 0.4 }}>{s.label}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Filters */}
          <EventFilters />

          {/* Result count */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 4, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: 15 }}>
              Showing {shown.length} verified events
            </Typography>
            {isPending && <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>(loading…)</Typography>}
          </Box>

          {/* Grid */}
          <Grid container spacing={3}>
            {isPending
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`sk-${i}`}>
                    <EventCardSkeleton />
                  </Grid>
                ))
              : shown.map((e) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={e.id}>
                    <EventCard event={e} onViewDetails={(id) => setDetailId(id)} />
                  </Grid>
                ))}
          </Grid>

          {/* Empty state */}
          {!isPending && shown.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8, color: "#6b7280" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>No events match those filters</Typography>
              <Typography sx={{ mt: 0.5, mb: 2 }}>Try clearing the search or switching categories.</Typography>
              <Button variant="outlined" color="primary" onClick={resetFilters}>
                Reset Filters
              </Button>
            </Box>
          )}

          {/* Load more */}
          {hasMore && (
            <Box sx={{ textAlign: "center", mt: 6 }}>
              <Button
                variant="outlined"
                endIcon={<ExpandMoreIcon />}
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                sx={{ px: "26px", py: "10px", borderRadius: 999, borderColor: "#dde0f0", color: "#4f46e5" }}
              >
                Load More Events
              </Button>
              <Typography sx={{ mt: 1.5, color: "#9ca3af", fontSize: 13.5 }}>
                Displaying {shown.length} of {filtered.length} curated tech gatherings
              </Typography>
            </Box>
          )}

          {/* Stored feedback retrieved through orpc and shown with its event. */}
          <Box sx={{ mt: { xs: 7, md: 9 } }}>
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, mb: 3 }}>
              <Box>
                <SectionLabel>LIVE FROM THE DATABASE</SectionLabel>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: 24, md: 30 }, color: "#111827", lineHeight: 1.15 }}>
                  Recent attendee feedback
                </Typography>
              </Box>
              {feedbackPending && <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>Loading feedback…</Typography>}
            </Box>

            {!feedbackPending && recentFeedback.length === 0 ? (
              <Box sx={{ p: 3, borderRadius: "16px", border: "1px solid #eef0f5", color: "#6b7280" }}>
                No feedback has been stored yet.
              </Box>
            ) : (
              <Grid container spacing={2}>
                {recentFeedback.map((item) => {
                  const event = data.find((entry) => entry.id === item.eventId);
                  return (
                    <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                      <Box sx={{ height: "100%", p: { xs: 2.25, md: 2.75 }, borderRadius: "18px", border: "1px solid #eef0f5", background: "#fff", boxShadow: "0 8px 22px rgba(15,23,42,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 1.25 }}>
                          <Box>
                            <Typography sx={{ fontWeight: 750, fontSize: 15, color: "#111827" }}>
                              {item.attendeeName}
                              {item.attendeeRole && <Typography component="span" sx={{ color: "#9ca3af", fontSize: 12.5, ml: 0.75 }}>· {item.attendeeRole}</Typography>}
                            </Typography>
                            <Typography sx={{ color: "#6b7280", fontSize: 12.5, mt: 0.35 }}>{event?.title ?? "Event feedback"}</Typography>
                          </Box>
                          <Typography sx={{ color: "#9ca3af", fontSize: 12, whiteSpace: "nowrap" }}>{timeAgo(item.createdAt)}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.25 }}>
                          <StarRating value={item.overallRating} size={16} />
                          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: "#111827" }}>{item.overallRating}/5</Typography>
                          <Typography sx={{ color: item.wouldRecommend ? "#059669" : "#dc2626", fontSize: 12.5, fontWeight: 600 }}>
                            {item.wouldRecommend ? "Recommends" : "Would not recommend"}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: "#6b7280", fontSize: 12.5, lineHeight: 1.55, mb: 1.25 }}>
                          Content {item.contentQuality}/5 · Speakers {item.speakerPerformance}/5 · Logistics {item.venueLogistics}/5
                        </Typography>
                        {item.likedMost && <Typography sx={{ color: "#374151", fontSize: 13.5, lineHeight: 1.55 }}><b>Liked:</b> {item.likedMost}</Typography>}
                        {item.couldImprove && <Typography sx={{ color: "#4b5563", fontSize: 13.5, lineHeight: 1.55 }}><b>Improve:</b> {item.couldImprove}</Typography>}
                        {item.notes && <Typography sx={{ color: "#9ca3af", fontSize: 12.5, mt: 0.5 }}>{item.notes}</Typography>}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Box>

        {/* Trust highlights */}
        <Box sx={{ background: "#ffffff", borderTop: "1px solid #eef0f5" }}>
          <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 6, md: 7 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 4 }}>
            {[
              { icon: VerifiedUserIcon, title: "Verified Attendance", desc: "Every review is tied to a confirmed attendee record — no bots, no sock-puppet ratings." },
              { icon: RateReviewIcon, title: "Structured Insights", desc: "Category-level scores (content, speakers, venue) make comparisons objective and honest." },
              { icon: CalendarMonthIcon, title: "Live & Long-Term", desc: "New feedback lands on event pages in seconds and stays for years of edition planning." },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <Box key={t.title} sx={{ display: "flex", gap: 2.5 }}>
                  <Box sx={{ width: 46, height: 46, borderRadius: "14px", flexShrink: 0, display: "grid", placeItems: "center", bgcolor: "rgba(99,102,241,0.1)", color: "#4f46e5" }}>
                    <Icon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 16.5, color: "#111827", mb: 0.6 }}>{t.title}</Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>{t.desc}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </main>
      <Footer />

      {/* "View Details" overlay */}
      <EventDetailDialog eventId={detailId} onClose={() => setDetailId(null)} />
    </>
  );
}