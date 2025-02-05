import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Platform, StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Group,
  Image,
  Text,
  useImage,
  matchFont,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  cancelAnimation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../components/Arrow';

const fontFamily = Platform.select({
  ios: 'Helvetica',
  android: 'source-sans-pro',
  default: 'serif',
});
const fontStyle = {
  fontFamily,
  fontSize: 48,
  fontStyle: 'normal',
  fontWeight: 'bold',
};
const font = matchFont(fontStyle);

const ROTATION_SPEED = 1500;
const ARROW_SPEED = 600;

const PrizeMapping = {
  A: '🎁 10% Discount Code',
  B: '🎁 20% Discount Code',
  C: '🎁 30% Discount Code',
  D: '🎁 Exclusive Free Gift',
};

const Game = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const [prize, setPrize] = useState('');

  const [arrows, setArrow] = useState(
    Array(1)
      .fill(0)
      .map(_ => false),
  );

  console.log('arrows', arrows);

  const rotation = useSharedValue(0);
  const gameStart = useSharedValue(false);

  const currentArrowIndex = useRef(0);

  const opacity = useSharedValue(1);

  const woodenLog = useImage(require('../../../assets/images/wooden-log.png'));
  const background = useImage(require('../../../assets/images/background.png'));

  const logCoords = useMemo(
    () => ({
      x: width / 2 - 100,
      y: height / 5 - 100,
      origin: { x: width / 2, y: height / 5 },
    }),
    [width, height],
  );

  const logRotation = useDerivedValue(() => {
    return [
      {
        rotate: rotation.value,
      },
    ];
  });

  const textTransform = useDerivedValue(
    () => [{ scale: interpolate(opacity.value, [0.6, 1], [1.1, 1]) }],
    [],
  );

  const showModal = () => {
    Alert.alert('Congratulation', `You won ${prize}`, [
      {
        text: 'OK',
        onPress: navigation.goBack,
      },
    ]);
  };

  // useAnimatedReaction(
  //   () => arrowStuck.value,
  //   isStuck => {
  //     if (isStuck) {
  //       // arrowRotation.value = withRepeat(
  //       //     withTiming(2 * Math.PI, {
  //       //       duration: ROTATION_SPEED,
  //       //       easing: Easing.linear,
  //       //     }),
  //       //   -1,
  //       // );
  //       cancelAnimation(rotation);
  //       runOnJS(showModal)();
  //     }
  //   },
  // );

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

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, {
        duration: 700,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [opacity]);

  const gesture = Gesture.Tap().onStart(() => {
    if (!gameStart.value) {
      gameStart.value = true;
      opacity.value = 0;
      cancelAnimation(textTransform);
      return;
    }

    arrows[currentArrowIndex.current] = true;
    runOnJS(setArrow)(arrows);
    // const logY = height / 5 + 90;
    // if (!arrowStuck[currentArrowIndex.current].value) {
    //   arrows[currentArrowIndex.current] = [true, false];
    //   runOnJS(setArrow)(arrows);

    //   arrowY[currentArrowIndex.current].value = withTiming(
    //     logY,
    //     {
    //       duration: ARROW_SPEED,
    //     },
    //     finished => {
    //       if (finished) {
    //         arrowStuck[currentArrowIndex.current].value = true;

    //         // const halfPi = Math.PI / 2;
    //         // const threePi = (Math.PI * 3) / 2;

    //         // let prizeText = '';
    //         // if (rotation.value >= 0 && rotation.value <= halfPi) {
    //         //   prizeText = PrizeMapping.D;
    //         // } else if (rotation.value >= halfPi && rotation.value <= Math.PI) {
    //         //   prizeText = PrizeMapping.B;
    //         // } else if (rotation.value >= Math.PI && rotation.value <= threePi) {
    //         //   prizeText = PrizeMapping.A;
    //         // } else {
    //         //   prizeText = PrizeMapping.C;
    //         // }
    //         arrows[currentArrowIndex.current] = [true, true];
    //         runOnJS(setArrow)(arrows);
    //         currentArrowIndex.current++;
    //       }
    //     },
    //   );
    // }
  });

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
          <Image
            width={width}
            height={height}
            fit="cover"
            image={background}
            x={0}
            y={0}
          />
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
          {arrows.map((a, idx) => {
            return (
              <Arrow key={idx} origin={logCoords.origin} shoot={arrows[idx]} />
            );
          })}
          <Group
            transform={textTransform}
            origin={{ x: width / 2, y: height / 2 }}>
            <Text
              text="Tap"
              color="#fff"
              font={font}
              x={width / 2 - font.measureText('Tap').width / 2}
              y={height / 2}
              opacity={opacity}
            />
          </Group>
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  canvas: { flex: 1, backgroundColor: '#010101' },
});

export default Game;
