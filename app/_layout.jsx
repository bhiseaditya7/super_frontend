// app/_layout.jsx  (root layout – wraps everything)
import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext"; // ✅ one ".."

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
