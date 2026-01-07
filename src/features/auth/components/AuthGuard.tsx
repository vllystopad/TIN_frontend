import { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMe } from "../api/authApi";
import { Box, CircularProgress } from "@mui/material";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { isLoading, isError } = useMe();

    useEffect(() => {
        if (!isLoading && (isError || !isAuthenticated)) {
            navigate("/login");
        }
    }, [isLoading, isError, isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

