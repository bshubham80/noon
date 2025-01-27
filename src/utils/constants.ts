import { Dimensions } from 'react-native';
import { isAndroid } from './platformHelper';

const { width, height } = Dimensions.get('window');

export const BASE_URL = isAndroid
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';
export const BASKET =
  'https://png.pngtree.com/png-vector/20231116/ourmid/pngtree-empty-wicker-basket-with-handle-for-thanksgiving-day-harvest-celebration-png-image_10617547.png';

export const WOODEN_LOG_WIDTH = 200;
export const WOODEN_LOG_HEIGHT = 200;
export const WOODEN_LOG_POSITION = {
  x: width / 2 - WOODEN_LOG_WIDTH / 2,
  y: height / 5 - WOODEN_LOG_HEIGHT / 2,
};
export const WOODEN_LOG_ROTATION_ORIGIN = {
  x: width / 2,
  y: height / 5,
};
export const ARROW_WIDTH = 50;
export const ARROW_HEIGHT = 100;
export const ARROW_POSITION = {
  x: width / 2 - ARROW_WIDTH / 2,
  y: height - (ARROW_HEIGHT + 50),
};
