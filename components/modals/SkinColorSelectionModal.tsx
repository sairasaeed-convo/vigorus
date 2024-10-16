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
  FlatList,
} from "react-native";
import { OnboardingViewPagerModalProps } from "@/interface/OnBoardingVPData";

export interface ColorGridModalProps {
  visible: boolean; // To control the modal's visibility
  onClose: () => void; // Callback when the modal is closed
  colors: string[]; // Array of color codes (strings)
  selectedColorCode: (color: string) => void;
}

const SkinColorSelectionModal = ({
  visible,
  onClose,
  colors,
  selectedColorCode,
}: ColorGridModalProps) => {
  const [isModalVisible, setModalVisible] = useState(visible);
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
      {/* Animated modal container */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.content,
          {
            transform: [
              {
                translateY: pan.y.interpolate({
                  inputRange: [-100, 0, 1000],
                  outputRange: [-50, 0, 1000], // Controls the slide-down behavior
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        {/* Optional draggable handle */}
        {/* <View style={styles.handle} /> */}

        {/* Title */}
        {/* <Text style={styles.title}>
          Select which best describes your skin tone
        </Text> */}

        {/* FlatList for displaying the color options */}
        <FlatList
          ListHeaderComponent={
            <Text style={styles.title}>
              Select which best describes your skin tone
            </Text>
          }
          data={colors}
          renderItem={({ item }) => (
            <Pressable onPress={() => selectedColorCode(item)}>
              <View style={[styles.gridItem, { backgroundColor: item }]} />
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </Animated.View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gridItem: {
    width: 100,
    height: 100,
    marginTop: 18,
    margin: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    height: "44%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    alignItems: "center",
    margin: "auto",
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
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
    marginTop: 18,
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

export default SkinColorSelectionModal;
