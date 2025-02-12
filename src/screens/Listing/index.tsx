import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useLazyGetProductsQuery } from '../../redux/api/productsApi';

import { useAppSelector } from '../../utils/reduxHelper';

import ProductCarousel from '../../components/ProductCarousel';
import FeatureProduct from '../../components/FeatureProduct';
import { Product } from '../../redux/types';
import { useNavigation } from '@react-navigation/native';
import { ErrorView } from '../../components/ErrorView';

export const Listing: React.FC = () => {
  const naviation = useNavigation();
  const [callApi, { isLoading, isFetching, isError }] = useLazyGetProductsQuery();
  const { banners, featured } = useAppSelector(state => state.listing);

  const onItemClick = useCallback(
    (item: Product) => {
      naviation.navigate('ProductDetail', { productId: item.id });
    },
    [naviation],
  );

  const onRetry = useCallback(() => {
    callApi();
  }, [callApi]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  if (isLoading || isFetching) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <ErrorView onRetry={onRetry} />;
  }

  return (
    <View>
      <ProductCarousel data={banners} onItemClick={onItemClick} />
      <FeatureProduct data={featured} onItemClick={onItemClick} />
    </View>
  );
};
