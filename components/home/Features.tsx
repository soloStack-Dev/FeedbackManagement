// Features — centered heading + 3 equal cards with accent tints + arrow links.
"use client";

import { Box, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import RateReviewIcon from "@mui/icons-material/RateReview";
import InsightsIcon from "@mui/icons-material/Insights";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useReveal } from "@/lib/hooks/use-animations";

const FEATURES = [
  {
    icon: ExploreIcon,
    tint: "rgba(99,102,241,0.12)",
    color: "#4f46e5",
    title: "Discover Events",
    desc: "Browse upcoming and past technology, design, and developer community events with instant access to verified agendas, speakers, and recent reviews.",
    cta: "Explore directory",
    href: "/events",
  },
  {
    icon: RateReviewIcon,
    tint: "rgba(124,58,237,0.12)",
    color: "#7c3aed",
    title: "Share Your Experience",
    desc: "Quickly submit ratings, category-specific scores, and structured insights through frictionless micro-surveys engineered for modern mobile attendees.",
    cta: "Rate your event",
    href: "/feedback",
  },
  {
    icon: InsightsIcon,
    tint: "rgba(16,185,129,0.12)",
    color: "#059669",
    title: "Make an Impact",
    desc: "Help organizers understand what attendees truly value. From catering and WiFi to keynote substance, your voice directly improves future editions.",
    cta: "See the analytics",
    href: "/events",
  },
];

export function Features() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <Box component="section" sx={{ background: "#ffffff", py: { xs: 8, md: 11 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }} ref={reveal}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <SectionLabel sx={{ justifyContent: "center" }}>ATTENDEE-FIRST PLATFORM</SectionLabel>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 2 }}>
            Why EventFlow Matters
          </Typography>
          <Typography sx={{ color: "#6b7280", fontSize: 16.5, maxWidth: 620, mx: "auto", lineHeight: 1.65 }}>
            Built for attendees who care about great gatherings and organizers who listen to make next year unforgettable.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3.5,
          }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <Box
                key={f.title}
                sx={{
                  p: 3.5,
                  borderRadius: "20px",
                  border: "1px solid #eef0f5",
                  background: "#ffffff",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform .22s ease, box-shadow .22s ease",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 22px 44px rgba(79,70,229,0.12)" },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: f.tint,
                    color: f.color,
                    mb: 2.5,
                  }}
                >
                  <Icon sx={{ fontSize: 26 }} />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 19, mb: 1.2, color: "#111827" }}>{f.title}</Typography>
                <Typography sx={{ color: "#6b7280", fontSize: 14.5, lineHeight: 1.65, flex: 1 }}>{f.desc}</Typography>
                <Box
                  component="a"
                  href={f.href}
                  sx={{
                    mt: 2.5,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.8,
                    fontWeight: 700,
                    fontSize: 14.5,
                    color: f.color,
                    textDecoration: "none",
                    "&:hover svg": { transform: "translateX(4px)" },
                  }}
                >
                  {f.cta}
                  <ArrowForwardIcon sx={{ fontSize: 17, transition: "transform .2s ease" }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}