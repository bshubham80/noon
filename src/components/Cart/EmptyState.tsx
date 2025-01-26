import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { constants } from '../../utils/constants';

interface EmptyStateProps {
  onGoToShop: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onGoToShop }) => {
  return (
    <View style={styles.emptyCartContainer}>
      <Image
        source={{ uri: constants.BASKET }}
        style={styles.emptyCartImage}
      />
      <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      <Text style={styles.emptyCartSubtext}>Looks like you haven't added anything to your cart yet.</Text>
      <TouchableOpacity onPress={onGoToShop} style={styles.shopButton}>
        <Text style={styles.shopButtonText}>Go to Shop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyCartImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  shopButton: {
    backgroundColor: '#48bb78',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
