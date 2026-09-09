// Star rating â€” two modes:
//   <StarRating value>          read-only display
//   <InteractiveRating value onChange>  clickable input (Feedback form)
"use client";

import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

export function StarRating({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.15, color: "#f59e0b" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const diff = value - i;
        if (diff >= 0) return <StarIcon key={i} sx={{ fontSize: size }} />;
        if (diff > -0.5) return <StarHalfIcon key={i} sx={{ fontSize: size }} />;
        return <StarBorderIcon key={i} sx={{ fontSize: size, color: "#d8dbe3" }} />;
      })}
    </Box>
  );
}

export function InteractiveRating({
  value,
  onChange,
  size = 32,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.4 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          component="button"
          type="button"
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          onClick={() => onChange(i)}
          sx={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            p: 0,
            color: i <= value ? "#f59e0b" : "#d8dbe3",
            transition: "transform .15s ease, color .15s ease",
            "&:hover": { transform: "scale(1.15)", color: "#f59e0b" },
          }}
        >
          {i <= value ? <StarIcon sx={{ fontSize: size }} /> : <StarBorderIcon sx={{ fontSize: size }} />}
        </Box>
      ))}
    </Box>
  );
}
