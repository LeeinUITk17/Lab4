import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Header from '@/components/22521276/Header';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}
import { useCart } from '@/context/CartContext';
import Loading from '@/components/22521276/loading';

const HomeScreen: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const {addItem} = useCart();
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoryResponse = await fetch('https://fakestoreapi.com/products/categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
        const categoryProducts: Record<string, Product[]> = {};
        for (const category of categoryData) {
          const productResponse = await fetch(`https://fakestoreapi.com/products/category/${category}`);
          const productData = await productResponse.json();
          categoryProducts[category] = productData;
        }

        setProductsByCategory(categoryProducts);
      } catch (error) {
        Alert.alert('Error', 'Failed to load categories or products.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      ...product,
      id: product.id.toString(),
      name: product.title,
      imgae: product.image,
      quantity: 1,
    };
    addItem(cartItem);
    Alert.alert('Cart', `${product.title} has been added to your cart.`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      {categories.map((category) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
          <FlatList
            data={productsByCategory[category]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProduct}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafd',
    paddingVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryList: {
    paddingBottom: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
