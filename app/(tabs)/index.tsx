import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
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
        <Text style={styles.sectionSubtitle}>Regions to update</Text>

        <View style={styles.regions}>
          <View style={styles.regionCard}>
            <Image
              // source={{ uri: "https://i.imgur.com/W7b2lXE.png" }}
              source={{ uri: "https://imgur.com/P0IJ1mD.png" }}
              style={styles.regionImage}
            />
            <Text>Left Lower Leg</Text>
          </View>
          <View style={styles.regionCard}>
            <Image
              source={{ uri: "https://imgur.com/lhlXYOf.png" }}
              style={styles.regionImage}
            />
            <Text>Right Lower Leg</Text>
          </View>
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
    marginVertical: 10,
  },
  sectionSubtitle: {
    color: "gray",
    marginBottom: 10,
  },
  regions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  regionCard: {
    width: "45%",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 10,
    // borderWidth: 1,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
  regionImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
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
