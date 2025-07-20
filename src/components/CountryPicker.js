import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Countries } from "../classes/RHClasses";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/componentStyles/CountryPickerStyles";
import PickerIcon from "../assets/icons/earth_picker.svg";

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



export default CountryPicker;
