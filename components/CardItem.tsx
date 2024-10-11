import React, { FC, memo, useMemo } from "react";
import {
  Image,
  ImageBackground,
  ImageProps,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Card } from "../types/Card";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";

type ItemProps = Pick<ViewProps, "style"> & {
  card: Card;
};

const CardItem: FC<ItemProps> = ({
  card: { title, photo, smallIcon },
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const containerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [styles.container, { width: screenWidth - 16 * 8 }, style],
    [screenWidth, style]
  );

  const source = useMemo<ImageProps["source"]>(() => ({ uri: photo }), [photo]);
  const source2 = useMemo<ImageProps["source"]>(
    () => ({ uri: smallIcon }),
    [smallIcon]
  );

  return (
    <ThemedView
      style={{
        flexGrow: 1,
        flexDirection: "column",
        alignSelf: "center",
        borderRadius: 12,
        backgroundColor: "#F7F7F7",
        borderColor: "#A3A3A3",
        borderWidth: 3,
        paddingHorizontal: 24,
        paddingTop: 42,
        marginHorizontal: 24,
        marginTop: 32,
      }}
    >
      <Image
        source={source}
        style={{ borderRadius: 12, width: 220, height: 130, margin: 12 }}
      />
      {/* <ImageBackground key={title} style={containerStyle} source={source}></ImageBackground> */}

      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Asymmetry:</ThemedText>
        <Ionicons
          name="close"
          size={13}
          color="#EE5F54"
          style={{
            paddingStart:4,
            paddingTop:3,
            borderColor: "#EE5F54",
            borderRadius: 60,
            borderWidth: 2,
          }}
        />
      </ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Irregular Border:</ThemedText>
        <Ionicons
          name="close"
          size={13}
          color="#EE5F54"
          style={{
            paddingStart:4,
            paddingTop:3,
            borderColor: "#EE5F54",
            borderRadius: 60,
            borderWidth: 2,
          }}
        />
      </ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Varied Color:</ThemedText>
        <Ionicons
          name="close"
          size={13}
          color="#EE5F54"
          style={{
            paddingStart:4,
            paddingTop:3,
            borderColor: "#EE5F54",
            borderRadius: 60,
            borderWidth: 2,
          }}
        />
      </ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Large Diameter:</ThemedText>
        <Ionicons
          name="close"
          size={13}
          color="#EE5F54"
          style={{
            paddingStart:4,
            paddingTop:3,
            borderColor: "#EE5F54",
            borderRadius: 60,
            borderWidth: 2,
          }}
        />
      </ThemedView>
    </ThemedView>

  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 6,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    aspectRatio: 1,
    justifyContent: "flex-end",
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F7F7F7",
  },
  title: {
    fontSize: 32,
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { height: 1, width: 0 },
    textShadowRadius: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor:"transparent",
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center"
  },
  headerText: {
    textAlign: "center",
    padding: 3,
    fontSize: 16,
    fontWeight: "medium",
  },
});

export default memo(CardItem);
