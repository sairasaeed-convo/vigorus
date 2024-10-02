import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CommonFloatingButtonProps {
  iconName: string;
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
  size?: number;
}

const CommonFloatingButton = ({
  iconName,
  onPress,
  backgroundColor,
  iconColor,
  size = 56,
}: CommonFloatingButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, width: size, height: size }]}
      onPress={onPress}
    >
      <Ionicons
        name={iconName as keyof typeof Ionicons.glyphMap}
        size={size * 0.6}
        color={iconColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // position: "absolute",
    bottom: 24,
    right: 20,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 12, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
});

export default CommonFloatingButton;
