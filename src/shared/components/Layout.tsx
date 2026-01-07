import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { useAuthStore } from "../../features/auth/store/authStore";
import { useLogout } from "../../features/auth/api/authApi";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const { t } = useTranslation();
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
                        {t("common.barbershop")}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <LanguageSwitcher />
                        <Button
                            color="inherit"
                            onClick={handleAuthAction}
                            disabled={logoutMutation.isPending}
                        >
                            {isAuthenticated ? t("common.logout") : t("common.login")}
                        </Button>
                    </Box>
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
                        {t("common.copyright")}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

