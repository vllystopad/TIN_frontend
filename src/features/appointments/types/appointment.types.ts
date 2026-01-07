export interface Service {
    id: string;
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    barberServiceId: string;
}

export interface Barber {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    photo: string | null;
    experienceYears: number;
    services: Service[];
}

export interface AppointmentService {
    id: string;
    serviceId: string;
    price: number;
    durationMinutes: number;
    service: {
        id: string;
        name: string;
        description?: string;
    };
}

export interface Appointment {
    id: string;
    customerId: string;
    barberId: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    notes: string | null;
    cancellationReason: string | null;
    createdAt: string;
    updatedAt: string;
    barber: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        photo?: string | null;
    };
    appointmentServices: AppointmentService[];
}

export interface CreateAppointmentDto {
    barberId: string;
    serviceIds: string[];
    appointmentDate: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    notes?: string;
}

