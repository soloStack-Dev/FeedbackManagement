// CTA Banner — full-width rounded gradient banner with white + outline buttons.
"use client";

import Link from "next/link";
import { Box, Button, Chip, Typography } from "@mui/material";
import { useReveal } from "@/lib/hooks/use-animations";

export function CtaBanner() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <Box component="section" sx={{ background: "#ffffff", py: { xs: 8, md: 11 } }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }} ref={reveal}>
        <Box
          sx={{
            borderRadius: "28px",
            background: "linear-gradient(120deg, #4f46e5 0%, #6d28d9 55%, #7c3aed 100%)",
            color: "#ffffff",
            p: { xs: 4, md: 6 },
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 30px 70px rgba(79,70,229,0.35)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(600px 300px at 90% 20%, rgba(255,255,255,0.16), transparent 60%)",
            }}
          />

          <Box sx={{ position: "relative", maxWidth: 620 }}>
            <Chip
              label="JOIN 120,000+ ACTIVE ATTENDEES"
              sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.06em", borderRadius: 999, mb: 2.5, backdropFilter: "blur(4px)" }}
            />
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 34 }, lineHeight: 1.2, mb: 2 }}>
              Ready to make your voice heard at the next summit?
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: 15.5, lineHeight: 1.6 }}>
              Find the event you recently attended or discover high-rated tech gatherings happening in your city.
            </Typography>
          </Box>

          <Box sx={{ position: "relative", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Link href="/events" style={{ textDecoration: "none" }}>
              <Button
                size="large"
                sx={{ bgcolor: "#ffffff", color: "#4f46e5", px: "28px", "&:hover": { bgcolor: "#f0f0ff" } }}
              >
                Explore Events
              </Button>
            </Link>
            <Link href="/feedback" style={{ textDecoration: "none" }}>
              <Button
                size="large"
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "#ffffff",
                  px: "28px",
                  "&:hover": { borderColor: "#ffffff", bgcolor: "rgba(255,255,255,0.12)" },
                }}
              >
                Quick Feedback
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}