import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";

import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const postAndStore = () => {
    validateData();
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

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={GlobalStyle.MainContainer}>
        <View style={[GlobalStyle.Container, { flex: "space-between" }]}>
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
              autoCapitalize="none"
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
                onChangeText={(value) => setPlateNumber(value)}
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
            onPress={postAndStore}
          >
            <Text style={GlobalStyle.ButtonText}>Save and Continue</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
