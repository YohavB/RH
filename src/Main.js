import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";

export default function Main({ navigation }) {
  const [blocked, setBlocked] = useState(false);
  const [blockingSaved, setBlockingSaved] = useState(false);
  const [needToGo, setNeedToGo] = useState(false);
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [blockedPlateNumber, setBlockedPlateNumber] = useState("");
  const [driverBlockingYou, setDriverBlockingYou] = useState("Dor");
  const [carBlockingYou, setCarBlockingYou] = useState("12345678");

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

  const validateBolckingCar = () => {
    setBlockingSaved(!blockingSaved);
  };

  const navToSettings = () => {
    navigation.navigate("Settings");
  };

  const validatePlate = (value) => {
    value = value.replace(/[^0-9]/g, "");
    setBlockedPlateNumber(value);
  };

  const blockingCar = () => {
    console.log("enter the plate");
  };
  const testblocked = () => {
    setBlocked(!blocked);
  };
  const INeedToGo = () => {
    Alert.alert(
      "Ok, You need to go !",
      " We just notify the blocking car's driver !"
    );
    console.log("push notification to blocking car");
    setNeedToGo(true);
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={GlobalStyle.MainContainer}>
        <Pressable style={GlobalStyle.Settings} onPress={navToSettings}>
          <Image
            style={GlobalStyle.SettingButton}
            source={require("../assets/settings.png")}
          />
        </Pressable>
        <View>
          <Text style={GlobalStyle.Title}>Hi {name} !</Text>
          <Text style={GlobalStyle.Text}>
            Enter the Car's Plate Number that you're blocking. Plate :{" "}
            {blockedPlateNumber}
          </Text>
        </View>
        <View style={GlobalStyle.ContainerCars}>
          {/* FIRST PART */}
          <View style={GlobalStyle.ContainerCar}>
            <View style={GlobalStyle.ContainerCarPicture}>
              <Pressable>
                <Image
                  style={GlobalStyle.Car}
                  source={require("../assets/grey-car.png")}
                />
              </Pressable>
              {blockingSaved ? (
                <View>
                  <TextInput
                    showSoftInputOnFocus={false}
                    editable={false}
                    style={GlobalStyle.InputLittlePlate}
                    backgroundColor="transparent"
                    value={blockedPlateNumber}
                  ></TextInput>
                  <Image
                    source={require("../assets/plate.png")}
                    style={GlobalStyle.LittlePlate}
                  ></Image>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            {!blockingSaved ? (
              <View style={GlobalStyle.ContainerActionMain}>
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
                    value={blockedPlateNumber}
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

                <Pressable
                  style={GlobalStyle.BlockingButton}
                  onPress={validateBolckingCar}
                >
                  <Text>I'm blocking this Car</Text>
                </Pressable>
              </View>
            ) : (
              <View style={GlobalStyle.ContainerActionMain}>
                <Pressable
                  style={GlobalStyle.BlockingButton}
                  onPress={validateBolckingCar}
                >
                  <Text>Inform the driver that you are going</Text>
                </Pressable>
              </View>
            )}
          </View>
          {/* SECOND PART */}
          <View style={GlobalStyle.ContainerCar}>
            <View style={GlobalStyle.ContainerCarPicture}>
              <Pressable>
                <Image
                  style={GlobalStyle.Car}
                  source={require("../assets/red-car.png")}
                />
              </Pressable>
              <View>
                <TextInput
                  showSoftInputOnFocus={false}
                  editable={false}
                  style={GlobalStyle.InputLittlePlate}
                  backgroundColor="transparent"
                  value={plateNumber}
                ></TextInput>
                <Image
                  source={require("../assets/plate.png")}
                  style={GlobalStyle.LittlePlate}
                ></Image>
              </View>
            </View>

            <View style={GlobalStyle.ContainerActionMain}>
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
          {/* THIRD PART */}
          <View style={GlobalStyle.ContainerCar}>
            {blocked ? (
              <View style={GlobalStyle.ContainerActionMain}>
                {/* <Pressable onPress={INeedToGo}>
                  <Image
                    style={GlobalStyle.Car}
                    source={require("../assets/grey-car.png")}
                  />
                </Pressable> */}

                <Text style={GlobalStyle.Text}>
                  Seems Like {driverBlockingYou} ({carBlockingYou}) is blocking
                  you !
                </Text>
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
                <Text style={GlobalStyle.Text}>
                  Seems like anyone is blocking you, you free to go !
                </Text>
              </View>
            )}
          </View>
          <Pressable
            style={{
              position: "absolute",
              left: "85%",
              bottom: "0%",
              width: 40,
              height: 40,
              backgroundColor: "white",
            }}
            onPress={testblocked}
          >
            <Text>TEST</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
