import { ArrowLeft, Car, Clock, MapPin, Navigation, Users } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function RideScreen({ onNavigate }) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const rideTypes = [
    { id: 'auto', name: 'Auto', price: '₹45-55', time: '2 mins', icon: Car, capacity: '3 people' },
    { id: 'bike', name: 'Bike', price: '₹25-35', time: '1 min', icon: Car, capacity: '1 person' },
    { id: 'cab', name: 'Cab', price: '₹85-95', time: '3 mins', icon: Car, capacity: '4 people' },
    { id: 'share', name: 'Share', price: '₹35-45', time: '5 mins', icon: Users, capacity: 'Shared' }
  ];

  const savedPlaces = [
    { name: 'Home', address: 'Sector 18, Noida', icon: '🏠' },
    { name: 'Office', address: 'Connaught Place, Delhi', icon: '🏢' },
    { name: 'Mall', address: 'DLF Mall, Gurgaon', icon: '🛒' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('home')} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book a Ride</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Location Inputs */}
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.inputWrapper}>
              <MapPin size={20} color="green" style={styles.inputIcon} />
              <TextInput
                placeholder="Pickup location"
                value={pickup}
                onChangeText={setPickup}
                style={styles.input}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Navigation size={20} color="red" style={styles.inputIcon} />
              <TextInput
                placeholder="Where to?"
                value={destination}
                onChangeText={setDestination}
                style={styles.input}
              />
            </View>
          </View>
        </View>

        {/* Saved Places */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Saved Places</Text>
          {savedPlaces.map((place, index) => (
            <TouchableOpacity key={index} style={styles.cardTouchable}>
              <View style={styles.savedPlace}>
                <Text style={styles.placeIcon}>{place.icon}</Text>
                <View>
                  <Text style={styles.placeName}>{place.name}</Text>
                  <Text style={styles.placeAddress}>{place.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ride Types */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Choose Ride Type</Text>
          {rideTypes.map((ride) => {
            const Icon = ride.icon;
            return (
              <TouchableOpacity key={ride.id} style={styles.cardTouchable}>
                <View style={styles.rideType}>
                  <View style={styles.rideLeft}>
                    <View style={styles.iconWrapper}>
                      <Icon size={24} color="#6200ee" />
                    </View>
                    <View>
                      <Text style={styles.rideName}>{ride.name}</Text>
                      <Text style={styles.rideCapacity}>{ride.capacity}</Text>
                    </View>
                  </View>
                  <View style={styles.rideRight}>
                    <Text style={styles.ridePrice}>{ride.price}</Text>
                    <View style={styles.rideTime}>
                      <Clock size={12} color="#888" />
                      <Text style={styles.timeText}>{ride.time}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Book Button */}
        <TouchableOpacity
          style={[styles.button, (!pickup || !destination) && { opacity: 0.5 }]}
          disabled={!pickup || !destination}
          onPress={() => console.log('Book Ride')}
        >
          <Text style={styles.buttonText}>Book Ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#6200ee' },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, marginVertical: 8, padding: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardContent: {},
  inputWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardTouchable: { backgroundColor: '#fff', borderRadius: 8, marginVertical: 4, padding: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  savedPlace: { flexDirection: 'row', alignItems: 'center' },
  placeIcon: { fontSize: 24, marginRight: 8 },
  placeName: { fontSize: 16, fontWeight: '500' },
  placeAddress: { fontSize: 12, color: '#666' },
  rideType: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rideLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconWrapper: { backgroundColor: '#6200ee20', padding: 8, borderRadius: 8 },
  rideName: { fontSize: 16, fontWeight: '500' },
  rideCapacity: { fontSize: 12, color: '#666' },
  rideRight: { alignItems: 'flex-end' },
  ridePrice: { fontSize: 16, fontWeight: '500' },
  rideTime: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { fontSize: 12, color: '#666', marginLeft: 4 },
  button: { backgroundColor: '#6200ee', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
