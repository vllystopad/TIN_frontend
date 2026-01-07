import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useRegister } from "../features/auth/api/authApi";

export const RegistrationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const registerMutation = useRegister();

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await registerMutation.mutateAsync(formData);
            navigate("/");
        } catch (error) {
            // Error handled by snackbar in useRegister hook
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mx: 0 }}>
            <Box display="flex" flexDirection="column" justifyContent="center" minHeight="100vh" py={4}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        {t("auth.register.title")}
                    </Typography>


                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                            <TextField
                                required
                                fullWidth
                                id="firstName"
                                label={t("common.firstName")}
                                name="firstName"
                                autoComplete="given-name"
                                autoFocus
                                value={formData.firstName}
                                onChange={handleChange("firstName")}
                                disabled={registerMutation.isPending}
                            />
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label={t("common.lastName")}
                                name="lastName"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={handleChange("lastName")}
                                disabled={registerMutation.isPending}
                            />
                        </Box>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t("common.email")}
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange("email")}
                            disabled={registerMutation.isPending}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t("common.password")}
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            helperText={t("auth.register.passwordHelper")}
                            value={formData.password}
                            onChange={handleChange("password")}
                            disabled={registerMutation.isPending}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? t("auth.register.registering") : t("common.register")}
                        </Button>

                        <Box textAlign="center">
                            <Typography variant="body2">
                                {t("auth.register.alreadyHaveAccount")}{" "}
                                <Link component={RouterLink} to="/login" underline="hover">
                                    {t("auth.register.loginHere")}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

