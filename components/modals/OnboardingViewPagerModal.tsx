import PagerView from "react-native-pager-view";
import { SwiperFlatList } from "react-native-swiper-flatlist";
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
import { OnboardingViewPagerModalProps } from "@/interface/OnBoardingVPData";

const OnboardingViewPagerModal = ({
  visible,
  onClose,
  data,
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
        const threshold = 5;

        // Check if vertical movement exceeds the threshold and is greater than horizontal movement
        return (
          verticalMovement > threshold && verticalMovement > horizontalMovement
        );
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const verticalMovement = Math.abs(gestureState.dy);
        const horizontalMovement = Math.abs(gestureState.dx);
        const threshold = 5;
        return (
          verticalMovement > threshold && verticalMovement > horizontalMovement
        );
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 50) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
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
        <SwiperFlatList
          autoplay={true}
          autoplayDelay={1}
          autoplayLoop={true}
          autoplayLoopKeepAnimation={false}
          autoplayInvertDirection={false}
          index={0}
          showPagination={true}
          paginationActiveColor="black"
          data={data}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.page}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />
      </Animated.View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

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
  page: {
    width,
    alignItems: "center",
  },
  image: {
    marginTop: 18,
    width: 200,
    height: 200,
  },
  title: {
    marginStart: 24,
    fontSize: 18,
    marginTop: 12,
    marginEnd: 24,
    color: "black",
    fontWeight: "600",
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
