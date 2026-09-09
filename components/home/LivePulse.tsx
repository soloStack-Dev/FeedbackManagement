// Live Pulse — continuously scrolling strip of recent feedback rows.
"use client";

import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { StarRating } from "@/components/ui/EventStars";
import { useFeedback } from "@/lib/data/use-events";
import { timeAgo } from "@/lib/utils";
import { useTickerScroll } from "@/lib/hooks/use-animations";

export function LivePulse() {
  const { data: feedback = [] } = useFeedback();
  const stripRef = useRef<HTMLDivElement>(null);
  useTickerScroll(stripRef, 45);

  // Duplicate the list once so the -50% xPercent loop looks seamless.
  const items = [...feedback, ...feedback];

  return (
    <Box
      component="section"
      sx={{
        borderTop: "1px solid #f1f3f7",
        borderBottom: "1px solid #f1f3f7",
        overflow: "hidden",
        background: "rgba(99,102,241,0.03)",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mx: { xs: 0, md: 3 }, mb: 1 }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#10b981",
            boxShadow: "0 0 0 4px rgba(16,185,129,0.18)",
            ml: { xs: 2, md: 1 },
          }}
        />
        <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: "#374151", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Live Pulse — real attendee feedback
        </Typography>
      </Box>

      <div
        ref={stripRef}
        style={{ display: "flex", gap: 16, width: "max-content", padding: "6px 0" }}
      >
        {items.map((fb, i) => (
          <Box
            key={`${fb.id}-${i}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.4,
              px: 2,
              py: 1,
              borderRadius: 999,
              background: "#ffffff",
              border: "1px solid #eef0f5",
              boxShadow: "0 6px 14px rgba(15,23,42,0.05)",
              whiteSpace: "nowrap",
            }}
          >
            <Box sx={{ fontWeight: 700, fontSize: 13, color: "#4f46e5", maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis" }}>
              Event #{fb.eventId}
            </Box>
            <StarRating value={fb.overallRating} size={14} />
            <Typography sx={{ fontSize: 13, color: "#374151", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis" }}>
              “{(fb.likedMost ?? "").slice(0, 46)}…”
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "#9ca3af" }}>{timeAgo(fb.createdAt)}</Typography>
          </Box>
        ))}
      </div>
    </Box>
  );
}