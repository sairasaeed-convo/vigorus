import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React, {
  useState,
  useEffect,
  useRef,
  ForwardRefRenderFunction,
  ForwardedRef,
  forwardRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import { Link, router, useGlobalSearchParams } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { ZOOM_TYPE, Zoomable } from "@likashefqet/react-native-image-zoom";
import { useRouter } from "expo-router";
import { AnimatedImage } from "react-native-reanimated/lib/typescript/reanimated2/component/Image";

const { width, height } = Dimensions.get("window");

export default function CropGalleryImage() {
  const handleInstructionsClick = () => {};

  const router = useRouter();

  const [toggleIsZoomed, setIsZoomed] = useState<boolean>(false);
  const scale = useSharedValue(1);
  const isPinching = useSharedValue(true);

  const cameraRef = useRef<CameraView>(null);
  const [fullScreenIimage, setFullScreenImage] = useState<string | null>(null);

  const { crop_image } = useGlobalSearchParams();

  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [imageExists, setImageExists] = useState<boolean>(false);

  useEffect(() => {
    if (typeof crop_image === "string") {
      console.log("Decoded Crop Image URI:", crop_image); // Log the decoded URI
      handleImageLoad(
        "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fvigorus-80ed6603-c1af-4f96-b958-ddcc1fc2d8cf/ImagePicker/f3e3b137-3cc7-488d-a8b0-7cb96d45faf0.jpeg"
      );
    } else {
      console.error("Unexpected type for crop_image:", typeof crop_image);
    }
  }, [crop_image]);

  const handleImageLoad = async (decodedUri: string) => {
    const exists = await checkImageExists(decodedUri);
    console.log("Crop Image exists:", exists);
    if (exists) {
      setImageUri(decodedUri); // Set the imageUri from the decoded parameter
      setImageExists(true);
    } else {
      setImageExists(false);
    }
  };

  async function checkImageExists(imageUri: string): Promise<boolean> {
    try {
      // Log the image URI being checked
      console.log("Checking image existence for URI:", imageUri);

      const fileExists = await FileSystem.getInfoAsync(imageUri);
      console.log("File exists:", fileExists.exists); // Log whether it exists
      return fileExists.exists;
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  }

  const onZoom = (zoomType?: ZOOM_TYPE) => {
    if (!zoomType || zoomType === ZOOM_TYPE.ZOOM_IN) {
      setIsZoomed(true);
    }
  };

  const onAnimationEnd = (finished?: boolean) => {
    if (finished) {
      setIsZoomed(false);
    }
  };

  const handleCancel = () => {
    router.canGoBack();
  };

  const handleUsePhoto = async () => {
    if (imageUri) {
      router.push({
        pathname: "/predict/[predict_image_uri]",
        params: { predict_image_uri: imageUri }, // Pass the saved asset URI
      });
    }
  };

  useEffect(() => {
    setFullScreenImage(null);
  }, []);

  const overlayWidth = 280;
  const overlayHeight = 280;

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        flexDirection: "column",
        flex: 1, // Make sure the container expands
      }}
    >
      <View style={styles.centeredViewNew}>
        <StatusBar hidden={false} />
        <Image
          source={{ uri: "https://example.com/placeholder-image.jpg" }}
          style={styles.fullScreenImage}
          resizeMode="cover"
        />
        <View style={styles.container}>
          <ThemedText style={styles.headerText}>Crop Image</ThemedText>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Pressable
              style={{ backgroundColor: "transparent" }}
              onPress={handleInstructionsClick}
            >
              <Text style={styles.text}>Instructions</Text>
            </Pressable>
          </View>

          {/* Frame middle */}
          <View style={styles.frameAndZoomContainer}>
            <Text style={styles.dragOrPinchText}>Drag or Pinch the Image</Text>

            <View
              style={[
                styles.overlay,
                { width: overlayWidth, height: overlayHeight },
              ]}
            >
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  resizeMode="cover"
                  style={{ width: "100%", height: "100%" }}
                  onError={(error) => {
                    console.error(
                      "Error loading image:",
                      error.nativeEvent.error
                    );
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://example.com/placeholder-image.jpg",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
            {/*  Retake or use photo */}
            <View style={styles.retakeOrUsePhotoButtonsContainer}>
              <Pressable
                style={styles.retakeOrUsePhotoButton}
                onPress={() => {
                  handleCancel();
                }}
              >
                <Text style={styles.zoomButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.retakeOrUsePhotoButton}
                onPress={() => {
                  handleUsePhoto();
                }}
              >
                <Text style={styles.zoomButtonText}>Use Photo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  centeredView: {
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  centeredViewNew: {
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  dragOrPinchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    alignItems: "center",
    marginHorizontal: 47,
    marginVertical: 12,
    marginTop: "auto", // Adjust spacing if necessary
  },
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "teal",
    borderRadius: 50,
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 124,
    justifyContent: "center",
  },
  fullScreenImage: {
    position: "absolute",
    width: width,
    backgroundColor: "blue",
    height: height,
    zIndex: 0,
  },
  frameAndZoomContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center", // Center items vertically
    alignItems: "center", // Center items horizontally
    alignSelf: "center",
  },
  overlay: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center", // Center children vertically
    alignItems: "center", // Center children horizontally
    // Optionally, add these to ensure it's centered:
    position: "relative", // Positioning if needed
    marginBottom: "auto",
  },
  overlayScreenShot: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlacer: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 12,
  },
  zoomButtonsContainer: {
    flexDirection: "row",
    marginTop: 16,
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  zoomButton: {
    width: 65,
    backgroundColor: "white",
    borderRadius: 32,
    padding: 10,
  },
  zoomButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    alignSelf: "baseline",
    marginStart: 12,
    marginVertical: 24,
  },
  retakeOrUsePhotoButtonsContainer: {
    marginEnd: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "baseline",
    marginVertical: 42,
  },
  retakeOrUsePhotoButton: {
    width: 150,
    backgroundColor: "white",
    borderRadius: 32,
    padding: 10,
  },
  galleryButton: {
    width: 52,
    height: 52,
    backgroundColor: "teal",
    borderRadius: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "teal",
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 12,
    paddingVertical: 12,
    marginHorizontal: 124,
    justifyContent: "center",
  },
});
