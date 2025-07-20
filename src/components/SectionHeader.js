import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/componentStyles/SectionHeaderStyles";

/**
 * Reusable section header component with icon
 * @param {string} title - Section title
 * @param {React.ReactNode} icon - Icon component to display
 * @param {object} style - Custom style for the container
 */
const SectionHeader = ({ title, icon, style }) => {
  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};



export default SectionHeader;
