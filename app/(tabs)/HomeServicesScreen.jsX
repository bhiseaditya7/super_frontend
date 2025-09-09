import { ArrowLeft, Droplets, Paintbrush, Shield, Wind, Wrench, Zap } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeServicesScreen({ onNavigate }) {
  const services = [
    { id: 'electrician', name: 'Electrician', icon: Zap, price: '₹199 onwards', rating: 4.5, color: '#FEF3C7', iconColor: '#CA8A04' },
    { id: 'plumber', name: 'Plumber', icon: Droplets, price: '₹179 onwards', rating: 4.3, color: '#DBEAFE', iconColor: '#2563EB' },
    { id: 'ac-repair', name: 'AC Repair', icon: Wind, price: '₹299 onwards', rating: 4.4, color: '#E0F2FE', iconColor: '#0284C7' },
    { id: 'carpenter', name: 'Carpenter', icon: Wrench, price: '₹249 onwards', rating: 4.2, color: '#FFEDD5', iconColor: '#EA580C' },
    { id: 'painter', name: 'Painter', icon: Paintbrush, price: '₹399 onwards', rating: 4.6, color: '#DCFCE7', iconColor: '#16A34A' },
    { id: 'security', name: 'Security', icon: Shield, price: '₹500 onwards', rating: 4.7, color: '#EDE9FE', iconColor: '#7C3AED' },
  ];

  const timeSlots = ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onNavigate('home')}>
          <ArrowLeft size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home Services</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search services..." style={styles.searchInput} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Emergency Service */}
        <View style={[styles.emergencyCard, { backgroundColor: '#FECACA' }]}>
          <Text style={styles.emergencyTitle}>Emergency Services</Text>
          <Text style={styles.emergencySubtitle}>Available 24/7 for urgent repairs</Text>
          <TouchableOpacity style={styles.callButton}><Text style={{ color: '#fff' }}>Call Now</Text></TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <View style={styles.grid}>
            {services.map(service => {
              const Icon = service.icon;
              return (
                <View key={service.id} style={styles.serviceCard}>
                  <View style={[styles.serviceIconContainer, { backgroundColor: service.color }]}>
                    <Icon size={24} color={service.iconColor} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                  <View style={styles.serviceFooter}>
                    <Text>⭐ {service.rating}</Text>
                    <TouchableOpacity style={styles.bookButton}><Text>Book</Text></TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        {/* Available Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Available Slots</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity key={index} style={styles.slotButton}><Text>{slot}</Text></TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  iconButton: { padding: 6, backgroundColor: '#fff', borderRadius: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  searchContainer: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10 },
  searchInput: { height: 40 },
  scrollContent: { paddingHorizontal: 16 },
  emergencyCard: { padding: 16, borderRadius: 12, marginBottom: 16 },
  emergencyTitle: { fontWeight: 'bold', fontSize: 16 },
  emergencySubtitle: { marginVertical: 4 },
  callButton: { marginTop: 8, backgroundColor: '#DC2626', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  section: { marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  serviceCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  serviceIconContainer: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  serviceName: { fontWeight: 'bold', marginBottom: 2 },
  servicePrice: { fontSize: 12, color: '#555', marginBottom: 4 },
  serviceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bookButton: { backgroundColor: '#E5E7EB', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  slotButton: { backgroundColor: '#fff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginRight: 10, elevation: 2 },
});
