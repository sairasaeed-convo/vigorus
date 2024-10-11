import * as FileSystem from "expo-file-system";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CommonFloatingButton from "@/components/common/CommonFloatingButton";

//       <Link href="/" style={styles.link}>
{
  /* <ThemedText type="link">Go to home screen!</ThemedText>
</Link> */
}
export default function AnalyzeImage() {
  const { predict_image_uri } = useGlobalSearchParams();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [imageExists, setImageExists] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState("Self Evaluation");
  const [characteristicsTab, setSelectedCharacteristicsTab] = useState("No");
  const [riskPriority, setRiskPriorityTab] = useState("Low");

  useEffect(() => {
    handleImageLoad();
  }, [predict_image_uri]);

  async function checkImageExists(imageUri: string): Promise<boolean> {
    const fileExists = await FileSystem.getInfoAsync(imageUri);
    return fileExists.exists;
  }

  const handleImageLoad = async () => {
    if (typeof predict_image_uri === "string") {
      const exists = await checkImageExists(predict_image_uri);
      if (exists) {
        setImageUri(predict_image_uri);
        setImageExists(true);
      } else {
        setImageExists(false);
      }
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flexGrow: 1, flex: 1 }}>
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
        <View
          style={{
            backgroundColor: "white",
            paddingBottom: 32,
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.closeIcon} onPress={router.back}>
              <Ionicons
                name="close"
                size={18}
                color="#1B1B1F"
                style={{ padding: 12 }}
              />
            </Pressable>
            <ThemedText style={styles.headerText}>Analyze</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.saveText}>Save</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Image Row */}
          <View style={styles.imageShowRow}>
            <View style={[styles.overlay, { width: 200, height: 200 }]}>
              <Image
                source={{ uri: imageUri }}
                resizeMode="cover"
                onError={(error) =>
                  console.log("Image failed to load:", error.nativeEvent.error)
                }
              />
            </View>
            <Pressable style={styles.closeIcon} onPress={router.back}>
              <Ionicons
                name="warning"
                size={42}
                color="#1B1B1F"
                style={{ padding: 18 }}
              />
            </Pressable>
          </View>

          {/* Use free AI Risk Assessment */}
          <View style={styles.riskAssesmentAi}>
            <Pressable>
              <View style={styles.riskAssesmentContent}>
                <Ionicons
                  name="star"
                  size={50}
                  color="#197E8D"
                  style={{ padding: 12, margin: 12 }}
                />
                <View style={{ alignSelf: "center" }}>
                  <ThemedText style={styles.assesmentHeader}>
                    Use a free AI Risk Assessment
                  </ThemedText>
                  <ThemedText style={styles.assesmentSubtitle}>
                    Assessments remaining: 3
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {["Self Evaluation", "Examples"].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, selectedTab === tab && styles.selectedTab]}
                onPress={() => setSelectedTab(tab)}
              >
                <ThemedText style={styles.tabText}>{tab}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Scrollable content */}
        <View style={{ backgroundColor: "#F3F2F7", flex: 1 }}>
          {selectedTab === "Self Evaluation" ? (
            <ScrollView contentContainerStyle={styles.body}>
              <ThemedText style={styles.sectionTitle}>
                LESION CHARACTERISTICS
              </ThemedText>

              <ThemedView style={styles.schedulingCard}>
                <ThemedView style={styles.cardRow}>
                  <ThemedText style={styles.cardText}>Asymmetry</ThemedText>
                  <ThemedView style={styles.cardTabsContainer}>
                    {["Yes", "No"].map((tab) => (
                      <Pressable
                        key={tab}
                        style={[
                          styles.cardTab,
                          characteristicsTab === tab && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedCharacteristicsTab(tab)}
                      >
                        <ThemedText style={styles.tabText}>{tab}</ThemedText>
                      </Pressable>
                    ))}
                  </ThemedView>
                </ThemedView>
                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedView style={styles.horizontalLine} />
                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedView style={styles.cardRow}>
                  <ThemedText style={styles.cardText}>
                    Irregular Borders
                  </ThemedText>
                  <ThemedView style={styles.cardTabsContainer}>
                    {["Yes", "No"].map((tab) => (
                      <Pressable
                        key={tab}
                        style={[
                          styles.cardTab,
                          characteristicsTab === tab && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedCharacteristicsTab(tab)}
                      >
                        <ThemedText style={styles.tabText}>{tab}</ThemedText>
                      </Pressable>
                    ))}
                  </ThemedView>
                </ThemedView>

                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedView style={styles.horizontalLine} />
                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedView style={styles.cardRow}>
                  <ThemedText style={styles.cardText}>Varied Colors</ThemedText>
                  <ThemedView style={styles.cardTabsContainer}>
                    {["Yes", "No"].map((tab) => (
                      <Pressable
                        key={tab}
                        style={[
                          styles.cardTab,
                          characteristicsTab === tab && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedCharacteristicsTab(tab)}
                      >
                        <ThemedText style={styles.tabText}>{tab}</ThemedText>
                      </Pressable>
                    ))}
                  </ThemedView>
                </ThemedView>
                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedView style={styles.horizontalLine} />
                {/* Spacer */}
                <ThemedView style={{ height: 6 }} />
                <ThemedView style={styles.cardRow}>
                  <ThemedText style={styles.cardText}>
                    Diameter Larger{"\n"}than 6mm
                  </ThemedText>
                  <ThemedView style={styles.cardTabsContainer}>
                    {["Yes", "No"].map((tab) => (
                      <Pressable
                        key={tab}
                        style={[
                          styles.cardTab,
                          characteristicsTab === tab && styles.selectedTab,
                        ]}
                        onPress={() => setSelectedCharacteristicsTab(tab)}
                      >
                        <ThemedText style={styles.tabText}>{tab}</ThemedText>
                      </Pressable>
                    ))}
                  </ThemedView>
                </ThemedView>
              </ThemedView>

              {/* Risk Priority section */}
              <View style={{ height: 12 }} />
              <ThemedText style={styles.sectionTitle}>RISK PRIORITY</ThemedText>

              <ThemedView style={styles.schedulingCard}>
                {/* Spacer */}
                <ThemedView style={{ height: 3 }} />
                <ThemedText style={styles.cardText}>
                  Mark your risk priority for this lesion
                </ThemedText>
                <View style={{ height: 6 }} />
                <ThemedView style={styles.horizontalLine} />
                <View style={{ height: 6 }} />
                <ThemedView style={styles.riskTab}>
                  {["Low", "Medium", "High"].map((tab) => (
                    <Pressable
                      key={tab}
                      style={[
                        styles.riskCardTab,
                        riskPriority === tab && styles.selectedRiskTab,
                      ]}
                      onPress={() => setRiskPriorityTab(tab)}
                    >
                      <ThemedText style={styles.tabText}>{tab}</ThemedText>
                    </Pressable>
                  ))}
                </ThemedView>
                {/* Spacer */}
                <ThemedView style={{ height: 6 }} />
              </ThemedView>
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ThemedText style={styles.cardText}>
                This is where examples will go.
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeIcon: {
    marginStart: 12,
    backgroundColor: "#F3F2F7",
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#197E8D",
  },
  saveText: {
    color: "#6D9EDE",
    fontSize: 20,
    marginEnd: 12,
    fontWeight: "normal",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  frameAndZoomContainer: {
    flexGrow: 1,
    flexDirection: "column",
  },
  imageShowRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    borderWidth: 5,
    borderColor: "transparent",
    borderRadius: 16,
    alignSelf: "center",
    backgroundColor: "#197E8D",
  },
  sectionTitle: {
    padding: 12,
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#197E8D",
  },
  schedulingCard: {
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#FEFEFF",
    justifyContent: "space-between",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTab: {
    flexDirection: "row",
    paddingVertical: 1.5,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
  },
  cardTabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  horizontalLine: {
    height: 1.6,
    marginHorizontal: 2,
    backgroundColor: "#EEEEEE",
  },
  cardText: {
    fontSize: 16,
    paddingStart: 2,
    color: "#1B1B1F",
    fontWeight: "bold",
  },
  riskTab: {
    flexDirection: "row",
    paddingHorizontal: 2,
    justifyContent: "space-around",
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
  },
  riskCardTab: {
    flexDirection: "row",
    paddingHorizontal: 38,
    padding: 4,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
  },
  selectedRiskTab: {
    backgroundColor: "white",
  },
  riskAssesmentAi: {
    marginTop: 24,
    marginHorizontal: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#197E8D",
    backgroundColor: "white",
    borderRadius: 24,
  },
  riskAssesmentContent: {
    alignSelf: "center",
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  assesmentHeader: {
    fontSize: 20,
    marginEnd: 18,
    fontWeight: "bold",
    color: "#1B1B1F",
    flexWrap: "wrap",
  },
  assesmentSubtitle: {
    fontSize: 17,
    marginTop: 8,
    fontWeight: "normal",
    color: "#1B1B1F",
    flexWrap: "wrap",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#EEEEEE",
    borderRadius: 10,
    marginHorizontal: 24,
    marginTop: 24,
  },
  tab: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
  },
  selectedTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 12,
    color: "#1B1B1F",
    fontWeight: "bold",
  },
  body: {
    backgroundColor: "#F3F2F7",
    paddingBottom: 42,
  },
});
