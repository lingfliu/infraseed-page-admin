"use client";

import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getConfig, saveConfig, type ConfigSection } from "@/services/config";

const SECTIONS: { value: ConfigSection; label: string }[] = [
  { value: "api", label: "API" },
  { value: "agent", label: "Agent" },
  { value: "oss", label: "OSS" },
];

function recordToEntries(obj: Record<string, string>): { key: string; value: string }[] {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
}

function entriesToRecord(entries: { key: string; value: string }[]): Record<string, string> {
  return Object.fromEntries(entries.filter((e) => e.key.trim()).map((e) => [e.key.trim(), e.value]));
}

export function ConfigContent() {
  const [section, setSection] = useState<ConfigSection>("api");
  const [entries, setEntries] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getConfig(section)
      .then((data) => setEntries(recordToEntries(data)))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load config"))
      .finally(() => setLoading(false));
  }, [section]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveConfig(section, entriesToRecord(entries));
      setSnackbar({ message: "Configuration saved", severity: "success" });
    } catch (err: unknown) {
      setSnackbar({
        message: err instanceof Error ? err.message : "Failed to save",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateEntry = (index: number, field: "key" | "value", value: string) => {
    setEntries((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const addEntry = () => setEntries((prev) => [...prev, { key: "", value: "" }]);
  const removeEntry = (index: number) =>
    setEntries((prev) => prev.filter((_, i) => i !== index));

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        3rd Service Configuration
      </Typography>

      <Tabs value={section} onChange={(_, v) => setSection(v)} sx={{ mb: 3 }}>
        {SECTIONS.map(({ value, label }) => (
          <Tab key={value} value={value} label={label} />
        ))}
      </Tabs>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Paper sx={{ p: 3 }}>
        {loading ? (
          <Typography color="text.secondary">Loading…</Typography>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button variant="outlined" size="small" onClick={addEntry} sx={{ cursor: "pointer" }}>
                Add entry
              </Button>
            </Box>
            {entries.map((entry, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <TextField
                  size="small"
                  label="Key"
                  value={entry.key}
                  onChange={(e) => updateEntry(index, "key", e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  size="small"
                  label="Value"
                  value={entry.value}
                  onChange={(e) => updateEntry(index, "value", e.target.value)}
                  sx={{ flex: 1 }}
                />
                <Button size="small" color="error" onClick={() => removeEntry(index)} sx={{ cursor: "pointer" }}>
                  Remove
                </Button>
              </Box>
            ))}
            <Button variant="contained" onClick={handleSave} disabled={saving} sx={{ cursor: "pointer" }}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </>
        )}
      </Paper>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={6000}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {snackbar ? (
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(null)}>
            {snackbar.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </Box>
  );
}
