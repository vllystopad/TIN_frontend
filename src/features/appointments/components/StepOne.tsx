import { useMemo } from "react";
import { Box, Typography, Stack, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGetBarbersWithServices } from "../api/appointmentsApi";
import { useAppointmentFormStore } from "../store/appointmentFormStore";
import { BarberCard } from "./BarberCard";
import { BarberCardSkeleton } from "./BarberCardSkeleton";
import { ServiceCard } from "./ServiceCard";
import { ServiceCardSkeleton } from "./ServiceCardSkeleton";

export const StepOne = () => {
    const { t } = useTranslation();
    const { data: barbers, isLoading, isError } = useGetBarbersWithServices();

    const barberId = useAppointmentFormStore((state) => state.barberId);
    const selectedServices = useAppointmentFormStore((state) => state.selectedServices);

    const selectedBarber = useMemo(() => {
        return barbers?.find((b) => b.id === barberId);
    }, [barbers, barberId]);

    if (isError) {
        return (
            <Alert severity="error">
                {t("appointments.errors.loadBarbers")}
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {t("appointments.stepOne.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                {t("appointments.stepOne.description")}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                {t("appointments.stepOne.selectBarber")}
            </Typography>
            <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={2}>
                {isLoading ? (
                    <BarberCardSkeleton />
                ) : (
                    barbers?.map((barber) => (
                        <BarberCard
                            key={barber.id}
                            barber={barber}
                            isSelected={barberId === barber.id}
                        />
                    ))
                )}
            </Box>

            {selectedBarber && (
                <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                        {t("appointments.stepOne.selectServices")}
                    </Typography>
                    <Stack spacing={2}>
                        {isLoading ? (
                            <ServiceCardSkeleton />
                        ) : (
                            selectedBarber.services.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    service={service}
                                    isSelected={selectedServices.some((s) => s.id === service.id)}
                                />
                            ))
                        )}
                    </Stack>
                </>
            )}

            {selectedServices.length > 0 && (
                <Box mt={3} p={2} bgcolor="background.paper" borderRadius={1} border={1} borderColor="divider">
                    <Typography variant="h6" gutterBottom>
                        {t("appointments.summary.title")}
                    </Typography>
                    <Typography variant="body1">
                        {t("appointments.summary.services")}: {selectedServices.length}
                    </Typography>
                    <Typography variant="body1">
                        {t("appointments.summary.duration")}: {selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0)} {t("appointments.summary.minutes")}
                    </Typography>
                    <Typography variant="h6" color="primary.main" mt={1}>
                        {t("appointments.summary.total")}: ${selectedServices.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

