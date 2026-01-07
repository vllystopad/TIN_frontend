import { create } from "zustand";
import type { Service } from "../types/appointment.types";

interface AppointmentFormState {
  barberId: string | null;
  selectedServices: Service[];
  appointmentDate: string;
  startTime: string;
  endTime: string;
  notes: string;
}

interface AppointmentFormActions {
  setBarberId: (id: string | null) => void;
  setSelectedServices: (services: Service[] | ((prev: Service[]) => Service[])) => void;
  setAppointmentDate: (date: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setNotes: (notes: string) => void;
  resetForm: () => void;
  getTotalPrice: () => number;
  getTotalDuration: () => number;
}

type AppointmentFormStore = AppointmentFormState & AppointmentFormActions;

const initialState: AppointmentFormState = {
  barberId: null,
  selectedServices: [],
  appointmentDate: "",
  startTime: "",
  endTime: "",
  notes: "",
};

export const useAppointmentFormStore = create<AppointmentFormStore>((set, get) => ({
  ...initialState,

  setBarberId: (id) =>
    set({ barberId: id, selectedServices: [] }),

  setSelectedServices: (services) =>
    set((state) => ({
      selectedServices:
        typeof services === "function" ? services(state.selectedServices) : services,
    })),

  setAppointmentDate: (date) => set({ appointmentDate: date }),

  setStartTime: (time) => set({ startTime: time }),

  setEndTime: (time) => set({ endTime: time }),

  setNotes: (notes) => set({ notes }),

  resetForm: () => set(initialState),

  getTotalPrice: () => {
    const { selectedServices } = get();
    return selectedServices.reduce((sum, service) => sum + service.price, 0);
  },

  getTotalDuration: () => {
    const { selectedServices } = get();
    return selectedServices.reduce((sum, service) => sum + service.durationMinutes, 0);
  },
}));

