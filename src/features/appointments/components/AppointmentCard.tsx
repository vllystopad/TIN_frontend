import { Card, CardContent, Typography, Box, Chip, IconButton, Divider } from "@mui/material";
import { Delete as DeleteIcon, AccessTime as TimeIcon, CalendarToday as CalendarIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import type { Appointment } from "../types/appointment.types";

interface AppointmentCardProps {
  appointment: Appointment;
  onDelete: (id: string) => void;
}

export const AppointmentCard = ({ appointment, onDelete }: AppointmentCardProps) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {appointment.barber.firstName} {appointment.barber.lastName}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </Typography>
              <TimeIcon fontSize="small" color="action" sx={{ ml: 2 }} />
              <Typography variant="body2">
                {appointment.startTime} - {appointment.endTime}
              </Typography>
            </Box>
            <Chip
              label={t(`appointments.status.${appointment.status}`)}
              color={getStatusColor(appointment.status)}
              size="small"
              sx={{ mb: 2 }}
            />
          </Box>
          <IconButton
            onClick={() => onDelete(appointment.id)}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          {t("appointments.services")}:
        </Typography>
        {appointment.appointmentServices.map((as) => (
          <Box key={as.id} display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">{as?.service?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ${as.price.toFixed(2)}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            {t("appointments.total")}:
          </Typography>
          <Typography variant="h6" color="primary.main">
            ${appointment.totalPrice.toFixed(2)}
          </Typography>
        </Box>

        {appointment.notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="caption" color="text.secondary">
              {t("appointments.notes")}: {appointment.notes}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

