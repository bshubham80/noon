import React, { useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import { Product } from '../redux/types';

const { width: screenWidth } = Dimensions.get('window');

interface Props {
  data: Product[];
  onItemClick: (product: Product) => void;
}

const FeatureProduct: React.FC<Props> = ({ data, onItemClick }) => {
  const renderItem = useCallback(
    ({ item }: { item: Product }) => {
      console.log(item.image[0]);
      return (
        <Pressable onPress={() => onItemClick(item)}>
          <View style={styles.card}>
            <Image
              source={{ uri: item.image[0] }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </Pressable>
      );
    },
    [onItemClick],
  );

  const keyExtractor = useCallback((item: Product) => String(item.id), []);

  const separator = useCallback(() => <View style={styles.separator} />, []);

  const HeaderComponent = useCallback(
    () => <Text style={styles.title}>Featured Products</Text>,
    [],
  );

  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={separator}
      ListHeaderComponent={HeaderComponent}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 8,
    paddingBottom: 250,
  },
  card: {
    backgroundColor: '#fff',
    width: screenWidth / 2 - 16,
    padding: 16,
    marginRight: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#d5d5d5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    padding: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  separator: {
    height: 12,
  },
});

export default FeatureProduct;
