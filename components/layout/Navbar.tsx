// Navbar — shared across all pages.
// Logo left, centered nav, "Give Feedback" CTA right.
// Active nav item gets a soft pill. Sticky + translucent.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Toolbar, Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Feedback", href: "/feedback" },
];

export function Navbar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e5e7eb",
        color: "#111827",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, md: 3 }, minHeight: 64, gap: 2 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(135deg,#6366f1,#7c3aed)",
              color: "#fff",
            }}
          >
            <BoltIcon sx={{ fontSize: 20 }} />
          </Box>
          <Box sx={{ fontWeight: 800, fontSize: 20, color: "#111827", letterSpacing: "-0.02em" }}>
            EventFlow
          </Box>
        </Link>

        {/* Centered nav */}
        <Box sx={{ flex: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 1 }}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  px: 2,
                  py: 0.8,
                  borderRadius: 999,
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: isActive(link.href) ? "#4f46e5" : "#6b7280",
                  background: isActive(link.href) ? "rgba(99,102,241,0.12)" : "transparent",
                  "&:hover": { background: "rgba(99,102,241,0.08)", color: "#4f46e5" },
                  transition: "all .18s ease",
                }}
              >
                {link.label}
              </Box>
            </Link>
          ))}
        </Box>

        {/* Right: CTA + profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Link href="/feedback" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="small"
              sx={{ display: { xs: "none", sm: "inline-flex" }, borderRadius: 999, px: "18px" }}
            >
              Give Feedback
            </Button>
          </Link>
          {isMobile && (
            <IconButton aria-label="Menu" onClick={() => setOpen((o) => !o)} sx={{ color: "#111827" }}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile drawer-ish menu */}
      {open && (
        <Box
          sx={{
            display: { md: "none" },
            px: 2,
            pb: 2,
            pt: 0.5,
            background: "#ffffff",
            borderTop: "1px solid #eef0f5",
          }}
        >
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  py: 1.25,
                  fontSize: 15,
                  fontWeight: isActive(link.href) ? 700 : 600,
                  color: isActive(link.href) ? "#4f46e5" : "#374151",
                }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Box>
            </Link>
          ))}
          <Link href="/feedback" style={{ textDecoration: "none", display: "block", marginTop: 8 }}>
            <Button variant="contained" fullWidth>
              Give Feedback
            </Button>
          </Link>
        </Box>
      )}
    </AppBar>
  );
}