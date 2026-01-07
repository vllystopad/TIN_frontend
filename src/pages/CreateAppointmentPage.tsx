import { Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppointmentForm } from "../features/appointments/components/AppointmentForm";

export const CreateAppointmentPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("appointments.newAppointment")}
        </Typography>
        <AppointmentForm />
      </Box>
    </Container>
  );
};

