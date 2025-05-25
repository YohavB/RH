import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../styles/GlobalStyle';
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

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  countryPicker: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputFocused: {
    borderColor: Colors.mainOrange,
  },
});

export default PlateNumberInput; 