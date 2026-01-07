import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { apiClient } from "../../../shared/api/baseApi";
import type { Barber, Appointment, CreateAppointmentDto } from "../types/appointment.types";

const APPOINTMENTS_BASE_URL = "/appointments";

export const appointmentsApi = {
    getBarbersWithServices: async (): Promise<Barber[]> => {
        const response = await apiClient.get<Barber[]>(`${APPOINTMENTS_BASE_URL}/barbers-with-services`);
        return response.data;
    },

    getAppointments: async (): Promise<Appointment[]> => {
        const response = await apiClient.get<Appointment[]>(APPOINTMENTS_BASE_URL);
        return response.data;
    },

    getAppointmentById: async (id: string): Promise<Appointment> => {
        const response = await apiClient.get<Appointment>(`${APPOINTMENTS_BASE_URL}/${id}`);
        return response.data;
    },

    createAppointment: async (data: CreateAppointmentDto): Promise<Appointment> => {
        const response = await apiClient.post<Appointment>(APPOINTMENTS_BASE_URL, data);
        return response.data;
    },

    deleteAppointment: async (id: string): Promise<void> => {
        await apiClient.delete(`${APPOINTMENTS_BASE_URL}/${id}`);
    },
};

export const useGetBarbersWithServices = () => {
    return useQuery({
        queryKey: ["barbers", "with-services"],
        queryFn: appointmentsApi.getBarbersWithServices,
        staleTime: 5 * 60 * 1000,
    });
};

export const useGetAppointments = () => {
    return useQuery({
        queryKey: ["appointments"],
        queryFn: appointmentsApi.getAppointments,
        staleTime: 1 * 60 * 1000,
    });
};

export const useCreateAppointment = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: appointmentsApi.createAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            enqueueSnackbar(t("appointments.snackbar.createSuccess"), { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar(t("appointments.snackbar.createError"), { variant: "error" });
        },
    });
};

export const useDeleteAppointment = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: appointmentsApi.deleteAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            enqueueSnackbar(t("appointments.snackbar.deleteSuccess"), { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar(t("appointments.snackbar.deleteError"), { variant: "error" });
        },
    });
};

