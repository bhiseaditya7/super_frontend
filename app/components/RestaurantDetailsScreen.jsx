import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantDetailsScreen({ route, navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Recommended");

  // Mock data - replace with your actual data
  const restaurant = {
    name: "Burger King",
    rating: 4.2,
    deliveryTime: "25-30 min",
    cuisines: ["Burgers", "American", "Fast Food"],
    address: "123 Main Street",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
  };

  const menuCategories = [
    "Recommended",
    "Burgers",
    "Beverages",
    "Sides",
    "Desserts",
  ];

  const menuItems = [
    {
      id: 1,
      name: "Whopper",
      description:
        "Our signature flame-grilled beef patty topped with tomatoes, lettuce, mayo, pickles, and onions on a sesame seed bun",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      category: "Recommended",
    },
    // Add more menu items here
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
      </View>

      <ScrollView>
        {/* Restaurant Info */}
        <View style={styles.restaurantInfo}>
          <Image
            source={{ uri: restaurant.image }}
            style={styles.restaurantImage}
          />
          <View style={styles.infoContent}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.cuisineText}>
              {restaurant.cuisines.join(" • ")}
            </Text>
            <View style={styles.ratingRow}>
              <View style={styles.ratingBox}>
                <Ionicons name="star" size={16} color="#ffd700" />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
              <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
            </View>
            <Text style={styles.address}>{restaurant.address}</Text>
          </View>
        </View>

        {/* Menu Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {menuCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <View style={styles.menuItemContent}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <View style={styles.menuItemImage}>
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4f46e5",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  infoContent: {
    marginTop: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cuisineText: {
    color: "#666",
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#48c479",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  ratingText: {
    color: "white",
    marginLeft: 4,
    fontWeight: "bold",
  },
  deliveryTime: {
    color: "#666",
  },
  address: {
    color: "#666",
    marginTop: 8,
  },
  categoriesContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCategory: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  categoryText: {
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuItemContent: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    marginTop: 4,
    color: "#666",
  },
  itemDescription: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },
  menuItemImage: {
    width: 100,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#4f46e5",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  addButtonText: {
    color: "#4f46e5",
    fontWeight: "bold",
  },
});
