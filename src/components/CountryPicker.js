import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Countries } from "../classes/RHClasses";
import { Colors, Fonts } from "../styles/GlobalStyle";
import PickerIcon from "../../assets/earth_picker.svg";

/**
 * Country picker component for selecting a country
 * @param {Countries} value - The currently selected country
 * @param {function} onValueChange - Function to call when a new country is selected
 * @param {object} style - Additional styles for the component
 */
const CountryPicker = ({ value, onValueChange, style }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Build countries list from enum
  const countryList = Object.keys(Countries).map((key) => ({
    code: key,
    name: getCountryName(key),
    flag: getCountryFlag(key),
  }));

  // Helper function to get human-readable country name
  function getCountryName(countryCode) {
    switch (countryCode) {
      case "IL":
        return "Israel";
      default:
        return "None";
    }
  }

  // Helper function to get country flag emoji
  function getCountryFlag(countryCode) {
    switch (countryCode) {
      case "IL":
        return "🇮🇱";
      default:
        return "";
    }
  }

  // Get current country display info
  const selectedCountry = countryList.find((c) => c.code === value);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedCountry ? (
          <>
            <Text style={styles.flagText}>{selectedCountry.flag}</Text>
            <Text style={styles.codeText}>{selectedCountry.code}</Text>
          </>
        ) : (
          <PickerIcon width={40} height={40} fill={Colors.mainOrange} />
        )}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Country</Text>

            <FlatList
              data={countryList}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    onValueChange(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <View style={styles.countryInfo}>
                    <Text style={styles.countryCode}>{item.code}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                  </View>
                  {value === item.code && (
                    <View style={styles.selectedIndicator} />
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 50,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: "100%",
  },
  flagText: {
    fontSize: 22,
    textAlign: "center",
  },
  codeText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    marginBottom: 16,
    textAlign: "center",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  countryName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#666",
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.mainOrange,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: Colors.mainOrange,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
});

export default CountryPicker;
