import React, { useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Product } from '../redux/types';
import Carousel from './Carousel';

const { width: screenWidth } = Dimensions.get('window');

interface Props {
  data: Array<Product>;
  onItemClick: (product: Product) => void;
}

const ProductCarousel: React.FC<Props> = ({ data, onItemClick }) => {

  const renderItem = useCallback(({ item }: { item: Product }) => (
    <Pressable onPress={() => onItemClick(item)}>
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: item.image[0] }}
      />
    </View>
    </Pressable>
  ), [onItemClick]);

  const keyExtractor = useCallback(
    (item: Product) => item.id,
    [],
  );

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      containerWidth={screenWidth}
    />
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  container: { width: screenWidth, height: 300 },
  image: { width: screenWidth, height: 300 },
});

export default ProductCarousel;
