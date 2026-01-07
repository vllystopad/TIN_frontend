import { useCallback, useMemo, useEffect } from "react";
import { Box, Typography, TextField, Paper, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppointmentFormStore } from "../store/appointmentFormStore";

export const StepTwo = () => {
    const { t } = useTranslation();

    const appointmentDate = useAppointmentFormStore((state) => state.appointmentDate);
    const startTime = useAppointmentFormStore((state) => state.startTime);
    const notes = useAppointmentFormStore((state) => state.notes);
    const selectedServices = useAppointmentFormStore((state) => state.selectedServices);

    const setAppointmentDate = useAppointmentFormStore((state) => state.setAppointmentDate);
    const setStartTime = useAppointmentFormStore((state) => state.setStartTime);
    const setEndTime = useAppointmentFormStore((state) => state.setEndTime);
    const setNotes = useAppointmentFormStore((state) => state.setNotes);
    const getTotalDuration = useAppointmentFormStore((state) => state.getTotalDuration);

    const today = useMemo(() => new Date().toISOString().split("T")[0], []);

    const timeSlots = useMemo(() => {
        const slots = [];
        for (let hour = 8; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    }, []);

    const calculateEndTime = useCallback((startTime: string, durationMinutes: number) => {
        if (!startTime) return "";

        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + durationMinutes;
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;

        return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    }, []);

    const endTime = useMemo(() => {
        return calculateEndTime(startTime, getTotalDuration());
    }, [startTime, getTotalDuration, calculateEndTime]);

    useEffect(() => {
        setEndTime(endTime);
    }, [endTime, setEndTime]);

    const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointmentDate(e.target.value);
    }, [setAppointmentDate]);

    const handleStartTimeChange = useCallback((e: any) => {
        setStartTime(e.target.value);
    }, [setStartTime]);

    const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    }, [setNotes]);

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                {t("appointments.stepTwo.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                {t("appointments.stepTwo.description")}
            </Typography>

            <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {t("appointments.stepTwo.dateTime")}
                </Typography>

                <TextField
                    fullWidth
                    type="date"
                    label={t("appointments.stepTwo.date")}
                    value={appointmentDate}
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ min: today }}
                    sx={{ mb: 2 }}
                />

                <Box display="flex" gap={2} mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="start-time-label">{t("appointments.stepTwo.startTime")}</InputLabel>
                        <Select
                            labelId="start-time-label"
                            value={startTime}
                            onChange={handleStartTimeChange}
                            label={t("appointments.stepTwo.startTime")}
                        >
                            {timeSlots.map((time) => (
                                <MenuItem key={time} value={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label={t("appointments.stepTwo.endTime")}
                        value={endTime}
                        InputProps={{ readOnly: true }}
                        disabled
                        helperText={t("appointments.stepTwo.calculatedAutomatically")}
                    />
                </Box>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label={t("appointments.stepTwo.notes")}
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder={t("appointments.stepTwo.notesPlaceholder")}
                />
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mt: 3, bgcolor: "primary.light", color: "primary.contrastText" }}>
                <Typography variant="h6" gutterBottom>
                    {t("appointments.summary.title")}
                </Typography>
                <Typography variant="body1">
                    {t("appointments.summary.services")}: {selectedServices.length}
                </Typography>
                <Typography variant="body1">
                    {t("appointments.summary.duration")}: {selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0)} {t("appointments.summary.minutes")}
                </Typography>
                <Typography variant="h5" mt={2}>
                    {t("appointments.summary.total")}: ${selectedServices.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
                </Typography>
            </Paper>
        </Box>
    );
};

