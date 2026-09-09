// Footer — shared across all pages.
// Logo + brand left, nav links right, bottom row with copyright + legal links.
import Link from "next/link";
import { Box } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Feedback", href: "/feedback" },
];

export function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid #eef0f5", background: "#ffffff" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: 5 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "9px",
                display: "grid",
                placeItems: "center",
                background: "linear-gradient(135deg,#6366f1,#7c3aed)",
                color: "#fff",
              }}
            >
              <BoltIcon sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>EventFlow</Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1.5 }}>
            {NAV.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.7,
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: "#6b7280",
                    borderRadius: 999,
                    "&:hover": { color: "#4f46e5", bgcolor: "rgba(99,102,241,0.08)" },
                    transition: "all .18s ease",
                  }}
                >
                  {link.label}
                </Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: "1px solid #f1f3f7",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13.5,
            color: "#9ca3af",
          }}
        >
          <Box>© 2026 EventFlow Technologies Inc. All rights reserved.</Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ cursor: "pointer", "&:hover": { color: "#111827" } }}>Privacy Policy</Box>
            <Box sx={{ cursor: "pointer", "&:hover": { color: "#111827" } }}>Terms of Service</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}