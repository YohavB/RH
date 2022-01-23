import React from "react";
import { TextInput, View, Text } from "react-native";
import GlobalStyle from "../utils/GlobalStyle";

export default function NeedToGo() {
  return (
    <View>
      <Text>Welcome To Rush Hour</Text>
      <Text>
        To Starting using this app please enter your Name and your Plate Number
      </Text>
      <TextInput style={GlobalStyle.Input}></TextInput>
    </View>
  );
}
