import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScanner({ onClose }) {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);

  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        setScannedResult('upi://pay?pa=merchant@paytm&pn=Test Merchant&am=150.00&cu=INR');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const quickActions = [
    { icon: Feather, label: 'Pay Bills', description: 'Scan QR for quick payments', color: '#3B82F6' },
    { icon: FontAwesome5, label: 'Offers', description: 'Scan for exclusive deals', color: '#10B981' },
    { icon: Feather, label: 'Menu/Catalog', description: 'Scan restaurant menus', color: '#F59E0B' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scan QR Code</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Scanner Area */}
      <View style={styles.scannerArea}>
        {isScanning ? (
          <View style={styles.scannerBox}>
            <View style={styles.scannerFrame} />
            <View style={styles.scanningLine} />
            <Text style={styles.scanText}>Point your camera at a QR code</Text>
          </View>
        ) : (
          <View style={styles.scannerBox}>
            <View style={styles.qrIconBox}>
              <MaterialCommunityIcons name="qrcode-scan" size={64} color="black" />
            </View>
            <Text style={styles.scanText}>QR Code detected!</Text>
          </View>
        )}
      </View>

      {/* Result or Quick Actions */}
      <View style={styles.resultContainer}>
        {scannedResult ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#D1FAE5' }]}>
                <Feather name="credit-card" size={24} color="#10B981" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Payment Request</Text>
                <Text style={styles.cardSubtitle}>Test Merchant</Text>
              </View>
            </View>
            <View style={styles.amountRow}>
              <Text>Amount:</Text>
              <Text style={styles.amountText}>₹150.00</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => setScannedResult(null)}
              >
                <Text style={styles.scanAgainText}>Scan Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.quickActionsTitle}>Quick QR Actions</Text>
            <ScrollView>
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <View key={index} style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={[styles.iconCircle, { backgroundColor: action.color + '33' }]}>
                        <Icon name="credit-card" size={24} color={action.color} />
                      </View>
                      <View>
                        <Text style={styles.cardTitle}>{action.label}</Text>
                        <Text style={styles.cardSubtitle}>{action.description}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  scannerArea: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  scannerBox: { width: 250, height: 250, borderRadius: 12, backgroundColor: '#1F2937', justifyContent: 'center', alignItems: 'center' },
  scannerFrame: { position: 'absolute', width: '90%', height: '90%', borderWidth: 2, borderColor: 'white', borderRadius: 12 },
  scanningLine: { position: 'absolute', width: '80%', height: 2, backgroundColor: '#3B82F6' },
  scanText: { color: 'white', marginTop: 16 },
  qrIconBox: { backgroundColor: 'white', padding: 16, borderRadius: 12 },
  resultContainer: { padding: 16, backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  card: { backgroundColor: '#F9FAFB', borderRadius: 12, padding: 16, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardSubtitle: { fontSize: 12, color: '#6B7280' },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  amountText: { fontSize: 18, fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', marginTop: 8 },
  payButton: { flex: 1, backgroundColor: '#3B82F6', padding: 12, borderRadius: 8, marginRight: 8, alignItems: 'center' },
  payButtonText: { color: 'white', fontWeight: 'bold' },
  scanAgainButton: { flex: 1, borderWidth: 1, borderColor: '#3B82F6', padding: 12, borderRadius: 8, alignItems: 'center' },
  scanAgainText: { color: '#3B82F6', fontWeight: 'bold' },
  quickActionsTitle: { textAlign: 'center', marginBottom: 12, fontWeight: 'bold', fontSize: 16 },
});
