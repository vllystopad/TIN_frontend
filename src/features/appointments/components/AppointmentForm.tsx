import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppointmentFormStore } from "../store/appointmentFormStore";
import { useCreateAppointment } from "../api/appointmentsApi";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";

export const AppointmentForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const barberId = useAppointmentFormStore((state) => state.barberId);
    const selectedServices = useAppointmentFormStore((state) => state.selectedServices);
    const appointmentDate = useAppointmentFormStore((state) => state.appointmentDate);
    const startTime = useAppointmentFormStore((state) => state.startTime);
    const endTime = useAppointmentFormStore((state) => state.endTime);
    const notes = useAppointmentFormStore((state) => state.notes);
    const resetForm = useAppointmentFormStore((state) => state.resetForm);
    const getTotalPrice = useAppointmentFormStore((state) => state.getTotalPrice);

    const createAppointmentMutation = useCreateAppointment();

    const steps = useMemo(() => [
        t("appointments.steps.selectBarberAndServices"),
        t("appointments.steps.selectDateTime"),
    ], [t]);

    const handleNext = useCallback(() => {
        setActiveStep((prev) => prev + 1);
    }, []);

    const handleBack = useCallback(() => {
        setActiveStep((prev) => prev - 1);
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!barberId) return;

        try {
            await createAppointmentMutation.mutateAsync({
                barberId,
                serviceIds: selectedServices.map((s) => s.id),
                appointmentDate,
                startTime,
                endTime,
                totalPrice: getTotalPrice(),
                notes: notes || undefined,
            });
            resetForm();
            navigate("/");
        } catch (error) {
            // Error handled by mutation
        }
    }, [barberId, selectedServices, appointmentDate, startTime, endTime, notes, getTotalPrice, resetForm, navigate, createAppointmentMutation]);

    const isStepOneValid = useMemo(() =>
        barberId && selectedServices.length > 0,
        [barberId, selectedServices.length]
    );

    const isStepTwoValid = useMemo(() =>
        appointmentDate && startTime && endTime,
        [appointmentDate, startTime, endTime]
    );
    return (
        <Box>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
                {activeStep === 0 && <StepOne />}
                {activeStep === 1 && <StepTwo />}

                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                    >
                        {t("common.back")}
                    </Button>
                    <Box display="flex" gap={2}>
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={!isStepTwoValid || createAppointmentMutation.isPending}
                            >
                                {createAppointmentMutation.isPending
                                    ? t("appointments.creating")
                                    : t("appointments.createAppointment")}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!isStepOneValid}
                            >
                                {t("common.next")}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

