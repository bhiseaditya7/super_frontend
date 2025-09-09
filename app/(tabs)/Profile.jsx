import {
  ArrowLeft,
  CreditCard,
  Edit,
  HelpCircle,
  LogOut,
  MapPin,
  Settings
} from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const menuItems = [
    {
      icon: MapPin,
      label: "Saved Addresses",
      subtitle: "Home, Work & Other addresses",
      action: () => console.log("Addresses"),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      subtitle: "Cards, UPI & Wallet",
      action: () => onNavigate("payments"),
    },
    {
      icon: Settings,
      label: "Settings",
      subtitle: "Notifications, Privacy & More",
      action: () => console.log("Settings"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      subtitle: "FAQs, Contact Us",
      action: () => onNavigate("chat"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate("home")}>
          <ArrowLeft color="#fff" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Profile Header */}
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Rahul Sharma</Text>
              <Text style={styles.subtitle}>+91 98765 43210</Text>
              <Text style={styles.subtitle}>rahul.sharma@email.com</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}>
              <Edit size={18} color="#374151" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>₹24K</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ gap: 10 }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.card} onPress={item.action}>
                <View style={styles.menuRow}>
                  <View style={styles.menuIconBox}>
                    <Icon size={20} color="#3B82F6" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <View style={[styles.card, styles.logoutCard]}>
          <View style={styles.menuRow}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>SuperApp v2.1.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ in India</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#3B82F6",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scroll: { flex: 1, padding: 15 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
  },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#E5E7EB" },
  name: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "#6B7280" },
  iconBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 6,
  },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    marginHorizontal: 4,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#3B82F6" },
  statLabel: { fontSize: 13, color: "#6B7280" },
  menuRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIconBox: {
    backgroundColor: "#DBEAFE",
    padding: 8,
    borderRadius: 8,
  },
  menuLabel: { fontSize: 15, fontWeight: "500" },
  menuSubtitle: { fontSize: 12, color: "#6B7280" },
  logoutCard: { borderColor: "#FECACA" },
  logoutText: { fontSize: 15, fontWeight: "500", color: "#DC2626", marginLeft: 10 },
  appInfo: { marginTop: 20, alignItems: "center" },
  appInfoText: { fontSize: 12, color: "#6B7280" },
});
