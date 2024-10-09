import PagerView from "react-native-pager-view";

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  PanResponder,
  Animated,
  Pressable,
} from "react-native";

//   useEffect(() => {
//     // Auto-scroll logic
//     if (isModalVisible) {
//       autoScrollInterval = setInterval(() => {
//         if (pagerRef.current) {
//           const currentPage = -1; //(pagerRef.current as any).getCurrentPage();
//           const nextPage = (currentPage + 1) % OnBoardingData.length;
//           pagerRef.current.setPage(nextPage);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(autoScrollInterval);
//   }, [isModalVisible]);

interface OnboardingViewPagerModalProps {
  visible: boolean;
  onClose: () => void;
}

const OnBoardingData = [
  {
    title: "Hold your phone perpendicular to the mole",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    title: "Have only skin be visible in the square view",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    title: "Focus the camera clearly on the mole",
    image: require("@/assets/images/react-logo.png"),
  },
];

const OnboardingViewPagerModal = ({
  visible,
  onClose,
}: OnboardingViewPagerModalProps) => {
  const [isModalVisible, setModalVisible] = useState(visible);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
        const verticalMovement = Math.abs(gestureState.dy);
        const horizontalMovement = Math.abs(gestureState.dx);
        const threshold = 5; // Adjust this value as needed

        // Check if vertical movement exceeds the threshold and is greater than horizontal movement
        return (
          verticalMovement > threshold && verticalMovement > horizontalMovement
        );
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Same logic as onStartShouldSetPanResponder (with threshold if needed)
        const verticalMovement = Math.abs(gestureState.dy);
        const horizontalMovement = Math.abs(gestureState.dx);
        const threshold = 5;
        return (
          verticalMovement > threshold && verticalMovement > horizontalMovement
        );
      },
      onPanResponderMove: Animated.event(
        [null, { dy: pan.y }], // Only track dy
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          // If the drag is greater than 100, dismiss the modal
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 }, // Move the modal off the screen
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onClose(); // Call the onClose prop to dismiss the modal
          });
        } else {
          // Otherwise, spring back to the original position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}
      onRequestClose={onClose}
    >

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-100, 0, 1000], // Define range for smooth dragging
                  outputRange: [-50, 0, 1000], // How the modal moves within this range
                  extrapolate: "clamp", // Prevent dragging too far out of bounds
                }),
              },
            ],
          },
        ]}
      >
        {/* Draggable handle */}
        <Pressable
          onPress={(event) => event.target == event.currentTarget && onClose()}
        >
          <View style={styles.handle} />
        </Pressable>

        <PagerView
          style={styles.pagerView}
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          {OnBoardingData.map((item, index) => (
            <View key={index} style={styles.page}>
              <Text style={styles.title}>{item.title}</Text>

              <Image source={item.image} style={styles.image} />
            </View>
          ))}
        </PagerView>
        {/* Dot indicators */}
        <View style={styles.dotsContainer}>
          {OnBoardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { opacity: currentPage === index ? 1 : 0.5 }, // Change opacity based on active page
              ]}
            />
          ))}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  content: {
    height: "40%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    position: "absolute",
    bottom: 0,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "gray",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  pagerView: {
    flex: 1,
    height: 250,
  },
  page: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  image: {
    marginTop: 24,
    width: 160,
    height: 160,
  },
  title: {
    marginStart: 24,
    marginTop: 12,
    fontSize: 18,
    marginEnd: 24,
    color: "black",
    fontWeight: "600",
    textAlign: "auto",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginHorizontal: 5,
  },
});

export default OnboardingViewPagerModal;
