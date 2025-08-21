import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { Countries, getAllCountries, getCountryInfo } from "../utils/Countries";
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

  const countryList = getAllCountries();

  const selectedCountry = value !== null ? getCountryInfo(value) : null;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        {selectedCountry && selectedCountry.code !== 'UNKNOWN' && value !== null ? (
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
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <View style={styles.countryInfo}>
                    <Text style={styles.countryCode}>{item.code}</Text>
                    <Text style={styles.countryName}>{item.name}</Text>
                  </View>
                  {value !== null && value === item.value && (
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
