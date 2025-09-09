// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getMe,
  loginUser,
  registerUser,
  logoutUser,
  saveTokens,
  clearTokens,
} from "../api/authClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Try to restore session on app load
  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch (e) {
        // not logged in or token expired
        await clearTokens();
      } finally {
        setReady(true);
      }
    })();
  }, []);

  // --- login with email/username + password ---
  const login = async (identifier, password) => {
    const data = await loginUser({ identifier, password }); // { access, refresh, user? }
    await saveTokens(data); // save to SecureStore
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  // --- register ---
  const register = async (form) => {
    const data = await registerUser(form); // { access, refresh, user? }
    await saveTokens(data);
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    }
  };

  // --- logout ---
  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore errors
    } finally {
      await clearTokens();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
