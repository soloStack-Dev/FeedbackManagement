// EventDetailDialog — "View Details" overlay from the Events grid.
// Shows the full event (hero image, badges, description, venue/date) plus the
// verified feedback rows for that event, and a CTA that pre-selects the event
// on the Feedback page.
"use client";

import { Dialog, DialogContent, IconButton, Box, Chip, Typography, Divider, Button, Skeleton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Link from "next/link";
import { useEventDetail, useFeedbackByEvent } from "@/lib/data/use-events";
import { useFeedbackStore } from "@/lib/store/use-app-store";
import { StarRating } from "@/components/ui/EventStars";
import { formatDate, formatTime, timeAgo } from "@/lib/utils";

export function EventDetailDialog({ eventId, onClose }: { eventId: number | null; onClose: () => void }) {
  const { data: event, isPending: eventPending } = useEventDetail(eventId);
  const { data: feedback = [] } = useFeedbackByEvent(eventId);
  const setDraft = useFeedbackStore((s) => s.setDraft);

  const open = eventId != null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body" slotProps={{ paper: { sx: { borderRadius: "24px", overflow: "hidden" } } }}>
      <DialogContent sx={{ p: 0 }}>
        <IconButton
          onClick={onClose}
          aria-label="Close details"
          sx={{ position: "absolute", top: 14, right: 14, zIndex: 2, bgcolor: "rgba(15,23,42,0.5)", color: "#fff", "&:hover": { bgcolor: "rgba(15,23,42,0.7)" } }}
        >
          <CloseIcon />
        </IconButton>

        {eventPending || !event ? (
          <Box sx={{ p: 3 }}>
            <Skeleton variant="rectangular" sx={{ height: 220, borderRadius: "16px" }} />
            <Skeleton width="60%" height={30} sx={{ mt: 2.5 }} />
            <Skeleton width="90%" height={16} sx={{ mt: 1.5 }} />
            <Skeleton width="100%" height={16} sx={{ mt: 1 }} />
            <Skeleton width="40%" height={40} sx={{ mt: 3, borderRadius: 999 }} />
          </Box>
        ) : (
          <>
            {/* Hero */}
            <Box sx={{ position: "relative", height: { xs: 200, md: 250 } }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.coverImage}
                alt={event.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,0.35) 0%, transparent 40%, rgba(15,23,42,0.6) 100%)" }} />
              <Chip
                label={event.category}
                size="small"
                sx={{ position: "absolute", top: 14, left: 14, bgcolor: "rgba(255,255,255,0.92)", color: "#4f46e5", fontWeight: 700, fontSize: 12, borderRadius: 999 }}
              />
              <Chip
                label={event.format}
                size="small"
                sx={{ position: "absolute", top: 14, right: 14, bgcolor: "rgba(99,102,241,0.9)", color: "#fff", fontWeight: 700, fontSize: 12, borderRadius: 999 }}
              />
              <Box sx={{ position: "absolute", bottom: 16, left: 22, right: 22 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "rgba(255,255,255,0.85)", fontSize: 13, mb: 0.6 }}>
                  <CalendarTodayIcon sx={{ fontSize: 15 }} />
                  {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
                </Box>
                <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 22, md: 28 }, lineHeight: 1.15 }}>
                  {event.title}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: { xs: 2.5, md: 4 } }}>
              {/* Venue + rating summary */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#6b7280", fontSize: 14 }}>
                  <PlaceIcon sx={{ fontSize: 17 }} />
                  {event.venue} · {event.city}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <StarRating value={event.rating} size={17} />
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
                    {event.rating.toFixed(1)}
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: 13 }}>
                    · {event.reviewCount.toLocaleString()} reviews
                  </Typography>
                </Box>
              </Box>

              {/* Description */}
              <Typography sx={{ color: "#4b5563", fontSize: 15, lineHeight: 1.7, mb: 3 }}>{event.description}</Typography>

              <Divider sx={{ mb: 3 }} />

              {/* Status chip */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                <Chip label={`Status: ${event.status}`} size="small" sx={{ bgcolor: event.status === "Feedback Open" ? "rgba(16,185,129,0.12)" : "#f3f4f6", color: event.status === "Feedback Open" ? "#059669" : "#6b7280", fontWeight: 600, fontSize: 12, borderRadius: 999 }} />
                <Chip label={event.city} size="small" sx={{ bgcolor: "rgba(99,102,241,0.1)", color: "#4f46e5", fontWeight: 600, fontSize: 12, borderRadius: 999 }} />
              </Box>

              {/* Feedback thread */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <RateReviewIcon sx={{ color: "#4f46e5", fontSize: 19 }} />
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>Verified Attendee Feedback</Typography>
              </Box>
              <Typography sx={{ color: "#9ca3af", fontSize: 13, mb: 2 }}>
                {feedback.length === 0 ? "No feedback yet — be the first to review this event." : `${feedback.length} review${feedback.length === 1 ? "" : "s"} for this event.`}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
                {feedback.map((f) => (
                  <Box key={f.id} sx={{ p: 2, borderRadius: "16px", border: "1px solid #eef0f5", background: "#f9fafb" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>
                        {f.attendeeName}
                      </Typography>
                      {f.attendeeRole && (
                        <Typography sx={{ color: "#9ca3af", fontSize: 12.5 }}>· {f.attendeeRole}</Typography>
                      )}
                      <Box sx={{ flex: 1 }} />
                      <StarRating value={f.overallRating} size={14} />
                      <Typography sx={{ color: "#9ca3af", fontSize: 12 }}>{timeAgo(f.createdAt)}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.7,
                        mb: 0.75,
                        color: f.wouldRecommend ? "#059669" : "#dc2626",
                        fontSize: 12.5,
                      }}
                    >
                      {f.wouldRecommend ? <ThumbUpAltIcon sx={{ fontSize: 14 }} /> : <ThumbDownIcon sx={{ fontSize: 14 }} />}
                      <Typography sx={{ fontSize: 12.5, fontWeight: 600 }}>
                        {f.wouldRecommend ? "Would recommend to peers" : "Would not recommend"}
                      </Typography>
                    </Box>
                    {f.likedMost && (
                      <Typography sx={{ color: "#4b5563", fontSize: 13.5, lineHeight: 1.55 }}>
                        <b>Liked:</b> {f.likedMost}
                      </Typography>
                    )}
                    {f.couldImprove && (
                      <Typography sx={{ color: "#4b5563", fontSize: 13.5, lineHeight: 1.55 }}>
                        <b>Improve:</b> {f.couldImprove}
                      </Typography>
                    )}
                    {f.notes && (
                      <Typography sx={{ color: "#9ca3af", fontSize: 12.5, mt: 0.5 }}>{f.notes}</Typography>
                    )}
                  </Box>
                ))}
              </Box>

              {/* CTA */}
              <Link href="/feedback" style={{ textDecoration: "none" }} onClick={() => setDraft({ eventId: event.id })}>
                <Button variant="contained" startIcon={<RateReviewIcon />} fullWidth>
                  Give Feedback for {event.title}
                </Button>
              </Link>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}