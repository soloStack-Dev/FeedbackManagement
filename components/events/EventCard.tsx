// EventCard — data-driven card for the Events grid.
// Image area: category badge (top-left), location pill (bottom-left),
// format/status badge (bottom-right). Body: date, title, venue, description,
// rating stars + review count, and View Details / Give Feedback buttons.
"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button, Chip, Typography, Skeleton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PlaceIcon from "@mui/icons-material/Place";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { StarRating } from "@/components/ui/EventStars";
import type { Event } from "@/lib/db/schema";
import { formatDate, formatTime } from "@/lib/utils";
import { useFeedbackStore } from "@/lib/store/use-app-store";

export function EventCard({ event, onViewDetails }: { event: Event; onViewDetails?: (eventId: number) => void }) {
  const setDraft = useFeedbackStore((s) => s.setDraft);

  return (
    <Box
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #eef0f5",
        background: "#ffffff",
        boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
        transition: "transform .22s ease, box-shadow .22s ease",
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 24px 48px rgba(79,70,229,0.14)" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* -------- Image area with overlay badges -------- */}
      <Box sx={{ position: "relative", aspectRatio: "16/9.2" }}>
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          sizes="(max-width: 1200px) 33vw, 400px"
          style={{ objectFit: "cover" }}
          loading="eager"
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15,23,42,0.28) 0%, transparent 35%, rgba(15,23,42,0.55) 100%)",
          }}
        />
        <Chip
          label={event.category}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            bgcolor: "rgba(255,255,255,0.92)",
            color: "#4f46e5",
            fontWeight: 700,
            fontSize: 12,
            borderRadius: 999,
            backdropFilter: "blur(4px)",
          }}
        />
        <Chip
          icon={<PlaceIcon sx={{ fontSize: 14, color: "#fff" }} />}
          label={`${event.city}`}
          size="small"
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            bgcolor: "rgba(15,23,42,0.55)",
            color: "#fff",
            fontWeight: 600,
            fontSize: 12,
            borderRadius: 999,
            backdropFilter: "blur(4px)",
            "& .MuiChip-icon": { mr: 0.4 },
          }}
        />
        <Chip
          label={event.format}
          size="small"
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            bgcolor: "rgba(99,102,241,0.9)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 11.5,
            borderRadius: 999,
          }}
        />
        {(event.status === "Feedback Open" || event.status === "Past") && (
          <Chip
            label={`${event.status === "Feedback Open" ? "● Feedback Open" : "✓ Past"}`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: event.status === "Feedback Open" ? "rgba(16,185,129,0.92)" : "rgba(107,114,128,0.85)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 11,
              borderRadius: 999,
            }}
          />
        )}
      </Box>

      {/* -------- Body -------- */}
      <Box sx={{ p: 2.75, display: "flex", flexDirection: "column", flex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7, color: "#6b7280", fontSize: 13, mb: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 15 }} />
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {formatDate(event.eventDate)} · {formatTime(event.eventDate)}
          </Typography>
        </Box>

        <Typography sx={{ fontWeight: 700, fontSize: 17.5, color: "#111827", lineHeight: 1.3, mb: 0.5 }}>
          {event.title}
        </Typography>
        <Typography sx={{ color: "#6b7280", fontSize: 13.5, mb: 1.5 }}>{event.venue}</Typography>

        <Typography
          sx={{
            color: "#4b5563",
            fontSize: 13.5,
            lineHeight: 1.6,
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {event.description}
        </Typography>

        {/* Rating row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.25 }}>
          <StarRating value={event.rating} size={16} />
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{event.rating.toFixed(1)}</Typography>
          <Typography sx={{ color: "#9ca3af", fontSize: 12.5 }}>
            · {event.reviewCount.toLocaleString()} reviews
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="text"
            startIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
            onClick={() => onViewDetails?.(event.id)}
            sx={{
              flex: 1,
              border: "1px solid #e5e7eb",
              color: "#374151",
              bgcolor: "#ffffff",
              "&:hover": { borderColor: "#cbd0dc", bgcolor: "#f9fafb" },
            }}
          >
            View Details
          </Button>
          <Link
            href="/feedback"
            style={{ textDecoration: "none", flex: 1 }}
            onClick={() => setDraft({ eventId: event.id })}
          >
            <Button
              variant="contained"
              startIcon={<RateReviewIcon sx={{ fontSize: 18 }} />}
              sx={{ width: "100%", flex: 1 }}
            >
              Give Feedback
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export function EventCardSkeleton() {
  return (
    <Box sx={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #eef0f5", background: "#fff" }}>
      <Skeleton variant="rectangular" sx={{ aspectRatio: "16/9.2", height: "auto", width: "100%" }} />
      <Box sx={{ p: 2.75 }}>
        <Skeleton width="55%" height={20} />
        <Skeleton width="90%" height={26} sx={{ mt: 1 }} />
        <Skeleton width="70%" height={16} sx={{ mt: 1 }} />
        <Skeleton width="100%" height={16} sx={{ mt: 2 }} />
        <Skeleton width="40%" height={30} sx={{ mt: 3, borderRadius: 999 }} />
      </Box>
    </Box>
  );
}