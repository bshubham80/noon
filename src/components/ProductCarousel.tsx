import React, {useState, useCallback, useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList, NativeSyntheticEvent, NativeScrollEvent, Pressable } from 'react-native';
import { Product } from '../redux/types';


const { width: screenWidth } = Dimensions.get('window');

interface Props {
  data: Array<Product>;
  onItemClick: (product: Product) => void;
}

const autoScrollInterval = 3000;

const ProductCarousel: React.FC<Props> = ({ data, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const itemWidth = screenWidth;
    const newIndex = Math.round(contentOffset / itemWidth);
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToOffset({ offset: (currentIndex + 1) * screenWidth, animated: true });
    } else {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [currentIndex, data.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, goToNext]);


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
    (item: Product) => item.id.toString(),
    [],
  );

  return (
    <FlatList
    data={data}
    horizontal
    pagingEnabled
    ref={flatListRef}
    renderItem={renderItem}
    onScroll={handleScroll}
    keyExtractor={keyExtractor}
    showsHorizontalScrollIndicator={false}
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
