import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, Search, Upload } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MedicineScreen() {
  const router = useRouter(); // useRouter for navigation

  const categories = [
    { id: 'wellness', name: 'Wellness', color: '#ECFDF5', textColor: '#059669' },
    { id: 'personal-care', name: 'Personal Care', color: '#EFF6FF', textColor: '#2563EB' },
    { id: 'baby-care', name: 'Baby Care', color: '#FCE7F3', textColor: '#DB2777' },
    { id: 'ayurveda', name: 'Ayurveda', color: '#FFEDD5', textColor: '#EA580C' },
  ];

  const medicines = [
    { 
      id: '1', 
      name: 'Paracetamol 500mg', 
      company: 'Cipla Ltd', 
      price: 15, 
      originalPrice: 20, 
      prescription: false,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop'
    },
    { 
      id: '2', 
      name: 'Vitamin D3 Tablets', 
      company: 'Sun Pharma', 
      price: 180, 
      originalPrice: 220, 
      prescription: false,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop'
    },
    { 
      id: '3', 
      name: 'Cough Syrup', 
      company: "Dr. Reddy's", 
      price: 85, 
      originalPrice: 95, 
      prescription: true,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search color="#9CA3AF" size={16} style={{ position: 'absolute', left: 10, top: 12 }} />
        <TextInput placeholder="Search medicines..." style={styles.input} placeholderTextColor="#9CA3AF" />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Upload Prescription */}
        <View style={[styles.card, { alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#3B82F6', backgroundColor: '#EFF6FF' }]}>
          <Upload color="#3B82F6" size={48} style={{ marginBottom: 8 }} />
          <Text style={styles.uploadTitle}>Upload Prescription</Text>
          <Text style={styles.uploadText}>Get medicines delivered in 2 hours with valid prescription</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Upload & Order</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Order */}
        <View style={styles.card}>
          <View style={styles.quickOrderRow}>
            <Clock color="#3B82F6" size={24} />
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.quickOrderTitle}>Quick Order</Text>
              <Text style={styles.quickOrderSubtitle}>Reorder your previous medicines</Text>
            </View>
            <TouchableOpacity style={styles.buttonOutline}>
              <Text style={styles.buttonOutlineText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <View style={styles.categoryGrid}>
          {categories.map(category => (
            <TouchableOpacity key={category.id} style={[styles.categoryCard, { backgroundColor: category.color }]}>
              <View style={[styles.categoryIcon, { backgroundColor: category.textColor }]} />
              <Text style={[styles.categoryText, { color: category.textColor }]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Medicines */}
        <Text style={styles.sectionTitle}>Popular Medicines</Text>
        {medicines.map(medicine => (
          <View key={medicine.id} style={styles.card}>
            <View style={styles.medicineRow}>
              <Image source={{ uri: medicine.image }} style={styles.medicineImage} />
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <Text style={styles.medicineCompany}>{medicine.company}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{medicine.price}</Text>
                  <Text style={styles.originalPrice}>₹{medicine.originalPrice}</Text>
                  {medicine.prescription && (
                    <Text style={styles.prescription}>Rx</Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.buttonOutline}>
                <Text style={styles.buttonOutlineText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#3B82F6', padding: 16 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  searchContainer: { padding: 16, position: 'relative' },
  input: { backgroundColor: 'white', borderRadius: 8, paddingLeft: 36, height: 40 },
  scroll: { paddingHorizontal: 16 },
  card: { padding: 12, marginBottom: 12, borderRadius: 12, backgroundColor: 'white' },
  uploadTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  uploadText: { fontSize: 12, color: '#6B7280', marginBottom: 8, textAlign: 'center' },
  quickOrderRow: { flexDirection: 'row', alignItems: 'center' },
  quickOrderTitle: { fontWeight: 'bold', fontSize: 14 },
  quickOrderSubtitle: { fontSize: 12, color: '#6B7280' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '48%', borderRadius: 12, alignItems: 'center', padding: 12, marginBottom: 12 },
  categoryIcon: { width: 24, height: 24, borderRadius: 4, marginBottom: 4 },
  categoryText: { fontSize: 12, fontWeight: 'bold' },
  medicineRow: { flexDirection: 'row', alignItems: 'center' },
  medicineImage: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#E5E7EB' },
  medicineName: { fontWeight: 'bold', fontSize: 14 },
  medicineCompany: { fontSize: 12, color: '#6B7280' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  price: { fontWeight: 'bold' },
  originalPrice: { textDecorationLine: 'line-through', color: '#6B7280', fontSize: 12, marginLeft: 4 },
  prescription: { fontSize: 10, color: 'red', borderWidth: 1, borderColor: 'red', paddingHorizontal: 4, borderRadius: 4, marginLeft: 4 },
  button: { backgroundColor: '#3B82F6', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  buttonOutline: { borderWidth: 1, borderColor: '#3B82F6', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  buttonOutlineText: { color: '#3B82F6', fontWeight: 'bold', textAlign: 'center' },
});
