import { ArrowLeft, CheckCircle, Clock, MapPin, Package, Phone } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OrdersScreenProps {
  onNavigate: (screen: string) => void;
}

export default function OrdersScreen({ onNavigate }: OrdersScreenProps) {
  const [tab, setTab] = useState<"active" | "past">("active");

  const activeOrders = [
    {
      id: "ORD001",
      type: "food",
      restaurant: "Burger King",
      items: "Whopper Meal + 2 Items",
      status: "preparing",
      estimatedTime: "25-30 mins",
      amount: 299,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    },
    {
      id: "ORD002",
      type: "grocery",
      store: "BigBasket",
      items: "Vegetables & Fruits",
      status: "packed",
      estimatedTime: "2-3 hours",
      amount: 845,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    },
    {
      id: "ORD003",
      type: "medicine",
      pharmacy: "Apollo Pharmacy",
      items: "Paracetamol & 3 Items",
      status: "out_for_delivery",
      estimatedTime: "45 mins",
      amount: 156,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    },
  ];

  const pastOrders = [
    {
      id: "ORD004",
      type: "ride",
      service: "Uber",
      route: "Home to Office",
      completedAt: "2 hours ago",
      amount: 180,
      rating: 5,
    },
    {
      id: "ORD005",
      type: "food",
      restaurant: "Dominos",
      items: "Margherita Pizza",
      completedAt: "Yesterday",
      amount: 399,
      rating: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return { backgroundColor: "#FEF3C7", color: "#92400E" };
      case "packed":
        return { backgroundColor: "#DBEAFE", color: "#1E40AF" };
      case "out_for_delivery":
        return { backgroundColor: "#D1FAE5", color: "#065F46" };
      default:
        return { backgroundColor: "#F3F4F6", color: "#374151" };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Preparing";
      case "packed":
        return "Packed";
      case "out_for_delivery":
        return "Out for Delivery";
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate("home")}>
          <ArrowLeft color="#fff" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, tab === "active" && styles.tabActive]}
          onPress={() => setTab("active")}
        >
          <Text style={[styles.tabText, tab === "active" && styles.tabTextActive]}>
            Active Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === "past" && styles.tabActive]}
          onPress={() => setTab("past")}
        >
          <Text style={[styles.tabText, tab === "past" && styles.tabTextActive]}>
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {/* Active Orders */}
        {tab === "active" &&
          (activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <View key={order.id} style={styles.card}>
                <Image source={{ uri: order.image }} style={styles.image} />
                <View style={{ flex: 1, padding: 10 }}>
                  <View style={styles.rowBetween}>
                    <View>
                      <Text style={styles.title}>
                        {order.restaurant || order.store || order.pharmacy}
                      </Text>
                      <Text style={styles.subtitle}>{order.items}</Text>
                    </View>
                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: getStatusColor(order.status).backgroundColor },
                      ]}
                    >
                      <Text
                        style={{
                          color: getStatusColor(order.status).color,
                          fontSize: 12,
                        }}
                      >
                        {getStatusText(order.status)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rowBetween}>
                    <View style={styles.row}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.timeText}>{order.estimatedTime}</Text>
                    </View>
                    <Text style={styles.amount}>₹{order.amount}</Text>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <MapPin size={16} color="#374151" />
                      <Text style={styles.actionText}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Phone size={16} color="#374151" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.empty}>
              <Package size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No Active Orders</Text>
              <Text style={styles.emptyText}>
                When you place orders, they'll appear here
              </Text>
            </View>
          ))}

        {/* Past Orders */}
        {tab === "past" &&
          pastOrders.map((order) => (
            <View key={order.id} style={styles.card}>
              <View style={{ padding: 10 }}>
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.title}>
                      {order.restaurant || order.service}
                    </Text>
                    <Text style={styles.subtitle}>{order.items || order.route}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.amount}>₹{order.amount}</Text>
                    <Text style={styles.subtitle}>{order.completedAt}</Text>
                  </View>
                </View>

                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <CheckCircle size={16} color="#059669" />
                    <Text style={{ color: "#059669", fontSize: 13 }}>Delivered</Text>
                  </View>
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.smallBtn}>
                      <Text style={styles.smallBtnText}>Reorder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallBtn}>
                      <Text style={styles.smallBtnText}>Rate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
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
  tabRow: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#E5E7EB" },
  tabButton: { flex: 1, padding: 12, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderColor: "#3B82F6" },
  tabText: { color: "#6B7280", fontSize: 14 },
  tabTextActive: { color: "#3B82F6", fontWeight: "bold" },
  scroll: { flex: 1, padding: 10 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: { width: 80, height: 80 },
  row: { flexDirection: "row", alignItems: "center", gap: 4 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  title: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "#6B7280" },
  timeText: { fontSize: 13, color: "#6B7280" },
  amount: { fontWeight: "600", fontSize: 15 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  actionRow: { flexDirection: "row", gap: 8, marginTop: 6 },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    padding: 6,
    flex: 1,
    justifyContent: "center",
  },
  actionText: { fontSize: 13, marginLeft: 4 },
  empty: { alignItems: "center", padding: 40 },
  emptyTitle: { fontSize: 16, fontWeight: "600", marginTop: 8 },
  emptyText: { fontSize: 13, color: "#6B7280" },
  smallBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 6,
  },
  smallBtnText: { fontSize: 13 },
});
