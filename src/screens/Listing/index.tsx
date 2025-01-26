import React, { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useGetProductsQuery } from '../../redux/api/productsApi';

import { useAppSelector } from '../../utils/reduxHelper';

import ProductCarousel from '../../components/ProductCarousel';
import FeatureProduct from '../../components/FeatureProduct';
import { Product } from '../../redux/types';
import { useNavigation } from '@react-navigation/native';

export const Listing: React.FC = () => {
  const naviation = useNavigation();
  const { isLoading } = useGetProductsQuery();
  const { banners, featured } = useAppSelector(state => state.listing);

  const onItemClick = useCallback(
    (item: Product) => {
      naviation.navigate('ProductDetail', { productId: item.id });
    },
    [naviation],
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <ProductCarousel data={banners} onItemClick={onItemClick} />
      <FeatureProduct data={featured} onItemClick={onItemClick} />
    </View>
  );
};
