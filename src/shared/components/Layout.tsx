import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useLogout } from "../../features/auth/api/authApi";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logoutMutation = useLogout();

  const handleAuthAction = async () => {
    if (isAuthenticated) {
      try {
        await logoutMutation.mutateAsync();
        navigate("/login");
      } catch (error) {
        // Error handled by snackbar in useLogout hook
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Barbershop
          </Typography>
          <Button
            color="inherit"
            onClick={handleAuthAction}
            disabled={logoutMutation.isPending}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Barbershop © 2026. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

