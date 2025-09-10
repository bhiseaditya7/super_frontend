// app/components/FoodScreen.jsx
import { router } from "expo-router";
import {
  ArrowLeft,
  Clock,
  Minus,
  Plus,
  Search,
  Star,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function FoodScreen() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("popular");

  const categories = [
    { id: "popular", name: "Popular" },
    { id: "pizza", name: "Pizza" },
    { id: "burger", name: "Burgers" },
    { id: "indian", name: "Indian" },
    { id: "chinese", name: "Chinese" },
  ];

  const restaurants = [
    {
      id: "1",
      name: "Pizza Hut",
      cuisine: "Italian, Fast Food",
      rating: 4.2,
      deliveryTime: "25-30 mins",
      offer: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      name: "Burger King",
      cuisine: "Burgers, Fast Food",
      rating: 4.1,
      deliveryTime: "20-25 mins",
      offer: "Buy 1 Get 1",
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      name: "Subway",
      cuisine: "Healthy, Sandwiches",
      rating: 4.0,
      deliveryTime: "30-35 mins",
      offer: "20% OFF",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    },
  ];

  const menuItems = [
    { id: "1", name: "Margherita Pizza", price: 299, rating: 4.5, veg: true },
    { id: "2", name: "Chicken Burger", price: 199, rating: 4.3, veg: false },
    { id: "3", name: "Veg Sandwich", price: 149, rating: 4.1, veg: true },
    { id: "4", name: "Pasta Italiano", price: 249, rating: 4.4, veg: true },
  ];

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemQuantity = (itemId) => {
    const item = cart.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Delivery</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Search size={18} color="gray" style={{ marginHorizontal: 8 }} />
        <TextInput
          placeholder="Search for restaurants or dishes..."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Categories */}
      <View style={{ merginTop: 0 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 0 }}
          contentContainerStyle={{ alignItems: "center", paddingHorizontal: 8 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryBtn,
                selectedCategory === cat.id && styles.categoryBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Text
                style={{
                  color: selectedCategory === cat.id ? "#fff" : "#333",
                  fontSize: 13,
                }}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 12 }}>
        {/* Restaurants */}
        <Text style={styles.sectionTitle}>Restaurants Near You</Text>
        {restaurants.map((res) => (
          <TouchableOpacity
            key={res.id}
            style={styles.card}
            onPress={() => router.push(`/restaurant/${res.id}`)}
          >
            <Image source={{ uri: res.image }} style={styles.cardImage} />
            <View style={{ padding: 8 }}>
              <Text style={{ fontWeight: "bold" }}>{res.name}</Text>
              <Text style={{ color: "#666" }}>{res.cuisine}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Star size={14} color="gold" fill="gold" />
                <Text style={{ marginLeft: 4 }}>{res.rating}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Clock size={14} />
                <Text style={{ marginLeft: 4 }}>{res.deliveryTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Menu Items */}
        <Text style={styles.sectionTitle}>Popular Items</Text>
        {menuItems.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Star size={14} color="gold" fill="gold" />
                <Text style={{ marginLeft: 4 }}>{item.rating}</Text>
              </View>
              <Text style={{ marginTop: 4 }}>₹{item.price}</Text>
            </View>
            <View>
              {getItemQuantity(item.id) > 0 ? (
                <View style={styles.counter}>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Minus size={16} />
                  </TouchableOpacity>
                  <Text>{getItemQuantity(item.id)}</Text>
                  <TouchableOpacity onPress={() => addToCart(item)}>
                    <Plus size={16} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => addToCart(item)}
                >
                  <Plus size={16} color="#fff" />
                  <Text style={{ color: "#fff", marginLeft: 4 }}>Add</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <View style={styles.cartFooter}>
          <Text>
            {cart.reduce((t, i) => t + i.quantity, 0)} items | ₹{getCartTotal()}
          </Text>
          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={{ color: "#fff" }}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4f46e5",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    marginRight: 12,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    margin: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    padding: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#4f46e5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cartFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  checkoutBtn: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  categoryBtn: {
    height: 30,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  categoryBtnActive: {
    backgroundColor: "purple",
    borderColor: "purple",
  },
});
