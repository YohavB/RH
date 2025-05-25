import React, { useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import styles from "../styles/NeedToGoStyles";

const NeedToGo = ({ navigation }) => {
  // Screen load logging
  useEffect(() => {
    console.log("Need To Go Screen Loaded");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Rush Hour</Text>
      <Text style={styles.subtitle}>
        To Starting using this app please enter your Name and your Plate Number
      </Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter plate number"
      />
    </View>
  );
}

export default NeedToGo;
