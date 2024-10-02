import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ visible, onClose }: ScheduleModalProps) => {
  const [selectedTab, setSelectedTab] = useState("Daily"); // State for selected tab

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>
            <ThemedText style={styles.headerText}>Create Schedule</ThemedText>
            <TouchableOpacity>
              <ThemedText style={styles.saveText}>Save</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        {/* Contents */}
        <View>
          {/* lesion card */}
          <ThemedText style={styles.sectionTitle}>Lesion</ThemedText>
          <TouchableOpacity>
            <View style={styles.lesionCard}>
              <View style={styles.lesionContent}>
                <Ionicons name="warning" size={64} color="gray" />
                <ThemedText style={styles.lesionNoneTitle}>None</ThemedText>
              </View>
              <Ionicons
                style={styles.lesionNoneForwardIcon}
                name="add"
                size={24}
                color="gray"
              />
            </View>
          </TouchableOpacity>
          <ThemedText style={styles.sectionSubtitle}>
            You'll receive reminders to scan this lesion
          </ThemedText>

          {/* Spacer */}
          <View style={{ height: 10 }} />

          {/* Schedling */}
          <ThemedText style={styles.sectionTitle}>Scheduling</ThemedText>
          <View style={styles.schedulingCard}>
            <Ionicons name="warning" size={180} color="gray" />

            {/* Spacer */}
            <View style={{ height: 10 }} />
            <ThemedText style={styles.sectionTitleNoMargin}>
              Repeat Interval
            </ThemedText>
            <ThemedText style={styles.sectionSubtitleNoMargin}>
              How often would you like to be notified?
            </ThemedText>
            {/* Tabs */}
            <View style={styles.tabsContainer}>
              {["Daily", "Weekly", "Monthly"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    selectedTab === tab && styles.selectedTab,
                  ]}
                  onPress={() => setSelectedTab(tab)}
                >
                  <ThemedText style={styles.tabText}>{tab}</ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 12,
    backgroundColor: "white",
  },
  modalView: {
    backgroundColor: "white",
    padding: 8,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  cancelText: {
    color: "skyblue",
    fontSize: 14,
    marginHorizontal: 8,
    fontWeight: "normal",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "black",
  },
  saveText: {
    color: "gray",
    fontSize: 14,
    marginHorizontal: 8,
    fontWeight: "normal",
  },
  lesionCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    justifyContent: "space-between",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  lesionNoneTitle: {
    paddingHorizontal: 8,
    marginHorizontal: 0,
    fontSize: 16,
    color: "gray",
    alignSelf: "center",
  },

  lesionContent: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lesionNoneForwardIcon: {
    alignSelf: "center",
  },

  schedulingCard: {
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    justifyContent: "space-between",
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  sectionTitle: {
    padding: 12,
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
  },
  sectionSubtitle: {
    color: "gray",
    marginHorizontal: 18,
    marginVertical: 3,
    paddingHorizontal: 12,
    fontSize: 12,
  },
  sectionTitleNoMargin: {
    padding: 3,
    marginHorizontal: 3,
    fontSize: 16,
    fontWeight: "normal",
    color: "black",
  },
  sectionSubtitleNoMargin: {
    color: "gray",
    paddingHorizontal: 3,
    marginHorizontal: 3,
    fontSize: 12,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightgray",
    borderRadius: 8,
    marginTop: 10,
  },
  tab: {
    paddingVertical: 2,
    paddingHorizontal: 35,
    borderRadius: 8,
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
});

export default ScheduleModal;
