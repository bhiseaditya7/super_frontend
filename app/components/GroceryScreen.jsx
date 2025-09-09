import { useRouter } from "expo-router";
import { ArrowLeft, Minus, Plus, Search } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function GroceryScreen() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  const categories = [
    { id: "vegetables", name: "Vegetables", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop" },
    { id: "fruits", name: "Fruits", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop" },
    { id: "dairy", name: "Dairy", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop" },
    { id: "snacks", name: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=200&h=200&fit=crop" },
  ];

  const products = [
    { id: "1", name: "Fresh Tomatoes", price: 30, unit: "per kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop" },
    { id: "2", name: "Bananas", price: 50, unit: "per dozen", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop" },
    { id: "3", name: "Milk", price: 60, unit: "per liter", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop" },
    { id: "4", name: "Bread", price: 25, unit: "per loaf", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop" },
  ];

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Grocery</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={18} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Search groceries..." style={styles.searchInput} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Categories */}
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.card}>
              <Image source={{ uri: category.image }} style={styles.cardImage} />
              <Text style={styles.cardLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products */}
        <Text style={styles.sectionTitle}>Fresh Products</Text>
        <View style={styles.grid}>
          {products.map((product) => (
            <View key={product.id} style={styles.card}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productUnit}>{product.unit}</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>₹{product.price}</Text>
                {getItemQuantity(product.id) > 0 ? (
                  <View style={styles.counter}>
                    <TouchableOpacity onPress={() => removeFromCart(product.id)} style={styles.counterButton}>
                      <Minus size={14} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{getItemQuantity(product.id)}</Text>
                    <TouchableOpacity onPress={() => addToCart(product)} style={styles.counterButton}>
                      <Plus size={14} color="#000" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                    <Plus size={14} color="#fff" />
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <View style={styles.cartFooter}>
          <View>
            <Text style={styles.cartText}>{cart.reduce((t, i) => t + i.quantity, 0)} items</Text>
            <Text style={styles.cartTotal}>₹{cart.reduce((t, i) => t + i.price * i.quantity, 0)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: "#2563EB", padding: 12 },
  backButton: { marginRight: 10 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  searchContainer: { flexDirection: "row", alignItems: "center", margin: 12, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 10, elevation: 2 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, height: 40 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: { width: "48%", backgroundColor: "#fff", borderRadius: 10, padding: 10, marginBottom: 16, elevation: 2 },
  cardImage: { width: 60, height: 60, borderRadius: 8, alignSelf: "center", marginBottom: 8 },
  cardLabel: { textAlign: "center", fontWeight: "600" },
  productImage: { width: "100%", height: 100, borderRadius: 8, marginBottom: 8 },
  productName: { fontWeight: "600", fontSize: 14 },
  productUnit: { fontSize: 12, color: "#555", marginBottom: 6 },
  productFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  productPrice: { fontWeight: "bold" },
  addButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#2563EB", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  addButtonText: { color: "#fff", marginLeft: 4 },
  counter: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  counterButton: { padding: 4 },
  counterText: { marginHorizontal: 8, fontWeight: "600" },
  cartFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", borderTopWidth: 1, borderColor: "#ddd", padding: 12 },
  cartText: { fontSize: 12, color: "#555" },
  cartTotal: { fontSize: 16, fontWeight: "bold" },
  checkoutButton: { backgroundColor: "#2563EB", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  checkoutText: { color: "#fff", fontWeight: "bold" },
});
