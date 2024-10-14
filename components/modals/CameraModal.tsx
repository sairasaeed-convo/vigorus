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

import * as ImagePicker from "expo-image-picker";

import { StatusBar } from "expo-status-bar";
import CommonFloatingButton from "../common/CommonFloatingButton";
import { ZOOM_TYPE, Zoomable } from "@likashefqet/react-native-image-zoom";
import OnboardingViewPagerModal from "../common/OnboardingViewPagerModal";
import { useRouter } from "expo-router";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

const CameraModal = ({ visible, onClose }: CameraModalProps) => {
  const router = useRouter();

  const [toggleIsZoomed, setIsZoomed] = useState<boolean>(false);
  const scale = useSharedValue(1);
  const isPinching = useSharedValue(true);

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

  const overlayWidth = 210;
  const overlayHeight = 210;

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const [toggleMinMaxZoom, setZoom] = useState<number>(0);
  const [torchMode, setTorchMode] = useState<boolean>(false);

  const isPermissionGranted = cameraPermission?.granted;

  const [modalVisible, setModalVisible] = useState(visible);

  const cameraRef = useRef<CameraView>(null);
  const [fullScreenIimage, setFullScreenImage] = useState<string | null>(null);
  const viewRef = useRef(null);
  const [image, setImage] = useState<string | null>(null);

  async function handleCapture() {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });

      // 1. Get a temporary file path
      const tempPath = `${FileSystem.cacheDirectory}screenshot.png`;

      // 2. Save the captured image to the temporary path
      await FileSystem.copyAsync({ from: uri, to: tempPath });

      // 3. Save to media library and get permanent URI
      const asset = await MediaLibrary.createAssetAsync(tempPath);
      const savedUri = asset.uri;
      // 4. Optionally delete the temporary file
      await FileSystem.deleteAsync(tempPath);

      // 5. Set the image URI
      setImage(savedUri);

      return savedUri; // Return the saved URI
    } catch (error) {
      console.error("Failed to capture and save screenshot:", error);
      return null; // Or throw an error if you prefer
    }
  }

  async function takePicture() {
    if (cameraRef && cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      if (data?.uri ?? null) {
        setFullScreenImage(data?.uri ?? "");
        handleCapture();
      }
    }
  }

  function toggleTorch() {
    setTorchMode((current) => !current);
  }

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (visible) {
      (async () => {
        if (!isPermissionGranted) {
          await requestCameraPermission();
        }
      })();
      setFlashMode("off");
      setTorchMode(false);
      setZoom(0);
      setImage(null);
      setFullScreenImage(null);
      setIsCameraReady(false);
    } else {
      resetCameraSettings();
    }
  }, [visible, isPermissionGranted]);

  const resetCameraSettings = () => {
    setFlashMode("off");
    setTorchMode(false);
    setZoom(0);
    setImage(null);
    setFullScreenImage(null);
    setIsCameraReady(false);
    setModalVisible(false);
  };

  const handleInstructionsClick = () => {
    onClose();
  };
  const handleMinZoom = () => {
    setZoom(0.5);
  };
  const handleMaxZoom = () => {
    setZoom(1);
  };
  const onGalleryClick = () => {
    pickImage();
  };

  const handleRetakePhoto = () => {
    resetCameraSettings();
  };

  const handleUsePhoto = async () => {
    if (image) {
      try {
        // Request permission and save the image
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
          await MediaLibrary.saveToLibraryAsync(image); // Save image
          const asset = await MediaLibrary.createAssetAsync(image);

          console.log("Image successfully saved:", asset); // Log saved image details

          // Navigate to the other screen with the saved URI
          if (asset.uri) {
            router.navigate({
              pathname: "/predict/[predict_image_uri]",
              params: { predict_image_uri: asset.uri }, // Pass the saved asset URI
            });
          }
        } else {
          alert("Permission to access media library is required.");
        }
      } catch (error) {
        console.error("Error saving image:", error);
      }
    } else {
      alert("Please select an image first.");
    }

    onClose();
  };

  const onCaptureClick = () => {
    takePicture();
  };

  if (!visible) {
    return null;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      console.log("Crop Uri:", result.assets[0].uri); // Check the URI being passed
      const encodedUri = encodeURIComponent(result.assets[0].uri); // Encode the URI
      console.log("Encoded Crop Uri:", encodedUri); // Check the encoded URI
  
      router.navigate({
        pathname: "/crop/[crop_image]",
        params: { crop_image: encodedUri},
      });
  
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flexGrow: 1 }}>
        {visible && (
          <OnboardingViewPagerModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}

        {isPermissionGranted ? (
          <CameraView
            enableTorch={torchMode}
            ref={cameraRef}
            facing="back"
            flash={flashMode}
            mode={"picture"}
            zoom={toggleMinMaxZoom}
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View style={styles.centeredView}>
              {fullScreenIimage && (
                <Image
                  source={{ uri: fullScreenIimage }}
                  style={styles.fullScreenImage}
                  resizeMode="cover"
                />
              )}
              <View style={styles.centeredViewNew}>
                <StatusBar hidden={false} />
                <View style={styles.container}>
                  {/* Instructions */}
                  <View style={styles.instructionsContainer}>
                    <TouchableOpacity
                      style={{ backgroundColor: "transparent" }}
                      onPress={handleInstructionsClick}
                    >
                      <Text style={styles.text}>Instructions</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Close and flash button */}
                  <View style={styles.closeOrFlashContainer}>
                    <CommonFloatingButton
                      iconName="close"
                      onPress={() => {
                        onClose();
                      }}
                      backgroundColor="white"
                      iconColor="black"
                      size={42}
                    />
                    <CommonFloatingButton
                      iconName="flash"
                      onPress={() => toggleTorch()}
                      backgroundColor="white"
                      iconColor="black"
                      size={42}
                    />
                  </View>

                  {/* Frame middle */}
                  <View style={styles.frameAndZoomContainer}>
                    <View
                      style={[
                        styles.overlay,
                        { width: overlayWidth, height: overlayHeight },
                      ]}
                    >
                      <View
                        ref={viewRef}
                        style={[
                          styles.overlayScreenShot,
                          { width: overlayWidth, height: overlayHeight },
                        ]}
                      >
                        {image && (
                          <GestureHandlerRootView
                            style={styles.frameAndZoomContainer}
                          >
                            <Zoomable
                              entering={FadeIn}
                              exiting={FadeOut}
                              layout={LinearTransition}
                              minScale={1}
                              maxScale={5}
                              scale={scale}
                              onInteractionStart={() => {
                                console.log("onInteractionStart");
                                onZoom();
                              }}
                              isPanEnabled={true}
                              isPinchEnabled={true}
                              isSingleTapEnabled={true}
                              onInteractionEnd={() =>
                                console.log("onInteractionEnd")
                              }
                              // Pan events
                              onPanStart={() => {
                                console.log("onPanStart");
                                if (!isPinching.value) {
                                  isPinching.value = false;
                                }
                              }}
                              onPanEnd={() => {
                                console.log("onPanEnd");
                                if (!isPinching.value) {
                                  isPinching.value = false;
                                }
                              }}
                              // Pinch events
                              onPinchStart={() => {
                                console.log("onPinchStart");
                                isPinching.value = false;
                              }}
                              onPinchEnd={() => {
                                console.log("onPinchEnd");
                                isPinching.value = true;
                              }}
                              onProgrammaticZoom={(zoomType) => {
                                console.log("onZoom", zoomType);
                                onZoom(zoomType);
                              }}
                              onResetAnimationEnd={(finished, values) => {
                                console.log("onResetAnimationEnd", finished);
                                console.log(
                                  "lastScaleValue:",
                                  values?.SCALE.lastValue
                                );

                                if (
                                  isPinching.value &&
                                  values?.SCALE?.lastValue
                                ) {
                                  scale.value = withTiming(
                                    values.SCALE.lastValue
                                  );
                                  onAnimationEnd(finished);
                                }
                              }}
                            >
                              <AnimatedImage
                                entering={FadeIn}
                                exiting={FadeOut}
                                layout={LinearTransition}
                                source={{ uri: image as string }}
                                style={[
                                  styles.imagePlacer,
                                  { width: 200, height: 200 },
                                ]}
                                resizeMode="cover"
                              />
                            </Zoomable>
                          </GestureHandlerRootView>
                        )}
                      </View>
                    </View>

                    {/* Zoom level buttons */}
                    <View style={styles.zoomButtonsContainer}>
                      <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => {
                          handleMinZoom();
                        }}
                      >
                        <Text style={styles.zoomButtonText}>1x</Text>
                      </TouchableOpacity>
                      <View style={{ marginHorizontal: 16 }}></View>

                      <TouchableOpacity
                        style={styles.zoomButton}
                        onPress={() => {
                          handleMaxZoom();
                        }}
                      >
                        <Text style={styles.zoomButtonText}>2x</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/*  Retake or use photo */}
                  {image ? (
                    <View style={styles.retakeOrUsePhotoButtonsContainer}>
                      <TouchableOpacity
                        style={styles.retakeOrUsePhotoButton}
                        onPress={() => {
                          handleRetakePhoto();
                        }}
                      >
                        <Text style={styles.zoomButtonText}>Retake Photo</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.retakeOrUsePhotoButton}
                        onPress={() => {
                          handleUsePhoto();
                        }}
                      >
                        <Text style={styles.zoomButtonText}>Use Photo</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      {/* Gallery and Capture buttons */}
                      <View style={styles.bottomButtonsContainer}>
                        <TouchableOpacity
                          style={styles.galleryButton}
                          onPress={onGalleryClick}
                        >
                          <Ionicons name="images" size={24} color="white" />
                        </TouchableOpacity>

                        <View
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "white",
                            borderWidth: 3,
                            width: 80,
                            height: 80,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 90,
                          }}
                        >
                          <TouchableOpacity
                            style={styles.captureButton}
                            onPress={onCaptureClick}
                          ></TouchableOpacity>
                        </View>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          </CameraView>
        ) : (
          <Text style={styles.button}>⚠️ We need access to your Camera!</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  centeredView: {
    flexGrow: 1,
  },
  centeredViewNew: {
    flexGrow: 1,
    alignItems: "center",
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
  instructionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "teal",
    borderRadius: 50,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 124,
    justifyContent: "center",
  },
  closeOrFlashContainer: {
    flexDirection: "row",
    marginStart: 18,
    marginEnd: -20,
    marginTop: 12,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  fullScreenImage: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 1,
  },
  frameAndZoomContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
  },
  overlay: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  overlayScreenShot: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
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
});

export default CameraModal;
