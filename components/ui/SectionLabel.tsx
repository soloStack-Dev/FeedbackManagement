// Small uppercase section label used across pages
// e.g. "ATTENDEE-FIRST PLATFORM", "REAL-TIME DATA STREAMS".
import { Box, SxProps, Theme } from "@mui/material";

export function SectionLabel({ children, sx }: { children: React.ReactNode; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        typography: "overline",
        fontWeight: 700,
        letterSpacing: "0.14em",
        fontSize: 13,
        color: "#6366f1",
        mb: 1.5,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}