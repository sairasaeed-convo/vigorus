import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import CommonFloatingButton from "@/components/common/CommonFloatingButton";
import ScheduleModal from "@/components/modals/schedule_modal";

export default function Schedule() {
  // Notification permission
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setPermissionGranted(status === "granted");
    };

    checkNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    if (status === "granted") {
      setPermissionGranted(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {permissionGranted ? (
        <View style={styles.container}>
          <ThemedText style={styles.sectionTopbarTitle}>
            Notification Schedules
          </ThemedText>
          <View style={styles.notificationsContainerStyle}>
            <Ionicons name="calendar" size={120} color="gray"></Ionicons>
            <ThemedText style={styles.sectionTitle}>No Schedules</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>
              Tap the + button to get started
            </ThemedText>

            <View style={styles.floatingButton}>
              <CommonFloatingButton
                iconName="pencil"
                onPress={() => {
                  console.log("Edit button pressed!");
                }}
                backgroundColor="darkgray"
                iconColor="white"
                size={64}
              />
              <ThemedText
                style={styles.spaceBetweenFloatingButtons}
              ></ThemedText>
              <CommonFloatingButton
                iconName="add"
                onPress={() => {
                  setModalVisible(true);
                }}
                backgroundColor="teal"
                iconColor="white"
                size={64}
              />
            </View>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.notificationsContainerStyle}>
            <Ionicons name="notifications" size={120} color="gray" />
            <TouchableOpacity
              style={styles.button}
              onPress={requestNotificationPermission}>
              <ThemedText style={styles.buttonText}>
                Enable Notifications
              </ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
      <ScheduleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  notificationsContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "teal",
    padding: 13,
    borderRadius: 20,
    marginTop: 14,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },

  sectionTopbarTitle: {
    padding: 15,
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
  sectionTitle: {
    padding: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    color: "gray",
  },

  floatingButton: {
    position: "absolute",
    bottom: 1,
    right: 1,
  },

  spaceBetweenFloatingButtons: {
    marginBottom: 10,
  },
});
