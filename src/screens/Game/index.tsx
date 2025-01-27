import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Group,
  Image,
  useImage,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  Easing,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const ROTATION_SPEED = 2000;
const ARROW_SPEED = 250;

const Game = () => {
  const { width, height } = useWindowDimensions();

  const rotation = useSharedValue(0);
  const arrowRotation = useSharedValue(0);
  const gameStart = useSharedValue(false);
  const arrowStuck = useSharedValue(false);
  const arrowY = useSharedValue(height - 150);

  const woodenLog = useImage(require('../../../assets/images/wooden-log.png'));
  const arrow = useImage(require('../../../assets/images/arrow-silver.png'));

  const logCoords = useMemo(
    () => ({
      x: width / 2 - 100,
      y: height / 5 - 100,
      origin: { x: width / 2, y: height / 5 },
    }),
    [width, height],
  );

  const arrowCoords = useMemo(
    () => ({ x: width / 2 - 25, y: height - 150 }),
    [height, width],
  );

  const logRotation = useDerivedValue(() => {
    return [
      {
        rotate: rotation.value,
      },
    ];
  });

  const arrowTransform = useDerivedValue(
    () => (arrowStuck.value ? [{ rotate: arrowRotation.value }] : []),
    [arrowStuck, arrowRotation],
  );

  const gesture = Gesture.Tap().onStart(() => {
    if (!gameStart.value) {
      gameStart.value = true;
      return;
    }

    const logY = height / 5 + 90;
    if (!arrowStuck.value) {
      arrowY.value = withTiming(
        logY,
        {
          duration: ARROW_SPEED,
        },
        finished => {
          if (finished) {
            arrowStuck.value = true;
            // runOnJS(setText)();
            console.log('first', rotation.value);
          }
        },
      );
    }
  });

  useAnimatedReaction(
    () => arrowStuck.value,
    isStuck => {
      if (isStuck) {
        arrowRotation.value = withRepeat(
            withTiming(2 * Math.PI, {
              duration: ROTATION_SPEED,
              easing: Easing.linear,
            }),
          -1,
        );
      }
    },
  );

  useAnimatedReaction(
    () => gameStart.value,
    (isStarted, previousValue) => {
      if (isStarted && !previousValue) {
        rotation.value = withRepeat(
          withTiming(2 * Math.PI, {
            duration: ROTATION_SPEED,
            easing: Easing.linear,
          }),
          -1,
        );
      }
    },
  );

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
            <Image
              width={200}
              height={200}
              fit="contain"
              image={woodenLog}
              x={logCoords.x}
              y={logCoords.y}
              transform={logRotation}
              origin={logCoords.origin}
            />
          <Group transform={arrowTransform} origin={logCoords.origin}>
            <Image
              image={arrow}
              width={50}
              height={100}
              fit="cover"
              x={arrowCoords.x}
              y={arrowY}
            />
          </Group>
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: '#fff' },
});

export default Game;
