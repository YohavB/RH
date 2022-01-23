import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Text, TextInput, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const validatePlate = (value) => {
    value = value.replace(/[^0-9]/g, "");
    setPlateNumber(value);
  };

  const validateData = async () => {
    if (name.length == 0 || plateNumber.length < 6) {
      Alert.alert(
        "*Horn Noise*",
        "It seems like some info is missing or not completed"
      );
    } else {
      try {
        var userInfo = {
          name: name,
          plateNumber: plateNumber,
        };
        await AsyncStorageLib.setItem("userInfo", JSON.stringify(userInfo));
        console.log("set data from login and nav to main");

        //post to database
        navigation.replace("Main");
      } catch (error) {
        console.log(error);
        Alert.alert("*Horn Noise*", "It seems something goes wrong");
      }
    }
  };

  const postAndStore = () => {
    //post to database
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView
        style={[GlobalStyle.MainContainer, { justifyContent: "start" }]}
      >
        <Text style={GlobalStyle.Title}>Welcome To Rush Hour</Text>
        <Text style={GlobalStyle.Text}>
          To Starting using this app please enter your Name and your Plate
          Number
        </Text>
        <View
          style={{
            justifyContent: "space-evenly",
            height: 200,
          }}
        >
          <TextInput
            autoCapitalize="words"
            autoCorrect={false}
            style={GlobalStyle.Input}
            placeholder="Name"
            onChangeText={(value) => setName(value)}
            maxLength={20}
          ></TextInput>

          <View>
            <TextInput
              contextMenuHidden={true}
              style={[
                GlobalStyle.Input,
                {
                  borderWidth: 0,
                },
              ]}
              placeholder="Plate Number"
              value={plateNumber}
              onChangeText={(value) => validatePlate(value)}
              keyboardType="number-pad"
              maxLength={8}
              backgroundColor="transparent"
            ></TextInput>
            <Image
              source={require("../assets/plate.png")}
              style={GlobalStyle.Plate}
            ></Image>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => [
            GlobalStyle.Pressable,
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "orange",
            },
          ]}
          onPress={validateData}
        >
          <Text style={GlobalStyle.ButtonText}>Save and Continue</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
