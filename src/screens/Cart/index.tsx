import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
} from '../../redux/features/cartSlice';
import CartItem from '../../components/Cart/CartItem';
import { useAppSelector } from '../../utils/reduxHelper';
import { CartItem as CartItemType, Product } from '../../redux/types';
import { Seperator } from '../../components/Seperator';
import { EmptyState } from '../../components/Cart/EmptyState';

export const Cart: React.FC = () => {
  const {items: cartItems, totalPrice} = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = useCallback((product: Product) => {
    dispatch(addToCart({product}));
  },[dispatch]);

  const handleDecreaseQuantity = useCallback((product: Product) => {
    dispatch(removeFromCart({product}));
  },[dispatch]);

  const renderItem: ListRenderItem<CartItemType> = useCallback(({ item }) => (
    <CartItem
      item={item}
      onIncrease={handleIncreaseQuantity}
      onDecrease={handleDecreaseQuantity}
    />
  ), [handleDecreaseQuantity, handleIncreaseQuantity]);


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        ListEmptyComponent={EmptyState}
        ItemSeparatorComponent={Seperator}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.contentContainer}
      />
      {totalPrice !== 0 && <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
        padding: 16,
        flexGrow: 1,
    },
    separator: {
        height: 16,
    },
    totalContainer: {
      marginTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      padding: 20,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    addToCartButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
  });
