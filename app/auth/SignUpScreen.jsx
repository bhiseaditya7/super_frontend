import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Eye, EyeOff, Phone, Mail, ArrowRight } from "lucide-react-native";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons"; // ✅ brand icons

/** Props:
 *  onSignUp: () => void
 *  onNavigateToSignIn: () => void   // optional (fallback if you prefer props)
 */
export default function SignUpScreen({ onSignUp, onNavigateToSignIn }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("phone");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleInputChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isEmailFormValid = () =>
    formData.firstName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword === formData.password &&
    formData.agreeToTerms;

  const handlePhoneSignUp = () => {
    if (formData.phoneNumber && formData.firstName && !otpSent) {
      setOtpSent(true); // simulate OTP send
    } else if (otp) {
      onSignUp && onSignUp();
    }
  };

  const handleEmailSignUp = () => {
    if (isEmailFormValid()) onSignUp && onSignUp();
  };

  const goToSignIn = () => {
    if (onNavigateToSignIn) onNavigateToSignIn();
    else router.push("auth/SignInScreen"); // ✅ fallback to router
  };

  const socialLogins = [
    { name: "Google", icon: <AntDesign name="google" size={18} color="#DB4437" /> },
    { name: "Facebook", icon: <FontAwesome name="facebook" size={18} color="#1877F2" /> },
    { name: "Apple", icon: <AntDesign name="apple1" size={18} color="#0F172A" /> },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.screen}
      keyboardShouldPersistTaps="handled"  // ✅ taps work with keyboard open
    >
      <View style={styles.container}>
        {/* Logo + Welcome */}
        <View style={styles.header}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <View style={styles.logoDot} />
            </View>
          </View>
          <Text style={styles.title}>Join SuperApp!</Text>
          <Text style={styles.subtitle}>Create your account to get started</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Account</Text>

          {/* Tabs */}
          <View style={styles.tabsList}>
            <TabButton
              label="Phone"
              icon={<Phone size={16} color={activeTab === "phone" ? "#fff" : "#475569"} />}
              active={activeTab === "phone"}
              onPress={() => setActiveTab("phone")}
            />
            <TabButton
              label="Email"
              icon={<Mail size={16} color={activeTab === "email" ? "#fff" : "#475569"} />}
              active={activeTab === "email"}
              onPress={() => setActiveTab("email")}
            />
          </View>

          {/* Phone Registration */}
          {activeTab === "phone" && (
            <View style={styles.tabContent}>
              {!otpSent ? (
                <>
                  <View style={styles.row}>
                    <Field
                      label="First Name"
                      value={formData.firstName}
                      onChangeText={(t) => handleInputChange("firstName", t)}
                      placeholder="First name"
                      style={{ flex: 1, marginRight: 6 }}
                    />
                    <Field
                      label="Last Name"
                      value={formData.lastName}
                      onChangeText={(t) => handleInputChange("lastName", t)}
                      placeholder="Last name"
                      style={{ flex: 1, marginLeft: 6 }}
                    />
                  </View>

                  <View style={{ marginBottom: 12 }}>
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.phoneRow}>
                      <View style={styles.ccBox}>
                        <Text style={styles.ccText}>+91</Text>
                      </View>
                      <TextInput
                        value={formData.phoneNumber}
                        onChangeText={(t) =>
                          handleInputChange("phoneNumber", t.replace(/[^0-9]/g, "").slice(0, 10))
                        }
                        placeholder="Enter phone number"
                        keyboardType="number-pad"
                        maxLength={10}
                        style={[styles.input, styles.inputRight]}
                      />
                    </View>
                  </View>

                  <Field
                    label="City"
                    value={formData.city}
                    onChangeText={(t) => handleInputChange("city", t)}
                    placeholder="Enter your city"
                  />
                </>
              ) : (
                <View>
                  <Field
                    label="Enter OTP"
                    value={otp}
                    onChangeText={(t) => setOtp(t.replace(/[^0-9]/g, "").slice(0, 6))}
                    placeholder="6-digit OTP"
                    keyboardType="number-pad"
                  />
                  <Text style={styles.muted}>OTP sent to +91 {formData.phoneNumber}</Text>

                  <Pressable onPress={() => setOtpSent(false)} style={styles.linkBtn}>
                    <Text style={styles.linkText}>Change details</Text>
                  </Pressable>
                </View>
              )}

              <PrimaryButton
                label={!otpSent ? "Send OTP" : "Verify & Create Account"}
                onPress={handlePhoneSignUp}
                disabled={
                  ((!formData.phoneNumber || !formData.firstName) && !otpSent) ||
                  (otpSent && !otp)
                }
              />
            </View>
          )}

          {/* Email Registration */}
          {activeTab === "email" && (
            <View style={styles.tabContent}>
              <View style={styles.row}>
                <Field
                  label="First Name"
                  value={formData.firstName}
                  onChangeText={(t) => handleInputChange("firstName", t)}
                  placeholder="First name"
                  style={{ flex: 1, marginRight: 6 }}
                />
                <Field
                  label="Last Name"
                  value={formData.lastName}
                  onChangeText={(t) => handleInputChange("lastName", t)}
                  placeholder="Last name"
                  style={{ flex: 1, marginLeft: 6 }}
                />
              </View>

              <Field
                label="Email"
                value={formData.email}
                onChangeText={(t) => handleInputChange("email", t)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrap}>
                  <TextInput
                    value={formData.password}
                    onChangeText={(t) => handleInputChange("password", t)}
                    placeholder="Create password"
                    secureTextEntry={!showPassword}
                    style={[styles.input, { paddingRight: 44 }]}
                  />
                  <Pressable
                    onPress={() => setShowPassword((s) => !s)}
                    style={styles.eyeBtn}
                    hitSlop={10}
                  >
                    {showPassword ? <EyeOff size={18} color="#475569" /> : <Eye size={18} color="#475569" />}
                  </Pressable>
                </View>
              </View>

              {/* Confirm Password */}
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.label}>Confirm Password</Text>
                <View style={styles.passwordWrap}>
                  <TextInput
                    value={formData.confirmPassword}
                    onChangeText={(t) => handleInputChange("confirmPassword", t)}
                    placeholder="Confirm password"
                    secureTextEntry={!showConfirmPassword}
                    style={[styles.input, { paddingRight: 44 }]}
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword((s) => !s)}
                    style={styles.eyeBtn}
                    hitSlop={10}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} color="#475569" />
                    ) : (
                      <Eye size={18} color="#475569" />
                    )}
                  </Pressable>
                </View>
                {formData.password &&
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword && (
                    <Text style={styles.errorText}>Passwords don't match</Text>
                  )}
              </View>

              <Field
                label="City"
                value={formData.city}
                onChangeText={(t) => handleInputChange("city", t)}
                placeholder="Enter your city"
              />

              {/* Terms */}
              <View style={styles.termsRow}>
                <CheckBox
                  checked={!!formData.agreeToTerms}
                  onToggle={() =>
                    handleInputChange("agreeToTerms", !formData.agreeToTerms)
                  }
                />
                <Text style={styles.termsText}>
                  I agree to the{" "}
                  <Text style={styles.linkText}>Terms & Conditions</Text>
                </Text>
              </View>

              <PrimaryButton
                label="Create Account"
                onPress={handleEmailSignUp}
                disabled={!isEmailFormValid()}
              />
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerWrap}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
          </View>

          {/* Social (with real icons) */}
          <View style={styles.socialRow}>
            {socialLogins.map((s) => (
              <Pressable key={s.name} onPress={onSignUp} style={styles.socialBtn}>
                {s.icon}
                <Text style={styles.socialText}>{s.name}</Text>
              </Pressable>
            ))}
          </View>

          {/* Sign in */}
          <View style={{ alignItems: "center", marginTop: 8 }}>
            <Text style={styles.muted}>
              Already have an account?{" "}
              {/* Prefer Link for routing */}
              <Link href="auth/SignInScreen" asChild>
                <Text style={styles.linkText}>Sign in</Text>
              </Link>
              {/* If you prefer prop-based navigation instead: */}
              {/* <Text onPress={goToSignIn} style={styles.linkText}>Sign in</Text> */}
            </Text>
          </View>
        </View>

        {/* Terms footer */}
        <Text style={styles.footerText}>
          By creating an account, you agree to our{" "}
          <Text style={styles.footerLink}>Terms of Service</Text> and{" "}
          <Text style={styles.footerLink}>Privacy Policy</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

/* ----- Small building blocks ----- */

function TabButton({ label, icon, active, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tabBtn,
        { backgroundColor: active ? "#6366F1" : "#F1F5F9" },
      ]}
    >
      {icon}
      <Text style={[styles.tabBtnText, { color: active ? "#fff" : "#475569" }]}>
        {label}
      </Text>
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
  style,
}) {
  return (
    <View style={[{ marginBottom: 12 }, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
    </View>
  );
}

function PrimaryButton({ label, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.primaryBtn,
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.9 },
      ]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
      <ArrowRight size={18} color="#fff" style={{ marginLeft: 6 }} />
    </Pressable>
  );
}

function CheckBox({ checked, onToggle }) {
  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.checkbox,
        { backgroundColor: checked ? "#6366F1" : "#fff", borderColor: checked ? "#6366F1" : "#CBD5E1" },
      ]}
    >
      {checked ? <View style={styles.checkboxDot} /> : null}
    </Pressable>
  );
}

/* ----- Styles ----- */

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "rgba(99,102,241,0.05)",
  },
  container: { width: "100%", maxWidth: 440, alignSelf: "center" },

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

  tabContent: { marginTop: 4 },

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
  inputRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 1,
  },

  passwordWrap: { position: "relative", justifyContent: "center" },
  eyeBtn: {
    position: "absolute",
    right: 8,
    height: 44,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: { color: "#EF4444", fontSize: 12, marginTop: 4 },

  primaryBtn: {
    marginTop: 8,
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
  row: { flexDirection: "row" },

  termsRow: { flexDirection: "row", alignItems: "center", marginTop: 6, marginBottom: 6 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxDot: { width: 10, height: 10, borderRadius: 3, backgroundColor: "#fff" },
  termsText: { fontSize: 13, color: "#334155" },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#64748B",
    marginTop: 10,
    marginBottom: 12,
  },
  linkBtn: { paddingVertical: 6 },
  linkText: { color: "#6366F1", fontWeight: "700" },
  footerLink: { color: "#6366F1", textDecorationLine: "underline" },
});
