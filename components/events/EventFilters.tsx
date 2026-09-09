// EventFilters — search input + status pills + category pills + sort dropdown.
"use client";

import { Box, Chip, TextField, MenuItem, Select, FormControl, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import {
  useEventStore,
  STATUS_PILLS,
  CATEGORY_PILLS,
  SORT_OPTIONS,
} from "@/lib/store/use-app-store";

export function EventFilters() {
  const { search, status, category, sort, setSearch, setStatus, setCategory, setSort, resetFilters } =
    useEventStore();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Search + sort row */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by event name, topic, or venue..."
          sx={{ flex: { xs: "1 1 100%", md: "1 1 320px" }, maxWidth: { md: 460 }, bgcolor: "#ffffff" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9ca3af" }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <Box sx={{ flex: 1 }} />
        <FormControl size="small" sx={{ minWidth: 170, bgcolor: "#ffffff" }}>
          <Select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
            {SORT_OPTIONS.map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="text"
          startIcon={<TuneIcon />}
          onClick={resetFilters}
          sx={{ color: "#6b7280", textTransform: "none", "&:hover": { color: "#4f46e5" } }}
        >
          Reset
        </Button>
      </Box>

      {/* Status pills */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {STATUS_PILLS.map((p) => (
          <Chip
            key={p}
            label={p}
            onClick={() => setStatus(p)}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13,
              bgcolor: status === p ? "#6366f1" : "#ffffff",
              color: status === p ? "#ffffff" : "#4b5563",
              border: "1px solid",
              borderColor: status === p ? "#6366f1" : "#e5e7eb",
              "&:hover": { bgcolor: status === p ? "#4f46e5" : "#f3f4fb" },
              transition: "all .18s ease",
            }}
          />
        ))}
      </Box>

      {/* Category pills */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {CATEGORY_PILLS.map((c) => (
          <Chip
            key={c}
            label={c}
            onClick={() => setCategory(c)}
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 13,
              bgcolor: category === c ? "#7c3aed" : "#ffffff",
              color: category === c ? "#ffffff" : "#4b5563",
              border: "1px solid",
              borderColor: category === c ? "#7c3aed" : "#e5e7eb",
              "&:hover": { bgcolor: category === c ? "#6d28d9" : "#f3f4fb" },
              transition: "all .18s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}