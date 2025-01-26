import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ListRenderItem, Dimensions } from 'react-native';
import { useGetProductByIdQuery } from '../../redux/api/productsApi';
import Carousel from '../../components/Carousel';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHelper';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';

const { width: screenWidth } = Dimensions.get('window');

const IMAGE_SIZE = screenWidth - 40;

export const ProductDetail = ({ route }) => {
  const { productId: id } = route.params;

  const { isLoading, data } = useGetProductByIdQuery(id);

  const dispatch = useAppDispatch();

  const alreadyAddedInCart = useAppSelector(state => state.cart.items.some(item => item.product.id === id));

  const renderItem: ListRenderItem<string> = useCallback(({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: string) => item, []);

  const onAddToCart = useCallback(() => {
    if (!data) {
      return;
    }

    if (alreadyAddedInCart) {
      dispatch(removeFromCart({product: data}));
    } else {
      dispatch(addToCart({ product: data }));
    }
  }, [alreadyAddedInCart, data, dispatch]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Carousel
        data={data?.image}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        containerWidth={IMAGE_SIZE}
      />

      <View style={styles.details}>
        <Text style={styles.title}>{data?.name}</Text>
        <Text style={styles.price}>${data?.price}</Text>
        <Text style={styles.description}>{data?.description}</Text>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={onAddToCart}
        >
          <Text style={styles.buttonText}>
            {alreadyAddedInCart ? 'Remove from cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  details: {
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    backgroundColor: 'tomato',
    height: 200,
  },
  image: {
    width: IMAGE_SIZE,
    height: 200,
  },
});
