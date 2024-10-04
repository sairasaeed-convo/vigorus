import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";

interface ProfileScreenModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileScreenModal = ({ visible, onClose }: ProfileScreenModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={{ flexGrow: 1 }}>
          <View style={styles.modalView}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.saveText}></ThemedText>

              <ThemedText style={styles.headerText}>Profile</ThemedText>
              <TouchableOpacity>
                <TouchableOpacity onPress={onClose}>
                  <ThemedText style={styles.saveText}>Done</ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
          {/* Contents */}

          <ThemedText style={styles.sectionTitle}>Subscription</ThemedText>
          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
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

  headerText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "black",
  },
  saveText: {
    color: "skyblue",
    fontSize: 16,
    marginHorizontal: 18,
    fontWeight: "normal",
  },
  sectionTitle: {
    padding: 12,
    marginTop: 12,
    marginHorizontal: 24,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  sectionSubtitle: {
    color: "gray",
    marginHorizontal: 18,
    marginVertical: 3,
    paddingHorizontal: 12,
    fontSize: 12,
  },
});

export default ProfileScreenModal;
