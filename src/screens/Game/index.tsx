import React, { useRef, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Arrow from '../../components/Arrow';

const ROTATION_SPEED = 4000;

const { width, height } = Dimensions.get('window');

const logCoords = {
  x: width / 2 - 100,
  y: height / 5 - 100,
  origin: { x: width / 2, y: height / 5 },
};

const ARROW_COUNT = 50;

const Game = () => {
  const [arrows, setArrow] = useState(
    Array(ARROW_COUNT).fill({ shoot: false, stuck: false, x: 0, y: 0 }),
  );

  const rotation = useSharedValue(0);
  const gameStart = useSharedValue(false);

  const [currentArrowIndex, setCurrentIndex] = useState(0);

  const arrowRefs = useRef<Animated.View[]>([]); // Ref for arrow positions

  useAnimatedReaction(
    () => gameStart.value,
    (isStarted, previousValue) => {
      if (isStarted && !previousValue) {
        rotation.value = withRepeat(
          withTiming(360, {
            duration: ROTATION_SPEED,
            easing: Easing.linear,
          }),
          -1,
        );
      }
    },
  );

  const gesture = Gesture.Tap().onStart(() => {
    if (!gameStart.value) {
      gameStart.value = true;
      return;
    }

    if (currentArrowIndex === ARROW_COUNT) {
      return;
    }

    const updatedArrows = [...arrows];
    updatedArrows[currentArrowIndex] = {
      ...updatedArrows[currentArrowIndex],
      shoot: true,
    };
    runOnJS(setArrow)(updatedArrows);
    runOnJS(setCurrentIndex)(currentArrowIndex + 1);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: logCoords.x,
        },
        {
          translateY: logCoords.y,
        },
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  const handleArrowStuck = (index: number, x: number, y: number) => {
    const updatedArrows = [...arrows];
    updatedArrows[index] = { ...updatedArrows[index], stuck: true, x, y };
    setArrow(updatedArrows);
    checkCollisions(updatedArrows);
  };

  const checkCollisions = (
    currentArrows: { shoot: boolean; stuck: boolean; x: number; y: number }[],
  ) => {
    for (let i = 0; i < currentArrows.length; i++) {
      if (currentArrows[i].stuck) {
        for (let j = i + 1; j < currentArrows.length; j++) {
          if (currentArrows[j].stuck) {
            const dx = Math.abs(currentArrows[i].x - currentArrows[j].x);
            const dy = Math.abs(currentArrows[i].y - currentArrows[j].y);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 50) {
              // Adjust collision distance as needed
              console.log('Collision detected between arrow', i, 'and', j);
              // Handle collision (e.g., game over, points deduction)
            }
          }
        }
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View style={styles.canvas}>
          <ImageBackground
            style={styles.canvas}
            source={require('../../../assets/images/background.png')}>
            <Animated.Image
              source={require('../../../assets/images/wooden-log.png')}
              style={[styles.woodenLog, animatedStyle]}
            />
            {arrows.map((arrowData, idx) => (
              <Arrow
                key={idx}
                index={idx}
                shoot={arrowData.shoot}
                stuck={arrowData.stuck}
                origin={logCoords.origin}
                // Pass callback
                onStuck={(x, y) => handleArrowStuck(idx, x, y)}
              />
            ))}
          </ImageBackground>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: '#010101' },
  woodenLog: {
    width: 200,
    height: 200,
    position: 'absolute',
    zIndex: 10,
  },
  whiteDot: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default Game;
