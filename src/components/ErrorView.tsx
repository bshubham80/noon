import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

interface ErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}
export const ErrorView: React.FC<ErrorProps> = ({
    title = 'Error',
    message = 'Something went wrong.',
    onRetry,
}) => {
return (
    <View style={style.container}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.message}>{message}</Text>
        {onRetry && (
            <Button title="Retry" onPress={onRetry} />
        )}
    </View>
);
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
    },
    message: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.8)',
        marginBottom: 16,
    },
});
