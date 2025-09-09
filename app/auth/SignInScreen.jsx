// app/(auth)/sign-in.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Eye, EyeOff, Phone, Mail, ArrowRight } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../src/auth/AuthContext"; // keep this path if you don't use jsconfig alias

export default function SignInScreen() {
  const router = useRouter();

  // ❗️IMPORTANT: don't destructure directly from useAuth()
  // If the provider isn't mounted, useAuth() may return null.
  const auth = typeof useAuth === "function" ? useAuth() : null;
  const login = auth?.login;
  const sendOtp = auth?.sendOtp;
  const verifyOtp = auth?.verifyOtp;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [activeTab, setActiveTab] = useState("phone"); // 'phone' | 'email'
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // simple fade-in for the card area
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;
  useEffect(() => {
    fade.setValue(0);
    slide.setValue(16);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [activeTab, otpSent]);

  const validateField = (field, value) => {
    const errors = { ...formErrors };
    if (field === "phone") {
      if (value && !/^[6-9]\d{9}$/.test(value)) errors.phone = "Please enter a valid phone number";
      else delete errors.phone;
    }
    if (field === "email") {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = "Please enter a valid email";
      else delete errors.email;
    }
    if (field === "password") {
      if (value && value.length < 6) errors.password = "Password must be at least 6 characters";
      else delete errors.password;
    }
    setFormErrors(errors);
  };

  const handlePhoneSignIn = async () => {
    if (isLoading) return;
    try {
      if (!auth) {
        console.warn("AuthProvider not mounted");
        return;
      }
      if (phoneNumber && !otpSent) {
        setIsLoading(true);
        await sendOtp?.(phoneNumber);
        setOtpSent(true);
        return;
      }
      if (otp) {
        setIsLoading(true);
        await verifyOtp?.(phoneNumber, otp);
        router.replace("(tabs)/HomeScreen");
      }
    } catch (e) {
      console.error("Phone/OTP sign-in failed:", e?.message || e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (isLoading) return;
    if (!email || !password || Object.keys(formErrors).length > 0) return;

    try {
      if (!auth) {
        console.warn("AuthProvider not mounted");
        return;
      }
      setIsLoading(true);
      await login?.(email, password);
      router.replace("(tabs)/HomeScreen");
    } catch (e) {
      console.error("Email login failed:", e?.message || e);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogins = [
    { name: "Google", icon: <AntDesign name="google" size={16} color="#DB4437" /> },
    { name: "Facebook", icon: <FontAwesome name="facebook" size={16} color="#1877F2" /> },
    { name: "Apple", icon: <AntDesign name="apple1" size={16} color="#0F172A" /> },
  ];

  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Provider warning (only shows if not wrapped in <AuthProvider>) */}
        {!auth && (
          <View style={styles.warnBox}>
            <Text style={styles.warnText}>
              AuthProvider is not mounted. Wrap your app with {"<AuthProvider>"} in App.jsx or _layout.jsx.
            </Text>
          </View>
        )}

        {/* Logo + Welcome */}
        <View style={styles.header}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <View style={styles.logoDot} />
            </View>
          </View>
        </View>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to your SuperApp account</Text>

        {/* Card */}
        <Animated.View style={[styles.card, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <Text style={styles.cardTitle}>Sign In</Text>

          {/* Tabs */}
          <View style={styles.tabsList}>
            <TabButton
              active={activeTab === "phone"}
              onPress={() => setActiveTab("phone")}
              label="Phone"
              icon={<Phone size={16} color={activeTab === "phone" ? "#fff" : "#475569"} />}
            />
            <TabButton
              active={activeTab === "email"}
              onPress={() => setActiveTab("email")}
              label="Email"
              icon={<Mail size={16} color={activeTab === "email" ? "#fff" : "#475569"} />}
            />
          </View>

          {/* Phone Tab */}
          {activeTab === "phone" && (
            <View>
              {!otpSent ? (
                <View>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.phoneRow}>
                    <View style={styles.ccBox}>
                      <Text style={styles.ccText}>+91</Text>
                    </View>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={(t) => {
                        const v = t.replace(/[^0-9]/g, "").slice(0, 10);
                        setPhoneNumber(v);
                        validateField("phone", v);
                      }}
                      placeholder="Enter your phone number"
                      keyboardType="number-pad"
                      maxLength={10}
                      editable={!isLoading}
                      style={[styles.input, styles.inputRight]}
                    />
                  </View>
                  {formErrors.phone && <Text style={styles.errorText}>{formErrors.phone}</Text>}
                </View>
              ) : (
                <View>
                  <Text style={styles.label}>Enter OTP</Text>
                  <TextInput
                    value={otp}
                    onChangeText={(t) => setOtp(t.replace(/[^0-9]/g, "").slice(0, 6))}
                    placeholder="6-digit OTP"
                    keyboardType="number-pad"
                    maxLength={6}
                    editable={!isLoading}
                    style={[styles.input, { textAlign: "center", letterSpacing: 4 }]}
                  />
                  <Text style={styles.muted}>OTP sent to +91 {phoneNumber}</Text>
                  <Pressable onPress={() => setOtpSent(false)} disabled={isLoading} style={styles.linkBtn}>
                    <Text style={styles.linkText}>Change phone number</Text>
                  </Pressable>
                </View>
              )}

              <PrimaryButton
                onPress={handlePhoneSignIn}
                disabled={(!phoneNumber && !otpSent) || (otpSent && !otp) || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <Text style={styles.primaryBtnText}>{!otpSent ? "Send OTP" : "Verify OTP"}</Text>
                    <ArrowRight size={18} color="#fff" style={{ marginLeft: 6 }} />
                  </>
                )}
              </PrimaryButton>
            </View>
          )}

          {/* Email Tab */}
          {activeTab === "email" && (
            <View>
              <Field
                label="Email"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  validateField("email", t);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                editable={!isLoading}
              />
              <Text style={styles.errorText}>{formErrors.email || ""}</Text>

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    validateField("password", t);
                  }}
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                  style={[styles.input, { paddingRight: 44 }]}
                />
                <Pressable
                  onPress={() => setShowPassword((s) => !s)}
                  hitSlop={10}
                  style={styles.eyeBtn}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} color="#475569" /> : <Eye size={18} color="#475569" />}
                </Pressable>
              </View>
              <Text style={styles.errorText}>{formErrors.password || ""}</Text>

              <View style={{ alignItems: "flex-end" }}>
                <Pressable disabled={isLoading}>
                  <Text style={styles.linkText}>Forgot password?</Text>
                </Pressable>
              </View>

              <PrimaryButton
                onPress={handleEmailSignIn}
                disabled={!email || !password || Object.keys(formErrors).length > 0 || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <Text style={styles.primaryBtnText}>Sign In</Text>
                    <ArrowRight size={18} color="#fff" style={{ marginLeft: 6 }} />
                  </>
                )}
              </PrimaryButton>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerWrap}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
          </View>

          {/* Socials (icons) */}
          <View style={styles.socialRow}>
            {socialLogins.map((s) => (
              <Pressable
                key={s.name}
                onPress={() => console.log(`Login with ${s.name}`)}
                disabled={isLoading}
                style={({ pressed }) => [styles.socialBtn, pressed && { opacity: 0.9 }]}
              >
                {s.icon}
                <Text style={styles.socialText}>{s.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Sign Up link */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text style={styles.muted}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/SignUpScreen" asChild>
                <Text style={styles.linkText}>Sign up</Text>
              </Link>
            </Text>
          </View>
        </Animated.View>

        {/* Terms */}
        <Text style={styles.footerText}>
          By signing in, you agree to our{" "}
          <Text style={styles.footerLink}>Terms of Service</Text> and{" "}
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

/* ------ small building blocks ------ */

function TabButton({ active, onPress, label, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabBtn, { backgroundColor: active ? "#6366F1" : "#F1F5F9" }]}
    >
      {icon}
      <Text style={[styles.tabBtnText, { color: active ? "#fff" : "#475569" }]}>{label}</Text>
    </Pressable>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
  editable = true,
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        style={styles.input}
      />
    </View>
  );
}

function PrimaryButton({ children, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.primaryBtn, disabled && { opacity: 0.5 }, pressed && { opacity: 0.9 }]}
    >
      {children}
    </Pressable>
  );
}

/* ------ styles ------ */
const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "rgba(99,102,241,0.05)",
  },
  container: { width: "100%", maxWidth: 440, alignSelf: "center" },

  // warning banner if provider missing
  warnBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
    marginBottom: 8,
  },
  warnText: { color: "#7C2D12", fontSize: 12 },

  header: { alignItems: "center", marginTop: 12, marginBottom: 16 },
  logoOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logoInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoDot: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#6366F1" },
  title: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 14, color: "#64748B", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },

  tabsList: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  tabBtn: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  tabBtnText: { fontSize: 14, fontWeight: "700" },

  label: { fontSize: 12, color: "#334155", marginBottom: 6, fontWeight: "600" },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#0F172A",
  },

  phoneRow: { flexDirection: "row", alignItems: "center" },
  ccBox: {
    height: 44,
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
  },
  ccText: { fontSize: 14, color: "#64748B" },
  inputRight: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, flex: 1 },

  errorText: { color: "#EF4444", fontSize: 12, marginTop: 4, minHeight: 16 },

  passwordWrap: { position: "relative", justifyContent: "center" },
  eyeBtn: {
    position: "absolute",
    right: 8,
    height: 44,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryBtn: {
    marginTop: 10,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  dividerWrap: { marginTop: 14, marginBottom: 10, alignItems: "center" },
  divider: { height: 1, backgroundColor: "#E2E8F0", width: "100%" },
  dividerText: {
    position: "absolute",
    paddingHorizontal: 8,
    fontSize: 12,
    color: "#64748B",
    backgroundColor: "#fff",
    top: -8,
  },

  socialRow: { flexDirection: "row", gap: 8, justifyContent: "space-between" },
  socialBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#fff",
  },
  socialText: { fontSize: 14, color: "#334155", fontWeight: "600" },

  muted: { fontSize: 12, color: "#64748B", marginTop: 6 },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748B",
    marginTop: 10,
    marginBottom: 12,
  },
  footerLink: { color: "#6366F1", textDecorationLine: "underline" },
  linkBtn: { paddingVertical: 6 },
  linkText: { color: "#6366F1", fontWeight: "700" },
});
