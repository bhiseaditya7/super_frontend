import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowRight, Smartphone, Shield, Zap, Star } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const onComplete = () => router.replace("auth/SignInScreen");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = useMemo(
    () => [
      {
        icon: Smartphone,
        title: "Everything in One App",
        description: "Food, rides, payments, groceries, and more - all in your pocket",
        gradientFrom: "#3B82F6",
        gradientTo: "#2563EB",
        bgSoft: "#EFF6FF",
      },
      {
        icon: Zap,
        title: "Lightning Fast",
        description: "Quick QR payments, instant bookings, and real-time tracking",
        gradientFrom: "#F59E0B",
        gradientTo: "#F97316",
        bgSoft: "#FFFBEB",
      },
      {
        icon: Shield,
        title: "Secure & Trusted",
        description: "Bank-grade security with end-to-end encryption for all transactions",
        gradientFrom: "#22C55E",
        gradientTo: "#16A34A",
        bgSoft: "#ECFDF5",
      },
      {
        icon: Star,
        title: "Loved by Millions",
        description: "Join over 10 million users across India who trust SuperApp daily",
        gradientFrom: "#EF4444",
        gradientTo: "#DC2626",
        bgSoft: "#FEF2F2",
      },
    ],
    []
  );

  // animations
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  const runAnim = () => {
    fade.setValue(0);
    translateY.setValue(30);
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  };

  useEffect(runAnim, [currentSlide]);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 3000);
    return () => clearInterval(id);
  }, [isAutoPlaying, slides.length]);

  const handleSlideChange = (i) => {
    setCurrentSlide(i);
    setIsAutoPlaying(false);
  };

  const s = slides[currentSlide];
  const Icon = s.icon;

  return (
    <LinearGradient
      colors={["rgba(99,102,241,0.06)", "rgba(2,6,23,0.03)", "rgba(239,68,68,0.06)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={[styles.logoWrap, { opacity: fade, transform: [{ translateY: Animated.multiply(translateY, 0.3) }] }]}>
          <View style={styles.logoOuter}>
            <View style={styles.logoInner}>
              <View style={styles.logoDot} />
            </View>
          </View>
        </Animated.View>

        <Pressable onPress={onComplete} style={styles.skipBtn} hitSlop={10}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      {/* Main */}
      <View style={styles.main}>
        <Animated.View style={{ width: "100%", alignItems: "center", opacity: fade, transform: [{ translateY }] }}>
          {/* Icon bubble */}
          <View style={[styles.iconBubble, { backgroundColor: s.bgSoft }]}>
            <LinearGradient colors={[s.gradientFrom, s.gradientTo]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.iconInner}>
              <Icon size={44} color="#FFFFFF" />
            </LinearGradient>
          </View>

          {/* Text */}
          <View style={styles.textWrap}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.description}</Text>
          </View>
        </Animated.View>

        {/* Indicators */}
        <Animated.View style={{ opacity: fade, marginTop: 24 }}>
          <View style={styles.dotsRow}>
            {slides.map((_, i) => {
              const active = i === currentSlide;
              return (
                <Pressable
                  key={i}
                  onPress={() => handleSlideChange(i)}
                  style={[styles.dot, active && styles.dotActive]}
                  android_ripple={{ color: "#ddd", radius: 10 }}
                />
              );
            })}
          </View>
        </Animated.View>
      </View>

      {/* Bottom */}
      <View style={styles.bottom}>
        {/* Stats */}
        <Animated.View style={{ opacity: fade, transform: [{ translateY }] }}>
          <View style={styles.statsRow}>
            <StatCard label="Users" value="10M+" />
            <StatCard label="Cities" value="500+" />
            <StatCard label="Rating" value="4.8★" />
          </View>
        </Animated.View>

        {/* CTA */}
        <Animated.View style={{ opacity: fade, transform: [{ translateY }] }}>
          <Pressable onPress={onComplete} style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}>
            <LinearGradient colors={["#6366F1", "#4F46E5"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaInner}>
              <Text style={styles.ctaText}>Get Started</Text>
              <ArrowNudge />
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Trust */}
        <Animated.View style={{ opacity: fade, alignItems: "center", marginTop: 16 }}>
          <Text style={styles.trustText}>Trusted by leading banks and verified by RBI</Text>
          <View style={styles.logosRow}>
            <View style={styles.logoBox} />
            <View style={styles.logoBox} />
            <View style={styles.logoBox} />
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

function StatCard({ value, label }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardLabel}>{label}</Text>
      </View>
    </View>
  );
}

function ArrowNudge() {
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(x, { toValue: 4, duration: 600, useNativeDriver: true }),
        Animated.timing(x, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [x]);

  return (
    <Animated.View style={{ marginLeft: 8, transform: [{ translateX: x }] }}>
      <ArrowRight size={20} color="#FFFFFF" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoWrap: { height: 40, justifyContent: "center" },
  logoOuter: {
    width: 40, height: 40, backgroundColor: "#6366F1", borderRadius: 20,
    alignItems: "center", justifyContent: "center",
  },
  logoInner: {
    width: 28, height: 28, backgroundColor: "#FFFFFF", borderRadius: 14,
    alignItems: "center", justifyContent: "center",
  },
  logoDot: { width: 16, height: 16, backgroundColor: "#6366F1", borderRadius: 8 },
  skipBtn: { padding: 8 },
  skipText: { fontSize: 16, color: "#334155" },

  main: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  iconBubble: { width: 128, height: 128, borderRadius: 64, alignItems: "center", justifyContent: "center" },
  iconInner: { width: 88, height: 88, borderRadius: 44, alignItems: "center", justifyContent: "center" },
  textWrap: { marginTop: 24, maxWidth: width * 0.8, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "800", color: "#0F172A", textAlign: "center" },
  desc: { marginTop: 8, fontSize: 16, lineHeight: 22, color: "#64748B", textAlign: "center" },

  dotsRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E5E7EB", marginHorizontal: 4 },
  dotActive: { width: 24, backgroundColor: "#6366F1" },

  bottom: { paddingHorizontal: 24, paddingBottom: 24, marginTop: 8 },
  statsRow: { flexDirection: "row", gap: 12, justifyContent: "space-between" },
  card: { flex: 1, backgroundColor: "rgba(255,255,255,0.6)", borderRadius: 14 },
  cardInner: { paddingVertical: 12, alignItems: "center" },
  cardValue: { fontSize: 18, fontWeight: "800", color: "#6366F1" },
  cardLabel: { fontSize: 12, color: "#94A3B8" },

  cta: { marginTop: 16, borderRadius: 12, overflow: "hidden" },
  ctaInner: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", flexDirection: "row" },
  ctaText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },

  trustText: { fontSize: 12, color: "#94A3B8" },
  logosRow: { marginTop: 8, flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center", opacity: 0.6 },
  logoBox: { width: 32, height: 20, backgroundColor: "#E5E7EB", borderRadius: 6 },
});
