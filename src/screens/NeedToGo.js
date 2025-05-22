import React from "react";
import { TextInput, View, Text } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import styles from "../styles/NeedToGoStyles";

export default function NeedToGo() {
  return (
    <View>
      <Text>Welcome To Rush Hour</Text>
      <Text>
        To Starting using this app please enter your Name and your Plate Number
      </Text>
      <TextInput style={{ 
        borderWidth: 1,
        padding: 10,
        width: 300,
        height: 50,
        borderColor: "#555",
        backgroundColor: "#fff",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20,
      }}></TextInput>
    </View>
  );
}
