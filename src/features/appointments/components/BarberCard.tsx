import { memo } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppointmentFormStore } from "../store/appointmentFormStore";
import type { Barber } from "../types/appointment.types";

interface BarberCardProps {
    barber: Barber;
    isSelected: boolean;
}

export const BarberCard = memo(({ barber, isSelected }: BarberCardProps) => {
    const { t } = useTranslation();
    const setBarberId = useAppointmentFormStore((state) => state.setBarberId);

    return (
        <Card
            onClick={() => setBarberId(barber.id)}
            sx={{
                cursor: "pointer",
                border: isSelected ? "2px solid" : "1px solid",
                borderColor: isSelected ? "primary.main" : "divider",
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-2px)",
                },
            }}
        >
            {barber.photo && (
                <CardMedia
                    component="img"
                    height="200"
                    image={barber.photo}
                    alt={`${barber.firstName} ${barber.lastName}`}
                />
            )}
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {barber.firstName} {barber.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {barber.bio}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Chip
                        label={t("appointments.barber.experience", { years: barber.experienceYears })}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </Box>
                <Typography variant="caption" color="text.secondary">
                    {t("appointments.barber.servicesCount", { count: barber.services.length })}
                </Typography>
            </CardContent>
        </Card>
    );
});

BarberCard.displayName = "BarberCard";

