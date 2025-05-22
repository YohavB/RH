import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";

export default function Main({ navigation }) {
  const [blocked, setBlocked] = useState(false);
  const [blockingSaved, setBlockingSaved] = useState(false);
  const [needToGo, setNeedToGo] = useState(false);
  const [blockedPlateNumber, setBlockedPlateNumber] = useState("");
  const [driverBlockingYou, setDriverBlockingYou] = useState("Dor");
  const [carBlockingYou, setCarBlockingYou] = useState("12345678");

  const { userName, carNumber } = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log("useEffect in Main");
  }, []);

  const validateBolckingCar = () => {
    setBlockingSaved(!blockingSaved);
  };

  const navToSettings = () => {
    console.log("SETINNG");
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
            source={require("../../assets/images/settings.png")}
          />
        </Pressable>
        <View>
          <Text style={GlobalStyle.Title}>Hi {userName} !</Text>
          <Text style={GlobalStyle.Text}>
            Enter the Car's Plate Number that you're blocking. Plate :{" "}
            {blockedPlateNumber}, redux text {userName}, {carNumber}
          </Text>
        </View>
        <View style={GlobalStyle.ContainerCars}>
          {/* FIRST PART */}
          <View style={GlobalStyle.ContainerCar}>
            <View style={GlobalStyle.ContainerCarPicture}>
              <Pressable>
                <Image
                  style={GlobalStyle.Car}
                  source={require("../../assets/images/grey-car.png")}
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
                    source={require("../../assets/images/plate.png")}
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
                    source={require("../../assets/images/plate.png")}
                    style={GlobalStyle.Plate}
                  ></Image>
                </View>

                <Pressable
                  style={GlobalStyle.BlockingButton}
                  onPress={validateBolckingCar}
                >
                  <Text>I'm blocking that Car</Text>
                </Pressable>
              </View>
            ) : (
              <View style={GlobalStyle.ContainerActionMain}>
                <Pressable
                  style={GlobalStyle.BlockingButton}
                  onPress={validateBolckingCar}
                >
                  <Text style={{ textAlign: "center" }}>
                    Inform the driver that you are going
                  </Text>
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
                  source={require("../../assets/images/red-car.png")}
                />
              </Pressable>
              <View>
                <TextInput
                  showSoftInputOnFocus={false}
                  editable={false}
                  style={GlobalStyle.InputLittlePlate}
                  backgroundColor="transparent"
                  value={carNumber}
                ></TextInput>
                <Image
                  source={require("../../assets/images/plate.png")}
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
                value={carNumber}
              ></TextInput>
              <Image
                source={require("../../assets/images/plate.png")}
                style={GlobalStyle.Plate}
              ></Image>
            </View>
          </View>
          {/* THIRD PART */}
          <View style={GlobalStyle.ContainerCar}>
            <View
              style={[
                GlobalStyle.ContainerCarPicture,
                { paddingBottom: "20%" },
              ]}
            >
              {blocked ? (
                <Pressable onPress={INeedToGo}>
                  <Image
                    style={GlobalStyle.Car}
                    source={require("../../assets/images/grey-car.png")}
                  />
                </Pressable>
              ) : (
                <View></View>
              )}
            </View>
            {blocked ? (
              <View
                style={[
                  GlobalStyle.ContainerActionMain,
                  { paddingBottom: "30%" },
                ]}
              >
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
              <View
                style={[
                  GlobalStyle.ContainerActionMain,
                  { paddingBottom: "30%" },
                ]}
              >
                <Text style={GlobalStyle.Text}>
                  Seems like anyone is blocking you !
                </Text>
                <Text style={GlobalStyle.Text}>You're free to go !</Text>
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
