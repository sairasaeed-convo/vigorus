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
} from "react-native";

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
  let autoScrollInterval: NodeJS.Timeout;

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (!visible) {
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
      <View style={styles.content}>
        {/* Draggable handle */}
        <View style={styles.handle} />

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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'gray', 
    borderRadius: 2, 
    alignSelf: 'center', 
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
