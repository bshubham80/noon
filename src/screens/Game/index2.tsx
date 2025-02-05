/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const STONE_COUNT = 50;
const THROW_DISTANCE = 400;

const StoneThrowGame = () => {
  const [stones, setStones] = useState(
    new Array(STONE_COUNT).fill(null).map(() => ({
      translateY: useSharedValue(0),
      rotation: useSharedValue(0),
      stucked: useSharedValue(false),
    })),
  );

  const [currentStoneIndex, setCurrentStoneIndex] = useState(0);

  // Function to throw a stone
  const throwStone = (index: number) => {
    if (index >= STONE_COUNT) {
      return;
    } // Stop if all stones are thrown

    const stone = stones[index];

    // Animate stone upwards
    stone.translateY.value = withSequence(
      withTiming(-Math.random() * THROW_DISTANCE, { duration: 700 }, () => {
        stone.stucked.value = true;
        runOnJS(setCurrentStoneIndex)(index + 1); // Move to the next stone
      }), // Move up
      // withSpring(0, {}, () => {

      // })
    );

    // Rotate while throwing
    stone.rotation.value = withTiming(360, { duration: 700 });
  };

  return (
    <View style={styles.container}>
      {/* Stones */}
      {stones.map((stone, index) => (
        <Animated.View
          key={index}
          style={[
            styles.stone,
            useAnimatedStyle(() => ({
              transform: [
                { translateY: stone.translateY.value },
                { rotate: `${stone.rotation.value}deg` },
              ],
            })),
          ]}
        />
      ))}

      {/* Throw Button */}
      <Pressable
        onPress={() => throwStone(currentStoneIndex)}
        style={styles.button}>
        <Text style={styles.buttonText}>Throw Stone</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  stone: {
    width: 40,
    height: 40,
    backgroundColor: 'gray',
    borderRadius: 2,
    position: 'absolute',
    bottom: 100,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18 },
});

export default StoneThrowGame;
