"use client";

import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  getServices,
  suspendService,
  reloadService,
  type ServiceItem,
} from "@/services/services";

export function ServicesContent() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  const load = () => {
    setLoading(true);
    getServices()
      .then(setServices)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load services"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSuspend = async (id: string) => {
    setActionLoading(id);
    try {
      await suspendService(id);
      setSnackbar({ message: "Service suspended", severity: "success" });
      load();
    } catch (err: unknown) {
      setSnackbar({
        message: err instanceof Error ? err.message : "Failed to suspend",
        severity: "error",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReload = async (id: string) => {
    setActionLoading(id);
    try {
      await reloadService(id);
      setSnackbar({ message: "Service reloaded", severity: "success" });
      load();
    } catch (err: unknown) {
      setSnackbar({
        message: err instanceof Error ? err.message : "Failed to reload",
        severity: "error",
      });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Service Management
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading…</TableCell>
              </TableRow>
            ) : (
              services.map((svc) => (
                <TableRow key={svc.id}>
                  <TableCell>{svc.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={svc.status}
                      size="small"
                      color={
                        svc.status === "running"
                          ? "success"
                          : svc.status === "suspended"
                            ? "default"
                            : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      onClick={() => handleSuspend(svc.id)}
                      disabled={!!actionLoading}
                      sx={{ cursor: "pointer" }}
                    >
                      Suspend
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1, cursor: "pointer" }}
                      onClick={() => handleReload(svc.id)}
                      disabled={!!actionLoading}
                    >
                      Reload
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
