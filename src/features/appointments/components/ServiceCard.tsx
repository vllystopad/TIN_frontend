import { memo, useCallback } from "react";
import { Card, CardContent, Typography, Box, Chip, Checkbox } from "@mui/material";
import { AccessTime as TimeIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppointmentFormStore } from "../store/appointmentFormStore";
import type { Service } from "../types/appointment.types";

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
}

export const ServiceCard = memo(({ service, isSelected }: ServiceCardProps) => {
    const { t } = useTranslation();
    const setSelectedServices = useAppointmentFormStore((state) => state.setSelectedServices);

    const handleToggle = useCallback(() => {
        setSelectedServices((prevServices) => {
            const isCurrentlySelected = prevServices.some((s) => s.id === service.id);
            if (isCurrentlySelected) {
                return prevServices.filter((s) => s.id !== service.id);
            } else {
                return [...prevServices, service];
            }
        });
    }, [service, setSelectedServices]);

    return (
        <Card
            onClick={handleToggle}
            sx={{
                cursor: "pointer",
                border: isSelected ? "2px solid" : "1px solid",
                borderColor: isSelected ? "primary.main" : "divider",
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 2,
                },
            }}
        >
            <CardContent>
                <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                    <Box flex={1}>
                        <Typography variant="h6" gutterBottom>
                            {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            {service.description}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Chip
                                icon={<TimeIcon />}
                                label={t("appointments.service.duration", { minutes: service.durationMinutes })}
                                size="small"
                                variant="outlined"
                            />
                            <Typography variant="h6" color="primary.main">
                                ${service.price.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                    <Checkbox checked={isSelected} />
                </Box>
            </CardContent>
        </Card>
    );
});

ServiceCard.displayName = "ServiceCard";

