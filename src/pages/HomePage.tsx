import { useCallback } from "react";
import { Container, Box, Typography, Paper, Button, CircularProgress, Alert } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMe } from "../features/auth/api/authApi";
import { useGetAppointments, useDeleteAppointment } from "../features/appointments/api/appointmentsApi";
import { AppointmentCard } from "../features/appointments/components/AppointmentCard";

export const HomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { data: userData } = useMe();
    const { data: appointments, isLoading, isError } = useGetAppointments();
    const deleteAppointmentMutation = useDeleteAppointment();

    const handleDeleteAppointment = useCallback(async (id: string) => {
        if (window.confirm(t("appointments.confirmDelete"))) {
            await deleteAppointmentMutation.mutateAsync(id);
        }
    }, [t, deleteAppointmentMutation]);

    const handleNavigateToNew = useCallback(() => {
        navigate("/appointments/new");
    }, [navigate]);

    return (
        <Container maxWidth="xl">
            <Box py={4}>
                <Box display="flex" gap={3} flexDirection={{ xs: "column", md: "row" }}>
                    <Box flex={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="h4" component="h1">
                                {t("home.myAppointments")}
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={handleNavigateToNew}
                            >
                                {t("appointments.newAppointment")}
                            </Button>
                        </Box>

                        {isLoading && (
                            <Box display="flex" justifyContent="center" py={4}>
                                <CircularProgress />
                            </Box>
                        )}

                        {isError && (
                            <Alert severity="error">
                                {t("appointments.errors.loadAppointments")}
                            </Alert>
                        )}

                        {!isLoading && !isError && appointments?.length === 0 && (
                            <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {t("appointments.noAppointments")}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {t("appointments.noAppointmentsDescription")}
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleNavigateToNew}
                                >
                                    {t("appointments.createFirst")}
                                </Button>
                            </Paper>
                        )}

                        {appointments?.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onDelete={handleDeleteAppointment}
                            />
                        ))}
                    </Box>

                    <Box flex={1}>
                        <Paper elevation={3} sx={{ p: 3, position: "sticky", top: 16 }}>
                            <Typography variant="h5" gutterBottom>
                                {t("home.profile")}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {t("home.welcome", { name: userData?.customer.firstName })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {t("home.email", { email: userData?.customer.email })}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t("home.accountType", { type: userData?.customer.type })}
                            </Typography>
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

