// Feedback page — submission form built from Context/feedback-page-design-prompt.md.
// Writes to MySQL through orpc.feedback.create (see lib/orpc/router.ts), then
// invalidates the query cache so Events + Home reflect the new data instantly.
"use client";

import { useState } from "react";
import { Box, Button, Chip, MenuItem, Select, TextField, Typography, FormControl, Snackbar, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveRating } from "@/components/ui/EventStars";
import { useEvents, useCreateFeedback } from "@/lib/data/use-events";
import { useFeedbackStore } from "@/lib/store/use-app-store";
import { useReveal } from "@/lib/hooks/use-animations";
import type { FeedbackDraft } from "@/lib/store/use-app-store";

const DETAIL_SECTIONS: {
  key: "contentQuality" | "speakerPerformance" | "venueLogistics";
  label: string;
  hint: string;
}[] = [
  { key: "contentQuality", label: "Content Quality", hint: "How valuable were the talks, tracks, and workshops?" },
  { key: "speakerPerformance", label: "Speaker Performance", hint: "Clarity, energy, and delivery of the speakers." },
  { key: "venueLogistics", label: "Venue & Logistics", hint: "Space, WiFi, catering, registration flow." },
];

const RATING_WORDS = [
  "Terrible — won't be back",
  "Meh — needs work",
  "Solid — decent time",
  "Great — would attend again",
  "Outstanding — best I've been to",
];

export default function FeedbackPage() {
  const reveal = useReveal<HTMLDivElement>();
  const { data: events = [] } = useEvents();
  const create = useCreateFeedback();
  const { draft, setDraft, resetDraft } = useFeedbackStore();
  const [snack, setSnack] = useState<"success" | "error" | null>(null);

  const submitting = create.isPending;

  const handleSubmit = async () => {
    if (draft.eventId == null) return;
    // Normalize optional text to undefined so empty inputs don't fail the
    // server's `min(1)` validation and block the whole submission.
    const txt = (s: string) => s.trim() || undefined;
    try {
      await create.mutateAsync({
        eventId: draft.eventId,
        attendeeName: draft.attendeeName.trim() || "Anonymous",
        attendeeRole: txt(draft.attendeeRole),
        overallRating: draft.overallRating || 5,
        contentQuality: draft.contentQuality || 5,
        speakerPerformance: draft.speakerPerformance || 5,
        venueLogistics: draft.venueLogistics || 5,
        likedMost: txt(draft.likedMost),
        couldImprove: txt(draft.couldImprove),
        wouldRecommend: draft.wouldRecommend,
        notes: txt(draft.notes),
      });
      resetDraft();
      setSnack("success");
    } catch (err) {
      console.error("Feedback submit failed:", err);
      setSnack("error");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 5, md: 7 } }} ref={reveal}>
          {/* -------- Header -------- */}
          <Box sx={{ textAlign: "center", mb: 4.5 }}>
            <Chip
              label="TAKES ONLY 2 MINUTES • VERIFIED ATTENDEE FORM"
              sx={{
                bgcolor: "rgba(99,102,241,0.12)",
                color: "#4f46e5",
                fontWeight: 700,
                fontSize: 11.5,
                letterSpacing: "0.08em",
                borderRadius: 999,
                mb: 2.5,
              }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: 34, md: 42 }, lineHeight: 1.1, mb: 1.5 }}>
              Share Your Feedback
            </Typography>
            <Typography sx={{ color: "#6b7280", fontSize: 16, maxWidth: 520, mx: "auto", lineHeight: 1.65 }}>
              Your honest review helps organizers build better events — and helps fellow attendees choose with confidence.
            </Typography>
          </Box>

          {/* -------- Form card -------- */}
          <Box
            sx={{
              borderRadius: "22px",
              border: "1px solid #eef0f5",
              background: "#ffffff",
              boxShadow: "0 24px 54px rgba(79,70,229,0.10)",
              p: { xs: 2.5, md: 4.5 },
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
            }}
          >
            {/* Select event */}
            <Box>
              <FormLabelText>Select Event *</FormLabelText>
              <FormControl fullWidth size="small">
                <Select
                  value={draft.eventId ?? ""}
                  onChange={(e) => setDraft({ eventId: Number(e.target.value) })}
                  displayEmpty
                  sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
                >
                  <MenuItem value="" disabled>
                    Pick the event you attended…
                  </MenuItem>
                  {events.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Attendee identity */}
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField
                label="Your name *"
                value={draft.attendeeName}
                onChange={(e) => setDraft({ attendeeName: e.target.value })}
                sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
              />
              <TextField
                label="Your role (optional)"
                value={draft.attendeeRole}
                onChange={(e) => setDraft({ attendeeRole: e.target.value })}
                placeholder="e.g. Senior Engineer @ Acme"
                sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
              />
            </Box>

            {/* Overall rating */}
            <Box>
              <FormLabelText>Overall Experience *</FormLabelText>
              <InteractiveRating value={draft.overallRating} onChange={(v) => setDraft({ overallRating: v })} size={34} />
              <Typography sx={{ color: "#9ca3af", fontSize: 12.5, mt: 0.6 }}>
                {draft.overallRating === 0 ? "Tap a star to rate" : RATING_WORDS[draft.overallRating - 1]}
              </Typography>
            </Box>

            {/* Detailed evaluation */}
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.6, color: "#111827" }}>Detailed Evaluation</Typography>
              <Typography sx={{ color: "#9ca3af", fontSize: 13, mb: 2 }}>
                Rate the specific areas that matter most to organizers.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
                {DETAIL_SECTIONS.map((s) => (
                  <Box
                    key={s.key}
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                      p: 2,
                      borderRadius: "16px",
                      background: "#f7f7fb",
                      border: "1px solid #eef0f5",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{s.label}</Typography>
                      <Typography sx={{ color: "#9ca3af", fontSize: 12.5 }}>{s.hint}</Typography>
                    </Box>
                    <InteractiveRating
                      value={draft[s.key]}
                      onChange={(v) => setDraft({ [s.key]: v } as Partial<FeedbackDraft>)}
                      size={26}
                    />
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Textareas */}
            <TextField
              label="What did you like most about the event?"
              value={draft.likedMost}
              onChange={(e) => setDraft({ likedMost: e.target.value })}
              multiline
              minRows={3}
              placeholder="Highlights, favorite sessions, standout moments…"
              sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
            />
            <TextField
              label="What could be improved?"
              value={draft.couldImprove}
              onChange={(e) => setDraft({ couldImprove: e.target.value })}
              multiline
              minRows={3}
              placeholder="Catering, WiFi, scheduling, content depth…"
              sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
            />

            {/* Recommendation */}
            <Box>
              <FormLabelText>Would you recommend this event to peers?</FormLabelText>
              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {[
                  { value: true, label: "Yes, definitely", icon: ThumbUpAltIcon, tint: "rgba(16,185,129,0.12)", color: "#059669" },
                  { value: false, label: "Not this time", icon: ThumbDownIcon, tint: "rgba(239,68,68,0.12)", color: "#dc2626" },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const active = draft.wouldRecommend === opt.value;
                  return (
                    <Box
                      key={String(opt.value)}
                      component="button"
                      type="button"
                      onClick={() => setDraft({ wouldRecommend: opt.value })}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        px: 2.2,
                        py: 1.4,
                        borderRadius: 999,
                        border: "1.5px solid",
                        borderColor: active ? opt.color : "#e5e7eb",
                        bgcolor: active ? opt.tint : "#ffffff",
                        color: active ? opt.color : "#4b5563",
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all .18s ease",
                        "&:hover": { borderColor: opt.color, bgcolor: opt.tint },
                      }}
                    >
                      <Icon sx={{ fontSize: 18 }} /> {opt.label}
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* Notes */}
            <TextField
              label="Additional Notes (optional)"
              value={draft.notes}
              onChange={(e) => setDraft({ notes: e.target.value })}
              multiline
              minRows={2}
              placeholder="Anything else organizers should know…"
              sx={{ bgcolor: "#f7f7fb", borderRadius: "14px" }}
            />

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="outlined"
                startIcon={<ClearAllIcon />}
                onClick={resetDraft}
                sx={{ borderColor: "#dde0f0", color: "#6b7280", "&:hover": { borderColor: "#ef4444", color: "#dc2626", bgcolor: "rgba(239,68,68,0.04)" } }}
              >
                Clear Entries
              </Button>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={handleSubmit}
                disabled={submitting || draft.eventId == null || draft.overallRating === 0}
                sx={{ px: "26px" }}
              >
                {submitting ? "Submitting…" : "Submit Feedback"}
              </Button>
            </Box>
          </Box>

          {/* -------- Privacy note -------- */}
          <Box sx={{ textAlign: "center", mt: 4, px: 2 }}>
            <Typography sx={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6 }}>
              Your feedback is stored securely, associated with the event you rated, and helps organizers plan the next edition.
              <br />
              You can request removal anytime at privacy@eventflow.dev.
            </Typography>
          </Box>
        </Box>

        <Snackbar open={snack != null} autoHideDuration={4000} onClose={() => setSnack(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert severity={snack === "success" ? "success" : "error"} variant="filled" onClose={() => setSnack(null)}>
            {snack === "success"
              ? "Feedback submitted! It now lives in the database and updates the event rating live."
              : "Something went wrong. Please try again."}
          </Alert>
        </Snackbar>
      </main>
      <Footer />
    </>
  );
}

function FormLabelText({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1.2, color: "#111827" }}>
      {children}
    </Typography>
  );
}