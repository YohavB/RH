import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import { Colors } from '../styles/GlobalStyle';
import styles from '../styles/componentStyles/PlateNumberInputStyles';
import CountryPicker from './CountryPicker';

const PlateNumberInput = ({
  plateNumber,
  setPlateNumber,
  selectedCountry,
  setSelectedCountry,
  onSubmit,
  isLoading = false,
  style,
  inputRef,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const localInputRef = useRef(null);

  // Use provided ref or local ref
  const finalInputRef = inputRef || localInputRef;

  return (
    <View style={[styles.inputContainer, style]}>
      <CountryPicker
        value={selectedCountry}
        onValueChange={setSelectedCountry}
        style={styles.countryPicker}
      />

      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        placeholder="Plate number"
        placeholderTextColor="#888"
        value={plateNumber}
        onChangeText={setPlateNumber}
        onSubmitEditing={onSubmit}
        keyboardType="default"
        autoCapitalize="characters"
        editable={!isLoading}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={finalInputRef}
      />
    </View>
  );
};



export default PlateNumberInput; 