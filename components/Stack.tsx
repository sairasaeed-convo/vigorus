import React, { ReactNode, useEffect, useState } from "react";
import { useWindowDimensions, View, ViewProps, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  useDerivedValue,
} from "react-native-reanimated";


const ROTATION_ANGLE = 60;
const SWIPE_VELOCITY = 800;
const TOUCH_SLOP = 5; // Threshold for touch movement
const TIME_TO_ACTIVATE_PAN = 200; // Reduced time for pan activation


export type StackProps<T> = Pick<ViewProps, "style"> & {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
};

function Stack<T>({
  renderItem,
  data,
  onSwipeLeft,
  onSwipeRight,
}: StackProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentItem = data[currentIndex];
  const nextItem = data[nextIndex];

  const translateX = useSharedValue(0);
  const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });

  const { width: screenWidth } = useWindowDimensions();
  const hiddenTranslateX = 2 * screenWidth;

  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      const dx = Math.abs(touchStart.value.x - e.changedTouches[0].x);
      const dy = Math.abs(touchStart.value.y - e.changedTouches[0].y);
      const elapsed = Date.now() - touchStart.value.time;

      // Activate gesture on horizontal movement or time passed
      if (elapsed > TIME_TO_ACTIVATE_PAN || dx > dy) {
        state.activate(); // Horizontal movement is prioritized
      } else if (dy > TOUCH_SLOP) {
        state.fail(); // Fail gesture if vertical movement exceeds threshold
      }
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(({ velocityX }) => {
      if (Math.abs(velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }

      const onSwipe = velocityX > 0 ? onSwipeRight : onSwipeLeft;

      onSwipe && runOnJS(onSwipe)(currentItem);

      translateX.value = withSpring(
        Math.sign(velocityX) * hiddenTranslateX,
        {},
        () => runOnJS(setCurrentIndex)(currentIndex + 1)
      );
    });

  const rotate = useDerivedValue(
    () =>
      interpolate(
        translateX.value,
        [0, hiddenTranslateX],
        [0, ROTATION_ANGLE]
      ) + "deg"
  );

  const currentItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: rotate.value },
    ],
  }));

  const nextItemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-hiddenTranslateX, 0, hiddenTranslateX],
          [1, 0.8, 1]
        ),
      },
    ],
    opacity: interpolate(
      translateX.value,
      [-hiddenTranslateX, 0, hiddenTranslateX],
      [1, 0.6, 1]
    ),
  }));

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 0 }, () =>
      runOnJS(setNextIndex)(currentIndex + 1)
    );
  }, [currentIndex, translateX]);

  return (
    <View style={styles.container}>
      <View style={styles.nextItemContainer}>
        {nextItem && (
          <Animated.View style={nextItemAnimatedStyle}>
            {renderItem(nextItem, nextIndex)}
          </Animated.View>
        )}
      </View>
      {currentItem && (
        <GestureDetector gesture={gesture}>
          <Animated.View style={currentItemAnimatedStyle}>
            {renderItem(currentItem, currentIndex)}
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  nextItemContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Stack;