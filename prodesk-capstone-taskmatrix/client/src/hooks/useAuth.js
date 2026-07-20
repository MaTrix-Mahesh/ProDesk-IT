import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../services/api";
import useAuthStore from "../store/authStore";

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  const { data: profile, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/profile").then((r) => r.data.data),
    enabled: !!localStorage.getItem("accessToken"),
    retry: false,
    staleTime: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    if (profile) {
      setUser(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (isError && localStorage.getItem("accessToken")) {
      logout();
    }
  }, [isError]);

  const loginMutation = useMutation({
    mutationFn: (credentials) => api.post("/auth/login", credentials).then((r) => r.data.data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData) => api.post("/auth/register", userData).then((r) => r.data.data),
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSuccess: () => logout(),
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}