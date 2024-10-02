import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Platform,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

const LOCAL_DB = [
  {
    id: "1",
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyParName: "Chest",
    bodyPartType: "Upper Body",
    risk: "Risk: Normal",
  },
  {
    id: "2",
    imageByteArray: "https://imgur.com/P0IJ1mD.png",
    bodyParName: "Left Hand",
    bodyPartType: "Lower Body ",
    risk: "Risk: High",
  },
];

const BodyParts = [
  { name: "Head", info: "Info", type: "UpperBody" },
  { name: "Chest", info: "Info", type: "UpperBody" },
  { name: "Left Shoulder", info: "Info", type: "UpperBody" },
  { name: "Right Shoulder", info: "Info", type: "UpperBody" },
  { name: "Left Arm", info: "Info", type: "UpperBody" },
  { name: "Right Arm", info: "Info", type: "UpperBody" },
  { name: "Abdomen", info: "Info", type: "UpperBody" },
  { name: "Pelvis", info: "Info", type: "LowerBody" },
  { name: "Gluteus", info: "Info", type: "LowerBody" },
  { name: "Left Upper Leg", info: "Info", type: "LowerBody" },
  { name: "Right Upper Leg", info: "Info", type: "LowerBody" },
  { name: "Left Lower Leg", info: "Info", type: "LowerBody" },
  { name: "Right Lower Leg", info: "Info", type: "LowerBody" },
  { name: "Left Foot", info: "Info", type: "LowerBody" },
  { name: "Right Foot", info: "Info", type: "LowerBody" },
  { name: "Upper Back", info: "Info", type: "UpperBody" },
  { name: "Lower Back", info: "Info", type: "LowerBody" },
];

// Function to get image URL based on body part name
const getImageUrlForBodyPart = (bodyPartName: String) => {
  // Implement your logic to map body part names to image URLs
  // Example:
  if (bodyPartName === "Left Lower Leg") {
    return "https://imgur.com/P0IJ1mD.png";
  } else if (bodyPartName === "Head") {
    return "https://i.imgur.com/W7b2lXE.png";
  }
  // ... add more mappings for other body parts
  return "https://i.imgur.com/W7b2lXE.png"; // Default image URL if no mapping found
};

const handleEmpty = () => {
  return <Text style={styles.sectionSubtitle}>Nothing Scanned yet!</Text>;
};

export default function HomeScreen() {
  const [showRecents, setShowRecents] = useState(LOCAL_DB.length > 0);

  useEffect(() => {
    setShowRecents(LOCAL_DB.length > 0);
  }, [LOCAL_DB]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={28} color="teal" />
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={styles.body}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 22,
          }}
        >
          <Image
            source={require("@/assets/images/react-logo.png")}
            style={{ alignSelf: "center", height: 70, width: 70 }}
          />

          <Text style={{ fontSize: 39, fontWeight: "bold" }}>SkinCheck</Text>
        </View>
        {/* Scan Lesion Button */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity style={styles.scanButton}>
            <Ionicons name="camera-outline" size={20} color="#fff" />
            <Text style={styles.scanButtonText}>Scan a Lesion</Text>
          </TouchableOpacity>
        </View>

        {/* Stay up to date section */}
        <Text style={styles.sectionTitle}>Stay up to date</Text>

        {showRecents && (
          <>
            <Text style={styles.sectionSubtitle}>Recents</Text>
            <View style={styles.regions}>
              <FlatList
                data={LOCAL_DB}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                horizontal={true} // Enable horizontal scrolling
                ListEmptyComponent={handleEmpty}
                renderItem={({ item }) => (
                  <View style={styles.regionCardSavedData}>
                    <Image
                      source={{ uri: item.imageByteArray }} // Function to get image URL
                      style={styles.regionImage}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.sectionTitle}>
                        {item.bodyPartType}
                      </Text>
                      <Text>{item.bodyParName}</Text>

                      <Text style={styles.savedDataRiskTextStyle}>
                        {item.risk}
                      </Text>
                    </View>
                  </View>
                )}
              ></FlatList>
            </View>
          </>
        )}

        <Text style={styles.sectionSubtitle}>Regions to update</Text>

        <View style={styles.regions}>
          <FlatList
            data={BodyParts}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            horizontal={true} // Enable horizontal scrolling
            renderItem={({ item }) => (
              <View style={styles.regionCard}>
                <Image
                  source={{ uri: getImageUrlForBodyPart(item.name) }} // Function to get image URL
                  style={styles.regionImage}
                />
                <Text>{item.name}</Text>
              </View>
            )}
          ></FlatList>
        </View>

        {/* Take a skin check button */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity style={styles.skinCheckButton}>
            <Ionicons name="clipboard-outline" size={20} color="teal" />
            <Text style={styles.skinCheckButtonText}>Take a skin check</Text>
          </TouchableOpacity>
        </View>

        {/* Education Section */}
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.sectionSubtitle}>
          Learn about signs and symptoms
        </Text>

        <View style={styles.education}>
          <View style={styles.educationCard}>
            <Image
              source={{ uri: "https://imgur.com/uH9Ybrl.png" }}
              // source={{ uri: "https://imgur.com/P0IJ1mD.png" }}
              style={styles.educationImage}
            />
            <Text>Actinic Keratosis</Text>
          </View>
          <View style={styles.educationCard}>
            <Image
              source={{ uri: "https://imgur.com/qyCDAws.png" }}
              // source={{ uri: "https://imgur.com/lhlXYOf.png" }}
              style={styles.educationImage}
            />
            <Text>Basal Cell</Text>
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center" }}>
          {/* Share SkinCheck Section */}
          <Text style={styles.sectionTitle}>Share SkinCheck</Text>
          <Text style={styles.sectionSubtitle}>
            Keep your family and friends safe
          </Text>

          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={28} color="teal" />
          </TouchableOpacity>

          {/* Give Feedback Button */}
          <TouchableOpacity style={styles.feedbackButton}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color="teal"
            />
            <Text style={styles.feedbackButtonText}>Give Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="teal" />
        <Ionicons name="list-outline" size={24} color="gray" />
        <Ionicons name="person-outline" size={24} color="gray" />
        <Ionicons name="calendar-outline" size={24} color="gray" />
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  body: {
    padding: 20,
  },

  // Styling related to saved data
  regionCardSavedData: {
    width: Math.min(
      screenWidth * 0.6,
      PixelRatio.getPixelSizeForLayoutSize(230)
    ),
    marginRight: 8,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  savedDataRiskTextStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 18,
    color: "black",
    padding: 18,
    borderRadius: 8,
    backgroundColor: "white",
  },

  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "teal",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
  },
  scanButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },

  sectionSubtitle: {
    color: "gray",
    marginBottom: 18,
  },
  regions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  regionCard: {
    // width: 120,

    width: Math.min(
      screenWidth * 0.5,
      PixelRatio.getPixelSizeForLayoutSize(200)
    ),
    marginRight: 8,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 14,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  regionImage: {
    width: 60,
    height: 60,
    paddingVertical: 32,
    verticalAlign: "middle",
    borderRadius: 8,
  },
  textContainer: {
    flex: 1, // Allow text to take up remaining space
    color: "black",
    fontWeight: "bold",
    marginVertical: 2,
    padding: 2,
    fontSize: 16,
  },
  skinCheckButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "teal",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 20,
  },
  skinCheckButtonText: {
    color: "teal",
    marginLeft: 10,
    fontWeight: "bold",
  },
  education: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 7,
    borderRadius: 12,
  },
  educationCard: {
    // width: "45%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 6,
    gap: 5,
    paddingRight: 14,
  },
  educationImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 12,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  shareButton: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  feedbackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "teal",
    borderWidth: 1,
    justifyContent: "center",
  },
  feedbackButtonText: {
    color: "teal",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
