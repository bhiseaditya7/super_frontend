// app/index.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import {
  Home as HomeIcon,
  MessageCircle,
  QrCode,
  Package,
  User,
} from "lucide-react-native";

// ==== Tabs (match your actual files/casing) ====
import HomeScreen from "./(tabs)/HomeScreen";
import ChatScreen from "./(tabs)/chats";
import OrdersScreen from "./(tabs)/OrdersScreen";
import ProfileScreen from "./(tabs)/Profile";
import QRCodeScreen from "./(tabs)/QRCode";

// Optional inner components used by HomeScreen
import FoodScreen from "./components/FoodScreen";
import GroceryScreen from "./components/GroceryScreen";
import Medicine from "./components/MedicineScreen";
import RideScreen from "./components/RideScreen";

// ==== Auth screens ====
import SignInScreen from "./auth/SignInScreen";
import SignUpScreen from "./auth/SignUpScreen";
import WelcomeScreen from "./auth/welcome";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 'welcome' | 'signin' | 'signup'
  const [authScreen, setAuthScreen] = useState("welcome");

  // 'home' | 'chat' | 'orders' | 'profile' | 'qrcode'
  const [activeScreen, setActiveScreen] = useState("home");
  const [isLoading, setIsLoading] = useState(false);

  // Screen transition anim
  const fade = useRef(new Animated.Value(1)).current;
  const slide = useRef(new Animated.Value(0)).current;
  const runScreenAnim = () => {
    fade.setValue(0);
    slide.setValue(12);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start();
  };
  useEffect(runScreenAnim, [activeScreen, isAuthenticated, authScreen]);

  // --- Demo auth handlers ---
  const handleSignIn = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsAuthenticated(true);
    setActiveScreen("home");
    setIsLoading(false);
  };
  const handleSignUp = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsAuthenticated(true);
    setActiveScreen("home");
    setIsLoading(false);
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAuthScreen("signin");
    setActiveScreen("home");
  };

  // === Auth flow ===
  if (!isAuthenticated) {
    if (authScreen === "welcome") {
      return (
        <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: slide }] }}>
          <WelcomeScreen
            onNavigateToSignIn={() => setAuthScreen("signin")}
            onNavigateToSignUp={() => setAuthScreen("signup")}
          />
        </Animated.View>
      );
    }
    if (authScreen === "signin") {
      return (
        <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: slide }] }}>
          <SignInScreen
            onSignIn={handleSignIn}
            onNavigateToSignUp={() => setAuthScreen("signup")}
            isLoading={isLoading}
          />
        </Animated.View>
      );
    }
    return (
      <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: slide }] }}>
        <SignUpScreen
          onSignUp={handleSignUp}
          onNavigateToSignIn={() => setAuthScreen("signin")}
          isLoading={isLoading}
        />
      </Animated.View>
    );
  }

  // === Main app ===
  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return (
          <HomeScreen
            onNavigate={(s) => setActiveScreen(s)}
            FoodComponent={FoodScreen}
            GroceryComponent={GroceryScreen}
            MedicineComponent={Medicine}
            RideComponent={RideScreen}
          />
        );
      case "chat":
        return <ChatScreen onNavigate={(s) => setActiveScreen(s)} />;
      case "orders":
        return <OrdersScreen onNavigate={(s) => setActiveScreen(s)} />;
      case "profile":
        return <ProfileScreen onNavigate={(s) => setActiveScreen(s)} onSignOut={handleSignOut} />;
      case "qrcode":
        return <QRCodeScreen onNavigate={(s) => setActiveScreen(s)} />;
      default:
        return <HomeScreen onNavigate={(s) => setActiveScreen(s)} />;
    }
  };

  const navItems = [
    { id: "home", icon: HomeIcon, label: "Home", badge: null },
    { id: "chat", icon: MessageCircle, label: "Chat", badge: 2 },
    { id: "orders", icon: Package, label: "Orders", badge: 3 },
    { id: "profile", icon: User, label: "Profile", badge: null },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fade, transform: [{ translateX: slide }] }]}>
        {renderScreen()}
      </Animated.View>

      {/* Bottom Nav + Floating QR */}
      <View style={styles.tabWrap}>
        <View style={styles.tabRow}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <Pressable
                key={item.id}
                onPress={() => setActiveScreen(item.id)}
                style={({ pressed }) => [styles.tabBtn, pressed && { opacity: 0.8 }]}
              >
                <View style={styles.iconWrap}>
                  <Icon size={22} color={isActive ? "#6366F1" : "#64748B"} />
                  {item.badge ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.tabLabel, isActive && { color: "#6366F1" }]}>{item.label}</Text>
                {isActive && <View style={styles.activeDot} />}
              </Pressable>
            );
          })}
        </View>

        {/* Floating QR Button navigates to QR screen */}
        <View style={styles.qrWrap}>
          <Pressable
            onPress={() => setActiveScreen("qrcode")}
            style={({ pressed }) => [styles.qrBtn, pressed && { transform: [{ scale: 0.98 }] }]}
          >
            <QrCode size={24} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================== Styles ================== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },
  content: { flex: 1 },

  tabWrap: {
    position: "relative",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(15,23,42,0.08)",
    paddingBottom: Platform.OS === "ios" ? 18 : 12,
    paddingTop: 10,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },
  tabBtn: { alignItems: "center", justifyContent: "center", paddingVertical: 4, minWidth: 64 },
  iconWrap: { position: "relative" },
  tabLabel: { fontSize: 11, color: "#64748B", marginTop: 4, fontWeight: "600" },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#6366F1", position: "absolute", top: -2 },

  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    height: 16,
    minWidth: 16,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: "#6366F1",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  qrWrap: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -28 }],
    top: -24,
  },
  qrBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366F1",
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
});
