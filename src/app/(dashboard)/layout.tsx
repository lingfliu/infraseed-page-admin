"use client";

import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch } from "@/store/hooks";
import { clearToken } from "@/store/slices/authSlice";
import { setAxiosAuthToken } from "@/services/axios";

const DRAWER_WIDTH = 240;

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/dashboard/users", label: "User Management", icon: <PeopleIcon /> },
  { path: "/dashboard/data", label: "Data Management", icon: <StorageIcon /> },
  { path: "/dashboard/services", label: "Service Management", icon: <BuildIcon /> },
  { path: "/dashboard/config", label: "3rd Service Configuration", icon: <SettingsIcon /> },
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
    setAxiosAuthToken(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Infraseed Admin
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            title="Logout"
            sx={{ cursor: "pointer" }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: 64,
            mt: 0,
            bottom: 0,
            height: "calc(100vh - 64px)",
            borderRadius: 0,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", pt: 1 }}>
          <List>
            {navItems.map(({ path, label, icon }) => (
              <ListItemButton
                key={path}
                selected={pathname === path}
                onClick={() => router.push(path)}
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: "56px", sm: "64px" },
          ml: 0,
          maxWidth: 1400,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
