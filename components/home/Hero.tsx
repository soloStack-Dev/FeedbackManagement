// Hero — two-column: left copy + CTAs, right floating testimonial card.
"use client";

import Link from "next/link";
import Image from "next/image";
import { Box, Button, Stack, Typography, Chip, Avatar, LinearProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RatingIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { useReveal, useMountedIn } from "@/lib/hooks/use-animations";
import { StarRating } from "@/components/ui/EventStars";
import { useEvents } from "@/lib/data/use-events";

export function Hero() {
  const reveal = useReveal<HTMLDivElement>();
  const media = useMountedIn(0.15);
  const { data: events = [] } = useEvents();
  // The hero testimonial feature event = the top-rated one from the DB.
  const featured = events[0];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(1100px 520px at 85% -10%, rgba(124,58,237,0.14), transparent 60%), radial-gradient(900px 480px at 8% 0%, rgba(99,102,241,0.12), transparent 60%)",
        borderBottom: "1px solid #eef0f5",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 7, md: 12 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 6, md: 5 },
            alignItems: "center",
          }}
        >
          {/* ---------- Left column ---------- */}
          <Box ref={reveal}>
            <Chip
              label="NEXT-GEN EVENT EXPERIENCE PLATFORM"
              sx={{
                bgcolor: "rgba(99,102,241,0.12)",
                color: "#4f46e5",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "0.08em",
                borderRadius: 999,
                mb: 3,
              }}
            />

            <Typography variant="h1" sx={{ fontSize: { xs: 38, sm: 48, md: 56 }, lineHeight: 1.06, mb: 2.5 }}>
              Your Feedback Shapes
              <Box component="span" sx={{ color: "transparent", background: "linear-gradient(90deg,#6366f1,#7c3aed)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                {" "}Better Events
              </Box>
            </Typography>

            <Typography sx={{ color: "#4b5563", fontSize: { xs: 17, md: 18 }, lineHeight: 1.7, maxWidth: 520, mb: 4 }}>
              Share your experience, help organizers improve, and make every event better. Simple, honest, and impactful attendee insights in real time.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Link href="/events" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large" sx={{ px: "26px", py: "12px", fontSize: 15.5 }}>
                  Explore Events <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                </Button>
              </Link>
              <Link href="/feedback" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ px: "26px", py: "12px", fontSize: 15.5, borderColor: "#dde0f0", color: "#4f46e5", "&:hover": { borderColor: "#6366f1", bgcolor: "rgba(99,102,241,0.06)" } }}
                >
                  Share Feedback
                </Button>
              </Link>
            </Stack>

            {/* Stats row */}
            <Stack direction="row" spacing={{ xs: 3, sm: 5 }} sx={{ mt: 5 }}>
              {[
                { value: "1,200+", label: "Events Hosted" },
                { value: "98k+", label: "Reviews Collected" },
                { value: "4.9", label: "Organizer Rating" },
              ].map((s) => (
                <Box key={s.label}>
                  <Typography sx={{ fontWeight: 800, fontSize: 26, color: "#111827", lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ color: "#6b7280", fontSize: 13.5, mt: 0.6 }}>{s.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* ---------- Right column: floating testimonial card ---------- */}
          <Box ref={media} sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                borderRadius: "24px",
                border: "1px solid #eef0f5",
                background: "#ffffff",
                boxShadow: "0 30px 60px rgba(79,70,229,0.16), 0 6px 18px rgba(15,23,42,0.08)",
                p: 3.5,
                maxWidth: 460,
                mx: "auto",
              }}
            >
              {/* Author row */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2.5 }}>
                <Avatar sx={{ width: 52, height: 52, border: "2px solid #fff", boxShadow: "0 4px 12px rgba(15,23,42,0.15)" }}>
                  <Image src="/home-images/home-page-main-section-profile-image.png" alt="Elena Rostova" width={52} height={52} style={{ objectFit: "cover" }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>Elena Rostova</Typography>
                    <VerifiedIcon sx={{ fontSize: 16, color: "#10b981" }} />
                  </Box>
                  <Typography sx={{ color: "#6b7280", fontSize: 13 }}>Lead Designer @ ArcScale</Typography>
                </Box>
                <Chip
                  label="Real-Time NPS +72"
                  sx={{ bgcolor: "rgba(16,185,129,0.12)", color: "#047857", fontWeight: 700, fontSize: 12, borderRadius: 999 }}
                />
              </Box>

              <Typography sx={{ fontSize: 13.5, color: "#6b7280", mb: 1.5 }}>
                {featured ? featured.title : "Tech Innovation Summit 2026"}
              </Typography>

              <StarRating value={featured?.rating ?? 5} size={18} />
              <Typography sx={{ color: "#6b7280", fontSize: 12.5, mt: 0.5 }}>{(featured?.reviewCount ?? 214).toLocaleString()} verified reviews</Typography>

              <Typography sx={{ fontStyle: "italic", color: "#374151", fontSize: 15, lineHeight: 1.6, my: 2.5 }}>
                “Outstanding content and flawless organization. The workshop tracks alone were worth the trip — this is exactly why I attend events like this.”
              </Typography>

              {/* Rating bars */}
              {[
                { label: "Content Quality", score: 5 },
                { label: "Speaker Performance", score: 5 },
                { label: "Venue & Logistics", score: 4 },
              ].map((bar) => (
                <Box key={bar.label} sx={{ mb: 1.6 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 12.5, color: "#4b5563" }}>{bar.label}</Typography>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: "#111827" }}>{bar.score}/5</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={bar.score * 20}
                    sx={{
                      mt: 0.5,
                      height: 6,
                      borderRadius: 999,
                      bgcolor: "#eef0f5",
                      "& .MuiLinearProgress-bar": { bgcolor: "linear-gradient? #6366f1", backgroundColor: "#6366f1" },
                    }}
                  />
                </Box>
              ))}

              {/* Sentiment + time row */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, pt: 2, borderTop: "1px solid #f1f3f7" }}>
                <SentimentSatisfiedAltIcon sx={{ fontSize: 18, color: "#10b981" }} />
                <Typography sx={{ fontSize: 13, color: "#047857", fontWeight: 600 }}>Positive sentiment</Typography>
                <Box sx={{ flex: 1 }} />
                <Typography sx={{ fontSize: 12.5, color: "#9ca3af" }}>Submitted 2m ago</Typography>
              </Box>
            </Box>

            {/* Floating secondary mini-card */}
            <Box
              sx={{
                position: "absolute",
                bottom: -22,
                left: 18,
                px: 2,
                py: 1.4,
                borderRadius: "16px",
                border: "1px solid #eef0f5",
                background: "#fff",
                boxShadow: "0 18px 40px rgba(15,23,42,0.12)",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1.2,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <RatingIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                <RatingIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                <RatingIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                <RatingIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
                <RatingIcon sx={{ fontSize: 16, color: "#f59e0b" }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>4.9</Typography>
              <Typography sx={{ fontSize: 12.5, color: "#6b7280" }}>from {featured?.reviewCount ?? 214}+ reviews</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}