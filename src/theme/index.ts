import { createTheme } from "@mui/material/styles";

// Elevation shadows (Dimensional Layering) – cards and depth
const shadows = {
  elevation1: "0 1px 3px rgba(0,0,0,0.08)",
  elevation2: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.08)",
  elevation3: "0 10px 20px rgba(0,0,0,0.08)",
  elevation4: "0 20px 40px rgba(0,0,0,0.12)",
  appBar: "0 1px 3px rgba(0,0,0,0.06)",
  drawer: "2px 0 8px rgba(0,0,0,0.06)",
};

// Technical / industry palette: Indigo primary + emerald accent (design-system)
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6366F1" },
    secondary: { main: "#818CF8" },
    success: { main: "#10B981" },
    background: {
      default: "#F5F3FF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E1B4B",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },
  typography: {
    fontFamily: '"Fira Sans", "Helvetica Neue", Arial, sans-serif',
    h4: { fontWeight: 600, letterSpacing: "-0.02em", color: "#1E1B4B" },
    h5: { fontWeight: 600, color: "#1E1B4B" },
    h6: { fontWeight: 600, color: "#1E1B4B" },
    body1: { fontWeight: 400, color: "#1E1B4B" },
    body2: { color: "#64748B" },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    duration: { shortest: 150, shorter: 200, short: 250 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#F5F3FF" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: shadows.elevation2,
          borderRadius: 8,
          transition: "box-shadow 0.2s ease",
          "&:hover": { boxShadow: shadows.elevation3 },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: shadows.elevation2,
          borderRadius: 8,
          transition: "box-shadow 0.2s ease",
          "&:hover": { boxShadow: shadows.elevation3 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          transition: "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
        },
        contained: {
          boxShadow: shadows.elevation1,
          "&:hover": { boxShadow: shadows.elevation2 },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          borderRadius: 8,
          marginRight: 8,
          marginLeft: 8,
          transition: "background-color 0.2s ease",
          "&.Mui-selected": {
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            paddingLeft: 24,
            "& .MuiListItemText-primary": { fontWeight: 600, color: "#6366F1" },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "background-color 0.2s ease",
          "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04)" },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#E2E8F0" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: shadows.appBar,
          backgroundColor: "#FFFFFF",
          color: "#1E1B4B",
          borderRadius: 0,
          width: "100%",
          left: 0,
          right: 0,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: shadows.drawer,
          backgroundColor: "#FFFFFF",
          border: "none",
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": { borderColor: "#E2E8F0" },
            "&:hover fieldset": { borderColor: "#6366F1", borderWidth: "1px" },
            "&.Mui-focused fieldset": { borderColor: "#6366F1", borderWidth: "2px" },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { borderBottom: "1px solid #E2E8F0" },
        indicator: { backgroundColor: "#6366F1" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: shadows.elevation4,
          borderRadius: 12,
          border: "none",
        },
      },
    },
  },
});

export default theme;
