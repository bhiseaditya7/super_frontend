// src/authClient.jsx
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// --- Host detection (emulator / physical device) ---
let HOST = "127.0.0.1";
if (Platform.OS === "android") HOST = "10.0.2.2"; // Android emulator
// If you run on a physical device, set your PC's LAN IP
// HOST = "192.168.1.xx";

export const API_BASE = `http://${HOST}:8000/api`;

// --- Axios instance ---
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// --- Token management ---
let accessToken = null;
let refreshToken = null;
let isRefreshing = false;
let refreshWaiters = [];

async function loadTokens() {
  if (!accessToken) accessToken = await SecureStore.getItemAsync("access");
  if (!refreshToken) refreshToken = await SecureStore.getItemAsync("refresh");
}

export async function saveTokens({ access, refresh }) {
  accessToken = access || accessToken;
  refreshToken = refresh || refreshToken;
  if (access) await SecureStore.setItemAsync("access", access);
  if (refresh) await SecureStore.setItemAsync("refresh", refresh);
}

export async function clearTokens() {
  accessToken = null;
  refreshToken = null;
  await SecureStore.deleteItemAsync("access");
  await SecureStore.deleteItemAsync("refresh");
}

// --- Attach token before request ---
api.interceptors.request.use(async (config) => {
  await loadTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// --- Refresh token if 401 ---
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      await loadTokens();
      if (!refreshToken) throw error;

      if (isRefreshing) {
        await new Promise((res) => refreshWaiters.push(res));
      } else {
        isRefreshing = true;
        try {
          const resp = await axios.post(`${API_BASE}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          await saveTokens(resp.data);
        } catch (e) {
          await clearTokens();
          isRefreshing = false;
          refreshWaiters.forEach((fn) => fn());
          refreshWaiters = [];
          throw error;
        }
        isRefreshing = false;
        refreshWaiters.forEach((fn) => fn());
        refreshWaiters = [];
      }
      await loadTokens();
      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    }
    throw error;
  }
);

// --- High-level Auth API ---
export const AuthAPI = {
  register: (payload) =>
    api.post("/auth/register/", {
      username: payload.username || payload.email,
      email: payload.email,
      password: payload.password,
      password2: payload.password2,
      first_name: payload.first_name,
      last_name: payload.last_name,
    }),

  login: (identifier, password) =>
    api.post("/auth/login/", { identifier, password }),

  me: () => api.get("/auth/me/"),

  logout: () => {
    if (!refreshToken) return Promise.resolve();
    return api.post("/auth/logout/", { refresh: refreshToken }).finally(() =>
      clearTokens()
    );
  },

  // Optional: OTP endpoints
  sendOtp: (phone) => api.post("/auth/send-otp/", { phone }),
  verifyOtp: (phone, otp) => api.post("/auth/verify-otp/", { phone, otp }),
};
