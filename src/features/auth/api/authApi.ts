import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { apiClient } from "../../../shared/api/baseApi";
import { useAuthStore } from "../store/authStore";
import type {
    RegisterDto,
    LoginDto,
    AuthResponse,
    RefreshResponse,
    LogoutResponse,
} from "../types/auth.types";

const AUTH_BASE_URL = "/auth/customers";

export const authApi = {
    register: async (data: RegisterDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(`${AUTH_BASE_URL}/register`, data);
        return response.data;
    },

    login: async (data: LoginDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>(`${AUTH_BASE_URL}/login`, data);
        return response.data;
    },

    logout: async (): Promise<LogoutResponse> => {
        const response = await apiClient.post<LogoutResponse>(`${AUTH_BASE_URL}/logout`);
        return response.data;
    },

    refresh: async (): Promise<RefreshResponse> => {
        const response = await apiClient.post<RefreshResponse>(`${AUTH_BASE_URL}/refresh`);
        return response.data;
    },

    getMe: async (): Promise<AuthResponse> => {
        const response = await apiClient.get<AuthResponse>(`${AUTH_BASE_URL}/me`);
        return response.data;
    },
};

export const useRegister = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            setAuthenticated(true);
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
            enqueueSnackbar(t("auth.snackbar.registerSuccess"), { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar(t("auth.snackbar.registerError"), { variant: "error" });
        },
    });
};

export const useLogin = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: () => {
            setAuthenticated(true);
            queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
            enqueueSnackbar(t("auth.snackbar.loginSuccess"), { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar(t("auth.snackbar.loginError"), { variant: "error" });
        },
    });
};

export const useLogout = () => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const logout = useAuthStore((state) => state.logout);
    const { enqueueSnackbar } = useSnackbar();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            logout();
            queryClient.clear();
            enqueueSnackbar(t("auth.snackbar.logoutSuccess"), { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar(t("auth.snackbar.logoutError"), { variant: "error" });
        },
    });
};

export const useMe = () => {
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

    const query = useQuery({
        queryKey: ["auth", "me"],
        queryFn: async () => {
            try {
                const data = await authApi.getMe();
                setAuthenticated(true);
                return data;
            } catch (error) {
                setAuthenticated(false);
                throw error;
            }
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    return query;
};

