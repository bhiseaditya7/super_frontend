import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70, paddingBottom: 10, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#ccc' },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />

      {/* Chat Tab */}
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />,
        }}
      />

      {/* QR Code Center Button */}
      <Tabs.Screen
        name="QRCode"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={styles.qrButton}
            >
              <MaterialCommunityIcons name="qrcode-scan" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Orders Tab */}
      <Tabs.Screen
        name="OrdersScreen"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="basket-outline" size={size} color={color} />,
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  qrButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25, // Raises it above the tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});