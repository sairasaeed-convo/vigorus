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
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ visible, onClose }: ScheduleModalProps) => {
  const [selectedTab, setSelectedTab] = useState("Daily"); // State for selected tab

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"time" | "date" | "datetime">("time");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set") {
      // OK button pressed
      setShow(false);
      const currentDate = selectedDate || date;
      setDate(currentDate);
    } else {
      // Cancel button pressed or dismissed
      setShow(false);
    }
  };

  const showTimepicker = () => {
    setMode("time");
    setShow(true);
  };

  const showDatepicker = () => {
    setMode("date");
    setShow(true);
  };

  // Initial state set to current time
  useEffect(() => {
    setDate(new Date());
  }, []);

  const formatTime = (date: Date) => {
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM suffix
    const suffix = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, set to 12

    // Format minutes
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${suffix}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(); // Format as per your requirements
  };

  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    const today = new Date().getDay();
    setSelectedDay(days[today]);
  }, []);

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={{ flexGrow: 1 }}>
          <ScrollView>
            <View style={styles.modalView}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <ThemedText style={styles.cancelText}>Cancel</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.headerText}>
                  Create Schedule
                </ThemedText>
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
                {/* <Ionicons name="warning" size={180} color="gray" /> */}

                <TouchableOpacity onPress={showTimepicker}>
                  <ThemedText style={styles.day}>{formatTime(date)}</ThemedText>
                </TouchableOpacity>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                  />
                )}

                {/* Spacer */}
                <View style={{ height: 10 }} />

                <View
                  style={{
                    borderBottomColor: "gray",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    alignSelf: "stretch",
                    opacity: 0.7,
                  }}
                ></View>
                {/* Spacer */}
                <View style={{ height: 18 }} />
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
                {/* Spacer */}
                <View style={{ height: 18 }} />

                {/* Week day picker  */}
                {selectedTab === "Weekly" && (
                  <View style={styles.container}>
                    <View
                      style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        alignSelf: "stretch",
                        opacity: 0.7,
                      }}
                    ></View>
                    {/* Spacer */}
                    <View style={{ height: 18 }} />
                    <ThemedText style={styles.sectionTitleNoMargin}>
                      Which weekday?
                    </ThemedText>
                    <View style={{ height: 18 }} />

                    {days.map((day) => (
                      <TouchableOpacity
                        key={day}
                        onPress={() => handleDayPress(day)}
                      >
                        <Text
                          style={[
                            styles.day,
                            selectedDay === day && styles.selectedDay,
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {selectedTab === "Monthly" && (
                  <>
                    <View style={{ height: 10 }} />
                    <View
                      style={{
                        borderBottomColor: "gray",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        alignSelf: "stretch",
                        opacity: 0.7,
                      }}
                    ></View>
                    <View style={{ height: 18 }} />
                    <ThemedText style={styles.sectionTitleNoMargin}>
                      Which Day?
                    </ThemedText>
                    <ThemedText style={styles.sectionSubtitleNoMargin}>
                      Select the day on which the notification delivers.
                    </ThemedText>

                    <View style={{ height: 18 }} />

                    <TouchableOpacity onPress={showDatepicker}>
                      <ThemedText style={styles.day}>
                        {formatDate(date)}
                      </ThemedText>
                    </TouchableOpacity>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </>
                )}
              </View>
            </View>
            <View style={{ height: 18 }} />
          </ScrollView>
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
    color: "teal",
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
  sectionTitleNoMargin: {
    padding: 3,
    marginHorizontal: 3,
    fontSize: 16,
    fontWeight: "bold",
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
    borderRadius: 10,
    marginTop: 10,
  },
  tab: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 35,
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

  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    padding: 10,
    overflow: "hidden",
  },
  day: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    // borderBottomColor: "#eee",
    // borderBottomWidth: 1,
  },
  selectedDay: {
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
});

export default ScheduleModal;
