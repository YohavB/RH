import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/componentStyles/CarOptionsMenuStyles";
import { Colors } from "../styles/GlobalStyle";

const CarOptionsMenu = ({ isVisible, onDelete }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.optionsMenu}>
      <TouchableOpacity style={styles.optionItem} onPress={onDelete}>
        <Text style={[styles.optionText, { color: Colors.pinkish }]}>
          Delete Car
        </Text>
        <View style={styles.optionBottomBorder} />
      </TouchableOpacity>
    </View>
  );
};

export default CarOptionsMenu;
