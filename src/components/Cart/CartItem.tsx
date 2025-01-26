import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CartItem as CartItemType, Product } from '../../redux/types';

interface CartItemProps {
  item: CartItemType;
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncrease, onDecrease }) => {
  const { quantity, product } = item;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image[0] }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          onPress={() => onDecrease(product)}
          style={[styles.button, styles.decreaseButton]}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => onIncrease(product)}
          style={[styles.button, styles.increaseButton]}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  decreaseButton: {
    backgroundColor: '#f56565',
  },
  increaseButton: {
    backgroundColor: '#48bb78',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 4,
  },
});

export default CartItem;
