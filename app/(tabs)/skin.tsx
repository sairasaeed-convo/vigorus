import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BodyParts, bodyPartsData } from "@/interface/BodyParts";

export default function SkinCheckScreen({ navigation }: any) {
  const handleStartCheck = () => {
    // navigation.navigate("StartSkinCheck");
    //  fff
  };

  const [selectedTab, setSelectedTab] = useState("Full Body");

  // Function to filter body parts based on the selected tab
  const filteredBodyParts = () => {
    if (selectedTab === "Upper Body") {
      return bodyPartsData.filter((part) => part.bodyType === "UpperBody");
    } else if (selectedTab === "Lower Body") {
      return bodyPartsData.filter((part) => part.bodyType === "LowerBody");
    } else {
      return bodyPartsData; // Return all for "Full Body" or add your logic
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.sectionTopbarTitle}>
        Take a skin check
      </ThemedText>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Full Body", "Upper Body", "Lower Body"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.selectedTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <ThemedText style={styles.tabText}>{tab}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      {/* Spacer */}
      <View style={{ height: 18 }} />
      <View style={styles.flexRow}>
        <View
          style={[
            styles.verticalLine,
            { height: filteredBodyParts().length * 70 }, // increase or decrease if the vertical line not draws correctly
          ]}
        >
          {filteredBodyParts().map((_, index) => (
            <View key={index} style={styles.dot} />
          ))}
        </View>
        <View style={styles.timeline}>
          {filteredBodyParts().map((bodyPart) => (
            <TouchableOpacity key={bodyPart.name} style={styles.bodyPart}>
              <Image
                source={{ uri: bodyPart.image }}
                style={{ width: 40, height: 40, marginRight: 8 }}
              />
              <ThemedText style={styles.bodyPartText}>
                {bodyPart.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartCheck}>
        <Ionicons name="play-outline" size={24} color="#fff" />
        <Text style={styles.startButtonText}>Start SkinCheck</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 18,
  },
  tab: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "lightgray",
    borderColor: "lightgray",
  },
  selectedTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontSize: 12,
  },
  sectionTopbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 47,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    flex: 1,
  },
  verticalLine: {
    width: 3,
    backgroundColor: "black",
    alignItems: "center",
    marginRight: 22,
    marginTop: 22,
  },
  timeline: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 50,
    backgroundColor: "black",
    marginBottom: 52,
  },
  bodyPart: {
    height: 69,
    flexDirection: "row",
    alignItems: "center",
  },
  bodyPartText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: "teal",
    paddingVertical: 12,
    borderRadius: 5,
    marginHorizontal: 57,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    marginLeft: 32,
    fontSize: 16,
  },
});
