import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";

import * as ImagePicker from "expo-image-picker";

import { StatusBar } from "expo-status-bar";
import CommonFloatingButton from "../common/CommonFloatingButton";

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get("window");

const CameraModal = ({ visible, onClose }: CameraModalProps) => {
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

  const onCaptureClick = () => {
    // Handle capture click
  };

  const overlayWidth = 210;
  const overlayHeight = 210;

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);
  const [toggleMinMaxZoom, setZoom] = useState<number>(0);
  const [torchMode, setTorchMode] = useState<boolean>(false);

  const [image, setImage] = useState<string | null>(null);

  const isPermissionGranted = cameraPermission?.granted;

  function toggleTorch() {
    setTorchMode((current) => !current);
  }

  useEffect(() => {
    (async () => {
      if (!isPermissionGranted && visible) {
        await requestCameraPermission();
      }
    })();
  }, [isPermissionGranted]);

  if (!visible) {
    return null;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <StatusBar hidden={false} />
        <View style={{ flexGrow: 1 }}>
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
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={[
                          styles.imagePlacer,
                          { width: overlayWidth, height: overlayHeight },
                        ]}
                      />
                    )}
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
              </View>
            </CameraView>
          ) : (
            <Text style={styles.button}>⚠️ We need access to your Camera!</Text>
          )}
        </View>
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
