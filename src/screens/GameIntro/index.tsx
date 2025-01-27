import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const GameIntro = () => {
  const handleStartGame = useCallback(() => {}, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.introContainer}>
        <Text style={styles.title}>Welcome to the Game!</Text>
        <Text style={styles.description}>
          Play the game to earn exciting rewards and promotional discount codes!
          Your score will determine the rewards you receive.
        </Text>

        <View style={styles.rewardsContainer}>
          <Text style={styles.rewardTitle}>Possible Rewards:</Text>
          <Text style={styles.rewardItem}>🎁 10% Discount Code</Text>
          <Text style={styles.rewardItem}>🎁 20% Discount Code</Text>
          <Text style={styles.rewardItem}>🎁 Exclusive Free Gift</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleStartGame} style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'space-between',
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  rewardsContainer: {
    marginTop: 16,
    width: '90%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
