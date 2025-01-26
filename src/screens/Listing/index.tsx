import React from 'react';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { useAppSelector } from '../../utils/reduxHelper';
import { ActivityIndicator } from 'react-native';

export const Listing: React.FC = () => {
    const { isLoading } = useGetProductsQuery();
    const { banners, featured } = useAppSelector(state => state.listing);


    if (isLoading) {
        return <ActivityIndicator />;
    }
    
    return null;
};
