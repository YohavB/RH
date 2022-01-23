import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";

export default function Settings({ navigation }) {
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  useEffect(() => {
    getData();
    console.log("useEffect in Settings");
    console.log("name :" + { name } + " number :" + { plateNumber });
  }, []);

  const getData = () => {
    try {
      AsyncStorageLib.getItem("userInfo").then((value) => {
        if (value != null) {
          let userInfo = JSON.parse(value);
          console.log(userInfo);
          setName(userInfo.name);
          setPlateNumber(userInfo.plateNumber);
          console.log("setData from Settings");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      var userInfo = {
        name: name,
        plateNumber: plateNumber,
      };
      await AsyncStorageLib.mergeItem("userInfo", JSON.stringify(userInfo));
      console.log("updateData from Settings and -> Main");
      navigation.navigate("Main");
    } catch (error) {
      console.log(error);
    }
  };

  const removeDataAndLogout = async () => {
    try {
      await AsyncStorageLib.clear();
      console.log("clear data from settings and -> login");

      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const navToMain = () => {
    navigation.navigate("Main");
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView
        style={[
          GlobalStyle.MainContainer,
          {
            justifyContent: "space-around",
          },
        ]}
      >
        <Pressable style={GlobalStyle.Settings} onPress={navToMain}>
          <Image
            style={GlobalStyle.SettingButton}
            source={require("../assets/close.png")}
          />
        </Pressable>
        <Text style={GlobalStyle.Title}>Settings</Text>
        <View
          style={{
            justifyContent: "space-evenly",
            height: 200,
          }}
        >
          <TextInput
            style={GlobalStyle.Input}
            placeholder="New Name"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
          />
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
        <View
          style={{
            justifyContent: "space-evenly",
            height: 200,
          }}
        >
          <Pressable
            style={({ pressed }) => [
              GlobalStyle.Pressable,
              {
                backgroundColor: pressed ? "rgb(210, 230, 255)" : "orange",
              },
            ]}
            onPress={updateData}
          >
            <Text style={GlobalStyle.ButtonText}>Update And Continue</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              GlobalStyle.Pressable,
              {
                backgroundColor: pressed ? "rose" : "red",
              },
            ]}
            onPress={removeDataAndLogout}
          >
            <Text style={GlobalStyle.ButtonText}>Logout</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
