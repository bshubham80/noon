import { SharedValue } from 'react-native-reanimated';

export interface Arrow {
  x: number;
  y: SharedValue<number>;
  width: number;
  height: number;
  stucked: SharedValue<boolean>;
  origin: { x: number; y: number };
  transform: SharedValue<{ rotate: number }[]>;
}
