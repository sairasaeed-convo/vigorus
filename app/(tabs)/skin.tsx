import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SkinCheckScreen({ navigation }: any) {
  const handleStartCheck = () => {
    // navigation.navigate("StartSkinCheck");
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Take a skin check</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Full Body</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Upper Body</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text>Lower Body</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 3,
              backgroundColor: "black",
              alignItems: "center",
              marginRight: 22,
              marginTop: 22,
            }}
          >
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.timeline}>
            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="person-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Head</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="body-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Chest</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="hand-left-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Left Shoulder</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="person-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Head</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="hand-left-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Left Arm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="person-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Head</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="hand-left-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Left Hand</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bodyPart}>
              <Ionicons name="person-outline" size={40} color="teal" />
              <Text style={styles.bodyPartText}>Head</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartCheck}>
          <Ionicons name="play-outline" size={24} color="#fff" />
          <Text style={styles.startButtonText}>Start SkinCheck</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabButton: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "30%",
    alignItems: "center",
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
    // marginBottom: 31,
  },
  bodyPartText: {
    marginLeft: 10,
    fontSize: 16,
  },
  startButton: {
    backgroundColor: "teal",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
});
