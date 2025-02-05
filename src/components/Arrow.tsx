import React, { LegacyRef, useEffect, useMemo, useRef } from 'react';
import { Dimensions, Image, StyleSheet, View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const ARROW_WIDTH = 20;
const ARROW_HEIGHT = 100;

const BOTTOM_OFFSET = 50;

interface ArrowProp {
  shoot: boolean;
  stuck: boolean;
  origin: { x: number; y: number };
  index: number;
  onStuck: (x: number, y: number) => void; // Callback for Game.tsx
}

const ARROW_SPEED = 450;
const ROTATION_SPEED = 4000;
const arrow = require('../../assets/images/arrow-silver.png');

const Arrow: React.FC<ArrowProp> = ({ shoot, stuck, onStuck }) => {
  const yCoordinate = useSharedValue(height - (ARROW_HEIGHT + BOTTOM_OFFSET));
  const rotationAngle = useSharedValue(0);
  const isStuck = useSharedValue(false);

  const arrowCoords = useMemo(
    () => ({
      x: width / 2 - ARROW_WIDTH / 2,
      y: height - (ARROW_HEIGHT + BOTTOM_OFFSET),
    }),
    [],
  );

  useEffect(() => {
    if (shoot && !stuck) {
      // Only move if not already stuck
      const logY = height / 5 + 90;
      yCoordinate.value = withTiming(
        logY,
        {
          duration: ARROW_SPEED,
        },
        () => {
          isStuck.value = true;
          runOnJS(onStuck)(arrowCoords.x, logY); // Call the callback with coordinates
        },
      );
    }
  }, [shoot, stuck, yCoordinate, onStuck, arrowCoords.x, isStuck]);

  useAnimatedReaction(
    () => isStuck.value,
    currentValue => {
      if (currentValue) {
        rotationAngle.value = withRepeat(
          withTiming(2 * Math.PI, {
            duration: ROTATION_SPEED,
            easing: Easing.linear,
          }),
          -1,
        );
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (isStuck.value) {
      // After shoot and arrow is stuck
      return {
        transform: [
          { translateX: arrowCoords.x },
          { translateY: yCoordinate.value - 140 },
          { rotate: `${rotationAngle.value}rad` },
          { translateX: 0 },
          { translateY: 140 },
        ],
      };
    } else {
      return {
        transform: [
          { translateX: arrowCoords.x },
          { translateY: yCoordinate.value },
        ],
      };
    }
  });

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <Image source={arrow} style={styles.arrow} resizeMode="contain" />
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  box: {
    width: ARROW_WIDTH,
    height: ARROW_HEIGHT,
    position: 'absolute',
    backgroundColor: 'red',
  },
  arrow: {
    width: '100%',
    height: '100%',
  },
});

export default Arrow;
