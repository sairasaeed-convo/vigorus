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
  const handleSubscriptionClick = () => {};
  const handleLogOutClick = () => {};
  const handleDeleteAccountClick = () => {};
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={{ flexGrow: 1 }}>
          <View style={styles.modalView}>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText style={styles.saveText}></ThemedText>

              <ThemedText style={styles.headerText}>Profile</ThemedText>
              <TouchableOpacity onPress={onClose}>
                <ThemedText style={styles.saveText}>Done</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Subscription card */}
          <ThemedText style={styles.sectionTitle}>Subscription</ThemedText>
          <TouchableOpacity onPress={handleSubscriptionClick}>
            <View style={styles.skinCheckProCard}>
              <View style={styles.skinCheckProCardInner}>
                <ThemedText style={styles.skinCheckProTitle}>
                  Get SkinCheck Pro
                </ThemedText>
                <Ionicons name="star" size={13} color="teal" />
              </View>
              <Ionicons
                style={styles.skinCheckProForwardIcon}
                name="move"
                size={14}
                color="gray"
              />
            </View>
          </TouchableOpacity>

          <ThemedText style={styles.sectionTitle}>Account</ThemedText>
          <View style={styles.accountCard}>
            <TouchableOpacity onPress={handleLogOutClick}>
              <ThemedText style={styles.logOutButton}>Log out</ThemedText>
            </TouchableOpacity>

            <View style={{ position: "relative" }}>
              <View
                style={{
                  borderBottomColor: "gray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  opacity: 0.4,
                  position: "absolute",
                  left: "52%",
                  right: 0,
                  bottom: 0,
                }}
              ></View>
            </View>
            <TouchableOpacity onPress={handleDeleteAccountClick}>
              <ThemedText style={styles.deleteAccountButton}>
                Delete Account
              </ThemedText>
            </TouchableOpacity>
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

  headerText: {
    fontSize: 24,
    fontWeight: "normal",
    color: "teal",
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
  skinCheckProCard: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    shadowColor: "gray",
    justifyContent: "space-between",
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  skinCheckProTitle: {
    paddingHorizontal: 4,
    marginHorizontal: 0,
    fontSize: 14,
    fontWeight: "medium",
    color: "teal",
    alignSelf: "center",
  },

  skinCheckProCardInner: {
    paddingVertical: 12,
    paddingHorizontal: 5,
    marginHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skinCheckProForwardIcon: {
    alignSelf: "center",
    verticalAlign: "middle",
    marginHorizontal: 12,
  },
  accountCard: {
    flexDirection: "column",
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 1,
    paddingVertical: 10,
    shadowColor: "gray",
    justifyContent: "space-between",
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  logOutButton: {
    color: "skyblue",
    fontSize: 13,
    marginHorizontal: 18,
    fontWeight: "bold",
    left: "45%",
    paddingVertical: 8,
  },
  deleteAccountButton: {
    color: "red",
    fontSize: 13,
    opacity: 0.6,
    marginHorizontal: 18,
    fontWeight: "bold",
    left: "38%",
    paddingTop: 8,
  },
});

export default ProfileScreenModal;
