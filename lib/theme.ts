// MUI theme — design tokens from Context/*-design-prompt.md + skills.md
// (indigo/violet brand, soft shadows, pill radii, amber stars, green success).
"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6366f1", light: "#818cf8", dark: "#4f46e5", contrastText: "#ffffff" },
    secondary: { main: "#7c3aed", light: "#a78bfa", dark: "#6d28d9" },
    background: { default: "#f7f7fb", paper: "#ffffff" },
    text: { primary: "#111827", secondary: "#6b7280" },
    divider: "#e5e7eb",
    success: { main: "#10b981" },
    warning: { main: "#f59e0b" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: `var(--font-ef), "Inter", -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
    h1: { fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.015em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          padding: "10px 22px",
          boxShadow: "0 10px 30px rgba(79, 70, 229, 0.14)",
          "&:hover": { transform: "translateY(-1px)", boxShadow: "0 14px 34px rgba(79, 70, 229, 0.2)" },
          transition: "all .2s ease",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "medium" },
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 14 } },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 999 } },
    },
  },
});