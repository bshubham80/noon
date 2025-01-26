import React, {useState, useCallback, useRef, useEffect } from 'react';
import { FlatList, NativeSyntheticEvent, NativeScrollEvent, FlatListProps } from 'react-native';


interface Props<T> extends FlatListProps<T> {
	containerWidth?: number;
	scrollInterval?: number;
}

const Carousel = <T extends {}>({
	data,
	renderItem,
	keyExtractor,
	containerWidth = 0,
	scrollInterval = 3000,
}: Props<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList<T>>(null);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / containerWidth);
    setCurrentIndex(newIndex);
  }, [containerWidth]);

  const goToNext = useCallback(() => {
    if (!data) {
        return;
    }

    if (currentIndex < data?.length - 1) {
      flatListRef.current?.scrollToOffset({ offset: (currentIndex + 1) * containerWidth, animated: true });
    } else {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [currentIndex, data, containerWidth]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, goToNext, scrollInterval]);

  return (
    <FlatList
			horizontal
			data={data}
			pagingEnabled
			ref={flatListRef}
			renderItem={renderItem}
			onScroll={handleScroll}
			keyExtractor={keyExtractor}
			showsHorizontalScrollIndicator={false}
  	/>
  );
};

export default Carousel;
