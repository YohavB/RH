import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";

export default function Main({ navigation }) {
  const [blocked, setBlocked] = useState(true);
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  useEffect(() => {
    getData();
    console.log("useEffect in Main");
  }, []);

  const getData = () => {
    try {
      AsyncStorageLib.getItem("userInfo").then((value) => {
        if (value != null) {
          console.log("getData from Main");
          let userInfo = JSON.parse(value);
          setName(userInfo.name);
          setPlateNumber(userInfo.plateNumber);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navToSettings = () => {
    navigation.navigate("Settings");
  };

  const blockingCar = () => {
    console.log("enter the plate");
  };
  const IMoved = () => {
    console.log("you moved");
  };
  const INeedToGo = () => {
    Alert.alert(
      "Ok, You need to go !",
      " We just notify the blocking car's driver !"
    );
    console.log("push notification to blocking car");
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={GlobalStyle.MainContainer}>
        <View style={GlobalStyle.Container}>
          <Pressable style={GlobalStyle.Settings} onPress={navToSettings}>
            <Image
              style={GlobalStyle.SettingButton}
              source={require("../assets/settings.png")}
            />
          </Pressable>
          <Text style={GlobalStyle.Title}>Hi {name} !</Text>
          <Text style={GlobalStyle.Text}>
            Enter the Car's Plate Number that you're blocking.
          </Text>
          <View style={GlobalStyle.ContainerCars}>
            <View style={GlobalStyle.ContainerCar}>
              <Pressable onPress={blockingCar}>
                <Image
                  style={GlobalStyle.Car}
                  source={require("../assets/grey-car.png")}
                />
              </Pressable>
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
                  //onChangeText={(value) => setPlateNumber(value)}
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
            <View style={GlobalStyle.ContainerCar}>
              <Pressable onPress={IMoved}>
                <Image
                  style={GlobalStyle.Car}
                  source={require("../assets/red-car.png")}
                />
              </Pressable>
              <View>
                <TextInput
                  showSoftInputOnFocus={false}
                  editable={false}
                  style={[
                    GlobalStyle.Input,
                    {
                      borderWidth: 0,
                    },
                  ]}
                  backgroundColor="transparent"
                  value={plateNumber}
                ></TextInput>
                <Image
                  source={require("../assets/plate.png")}
                  style={GlobalStyle.Plate}
                ></Image>
              </View>
            </View>
            {blocked ? (
              <View style={GlobalStyle.ContainerCar}>
                <Pressable onPress={INeedToGo}>
                  <Image
                    style={GlobalStyle.Car}
                    source={require("../assets/grey-car.png")}
                  />
                </Pressable>
                <Pressable
                  style={[
                    GlobalStyle.Input,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                  onPress={INeedToGo}
                >
                  <Text style={{ fontSize: 20 }}>
                    Notify the Driver, I Need To Go!
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={GlobalStyle.ContainerCar}>
                <Text>Seems like anyone is blocking you, you free to go !</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
