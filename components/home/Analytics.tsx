// Analytics — two-column: label/heading/desc + avatar stack, right = chart card.
"use client";

import Image from "next/image";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReveal } from "@/lib/hooks/use-animations";
import { useFeedback } from "@/lib/data/use-events";

const CHART = [12, 18, 16, 24, 30, 42, 38, 58, 70, 66, 84, 94, 88, 97, 62, 40, 28, 20, 30, 22];

export function Analytics() {
  const reveal = useReveal<HTMLDivElement>();
  const { data: feedback = [] } = useFeedback();
  const live = Math.max(1, Math.round(feedback.length * 1.4)) + 1200; // playful live count

  // Path that hugs the tops of the bars.
  const max = 100;
  const step = 22; // px per point
  const points = CHART.map((v, i) => `${i * step},${max - v}`).join(" ");
  const areaPoints = CHART.map((v, i) => `${i * step},${max - v}`).join(" ");

  return (
    <Box component="section" sx={{ background: "#f7f7fb", py: { xs: 8, md: 11 } }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 3 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" },
          gap: { xs: 6, md: 5 },
          alignItems: "center",
        }}
        ref={reveal}
      >
        {/* Left copy */}
        <Box>
          <SectionLabel>REAL-TIME DATA STREAMS</SectionLabel>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 2.5, lineHeight: 1.15 }}>
            From Single Rating to Actionable Dashboard
          </Typography>
          <Typography sx={{ color: "#6b7280", fontSize: 16.5, lineHeight: 1.7, mb: 4 }}>
            Event planners track live NPS, sentiment trends, and instant speaker appraisals as they happen, solving stage bottlenecks before the afternoon session starts.
          </Typography>

          {/* Avatar stack + live count */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex" }}>
              {[0, 1, 2].map((i) => (
                <Avatar
                  key={i}
                  sx={{
                    width: 40,
                    height: 40,
                    ml: i === 0 ? 0 : -1.1,
                    border: "2px solid #fff",
                    bgcolor: i === 0 ? "#4f46e5" : i === 1 ? "#7c3aed" : "#10b981",
                    color: "#fff",
                  }}
                >
                  {i === 0 ? (
                    <Image
                      src="/home-images/home-page-main-section-profile-image.png"
                      alt="Attendee avatar"
                      width={40}
                      height={40}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                    />
                  ) : (
                    "+1"
                  )}
                </Avatar>
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#111827" }}>+{live}</Typography>
              <Typography sx={{ color: "#6b7280", fontSize: 13 }}>Live ratings submitted today</Typography>
            </Box>
          </Box>
        </Box>

        {/* Right chart card */}
        <Box
          sx={{
            borderRadius: "22px",
            border: "1px solid #eef0f5",
            background: "#ffffff",
            boxShadow: "0 24px 54px rgba(79,70,229,0.14)",
            p: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShowChartIcon sx={{ color: "#4f46e5" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 15.5, color: "#111827" }}>Live Audience Engagement Index</Typography>
            </Box>
            <Chip label="Past 6 Hours" sx={{ bgcolor: "#f3f4fb", color: "#4f46e5", fontWeight: 600, fontSize: 12 }} />
          </Box>

          <Box sx={{ position: "relative", height: 190, overflow: "hidden" }}>
            {/* area fill */}
            <svg width="100%" height="100%" viewBox={`0 0 ${(CHART.length - 1) * step} ${max}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <linearGradient id="gf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points={`0,${max} ${areaPoints} ${(CHART.length - 1) * step},${max}`} fill="url(#gf)" />
              <polyline
                points={points}
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              {CHART.map((v, i) => (
                <circle
                  key={i}
                  cx={i * step}
                  cy={max - v}
                  r={i === CHART.length - 4 ? 5 : 0}
                  fill="#fff"
                  stroke="#6366f1"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontSize: 12, color: "#9ca3af" }}>
            <Box>09:00 AM (Opening)</Box>
            <Box>11:30 AM (Keynotes)</Box>
            <Box>01:00 PM (Workshops)</Box>
            <Box sx={{ fontWeight: 700, color: "#4f46e5" }}>03:15 PM (Now: 94% Peak)</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}