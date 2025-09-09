import { useRouter } from "expo-router";
import { Bell, Car, Package, Pill, Search, ShoppingCart, Tv, UtensilsCrossed, Wallet, Wrench } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const services = [
    { id: 'ride', icon: Car, label: 'Ride', color: '#DBEAFE', iconColor: '#2563EB' },
    { id: 'food', icon: UtensilsCrossed, label: 'Food', color: '#FFEDD5', iconColor: '#EA580C' },
    { id: 'grocery', icon: ShoppingCart, label: 'Grocery', color: '#DCFCE7', iconColor: '#16A34A' },
    { id: 'medicine', icon: Pill, label: 'Medicine', color: '#FEE2E2', iconColor: '#DC2626' },
    { id: 'subscriptions', icon: Tv, label: 'Subscriptions', color: '#EDE9FE', iconColor: '#7C3AED' },
    { id: 'home-services', icon: Wrench, label: 'Home Services', color: '#E0E7FF', iconColor: '#4338CA' },
  ];

  const quickActions = [
    { label: 'Pay Bills', action: () => router.push('/payments') },
    { label: 'Recharge', action: () => router.push('/payments') },
    { label: 'Send Money', action: () => router.push('/payments') },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Rahul!</Text>
          <Text style={styles.subGreeting}>How can we help you today?</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}><Wallet size={24} /></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Bell size={24} /></TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Search for services..." style={styles.searchInput} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.quickButton} onPress={action.action}>
                <Text style={styles.quickButtonText}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.grid}>
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <TouchableOpacity 
                  key={service.id} 
                  style={styles.card} 
                  onPress={() => router.push(`/${service.id}`)}   // ✅ Navigation fixed
                >
                  <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                    <Icon size={24} color={service.iconColor} />
                  </View>
                  <Text style={styles.serviceLabel}>{service.label}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        {/* My Orders */}
        <TouchableOpacity style={styles.orderCard} onPress={() => router.push('/orders')}>
          <View style={styles.orderContent}>
            <View style={styles.orderLeft}>
              <View style={styles.orderIcon}><Package size={20} color="#2563EB" /></View>
              <View>
                <Text style={styles.orderTitle}>My Orders</Text>
                <Text style={styles.orderSubtitle}>Track your orders</Text>
              </View>
            </View>
            <Text style={styles.orderCount}>3 Active</Text>
          </View>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={{ gap: 10 }}>
            {/* Food Order */}
            <View style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={[styles.activityIcon, { backgroundColor: '#DCFCE7' }]}><UtensilsCrossed size={18} color="#16A34A" /></View>
                <View>
                  <Text>Food order delivered</Text>
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              <Text style={styles.activityPrice}>₹240</Text>
            </View>

            {/* Ride */}
            <View style={styles.activityCard}>
              <View style={styles.activityLeft}>
                <View style={[styles.activityIcon, { backgroundColor: '#DBEAFE' }]}><Car size={18} color="#2563EB" /></View>
                <View>
                  <Text>Ride completed</Text>
                  <Text style={styles.activityTime}>Yesterday</Text>
                </View>
              </View>
              <Text style={styles.activityPrice}>₹180</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  greeting: { fontSize: 18, fontWeight: 'bold' },
  subGreeting: { fontSize: 14, color: '#555' },
  headerIcons: { flexDirection: 'row', gap: 12 },
  iconButton: { padding: 6, backgroundColor: '#fff', borderRadius: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', margin: 16, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, elevation: 2 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, height: 40 },
  scrollContent: { paddingHorizontal: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  quickButton: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginRight: 10, elevation: 2 },
  quickButtonText: { fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '30%', alignItems: 'center', marginBottom: 16 },
  serviceIconContainer: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  serviceLabel: { textAlign: 'center' },
  orderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 16, elevation: 2 },
  orderContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderIcon: { backgroundColor: '#DBEAFE', padding: 8, borderRadius: 8 },
  orderTitle: { fontWeight: 'bold' },
  orderSubtitle: { fontSize: 12, color: '#555' },
  orderCount: { color: '#2563EB', fontWeight: 'bold' },
  activityCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 1 },
  activityLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  activityIcon: { padding: 8, borderRadius: 8 },
  activityTime: { fontSize: 12, color: '#555' },
  activityPrice: { fontWeight: 'bold' },
});
