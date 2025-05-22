import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../styles/GlobalStyle";
import styles from "../styles/MainStyles";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";

export default function Main({ navigation }) {
  const [blocked, setBlocked] = useState(false);
  const [blockingSaved, setBlockingSaved] = useState(false);
  const [needToGo, setNeedToGo] = useState(false);
  const [blockedPlateNumber, setBlockedPlateNumber] = useState("");
  const [driverBlockingYou, setDriverBlockingYou] = useState("Dor");
  const [carBlockingYou, setCarBlockingYou] = useState("12345678");

  // Fix Redux selector and provide default values
  const userState = useSelector((state) => state.user) || {};
  const userName = userState.userInfo?.user?.name || "User";
  const carNumber = userState.userInfo?.carNumber || "12345678";

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
      <SafeAreaView style={styles.mainContainer}>
        <Pressable style={styles.settings} onPress={navToSettings}>
          <Image
            style={styles.settingButton}
            source={require("../../assets/images/settings.png")}
          />
        </Pressable>
        <View>
          <Text style={{ fontSize: 60, textAlign: "center" }}>Hi {userName} !</Text>
          <Text style={{ fontSize: 20, margin: 20, textAlign: "center" }}>
            Enter the Car's Plate Number that you're blocking. Plate :{" "}
            {blockedPlateNumber}, redux text {userName}, {carNumber}
          </Text>
        </View>
        <View style={styles.containerCars}>
          {/* FIRST PART */}
          <View style={styles.containerCar}>
            <View style={styles.containerCarPicture}>
              <Pressable>
                <Image
                  style={styles.car}
                  source={require("../../assets/images/grey-car.png")}
                />
              </Pressable>
              {blockingSaved ? (
                <View>
                  <TextInput
                    showSoftInputOnFocus={false}
                    editable={false}
                    style={{
                      borderWidth: 1,
                      width: 50,
                      height: 10,
                      textAlign: "center",
                      fontSize: 8,
                      fontWeight: "bold",
                      borderColor: "transparent",
                    }}
                    backgroundColor="transparent"
                    value={blockedPlateNumber}
                  ></TextInput>
                  <Image
                    source={require("../../assets/images/plate.png")}
                    style={styles.littlePlate}
                  ></Image>
                </View>
              ) : (
                <View></View>
              )}
            </View>
            {!blockingSaved ? (
              <View style={styles.containerActionMain}>
                <View>
                  <TextInput
                    contextMenuHidden={true}
                    style={[
                      {
                        borderWidth: 1,
                        padding: 10,
                        width: 300,
                        height: 50,
                        borderColor: "#555",
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        textAlign: "center",
                        fontSize: 20,
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
                    style={styles.plate}
                  ></Image>
                </View>

                <Pressable
                  style={styles.blockingButton}
                  onPress={validateBolckingCar}
                >
                  <Text>I'm blocking that Car</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.containerActionMain}>
                <Pressable
                  style={styles.blockingButton}
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
          <View style={styles.containerCar}>
            <View style={styles.containerCarPicture}>
              <Pressable>
                <Image
                  style={styles.car}
                  source={require("../../assets/images/red-car.png")}
                />
              </Pressable>
              <View>
                <TextInput
                  showSoftInputOnFocus={false}
                  editable={false}
                  style={styles.inputLittlePlate}
                  backgroundColor="transparent"
                  value={carNumber}
                ></TextInput>
                <Image
                  source={require("../../assets/images/plate.png")}
                  style={styles.littlePlate}
                ></Image>
              </View>
            </View>

            <View style={styles.containerActionMain}>
              <TextInput
                showSoftInputOnFocus={false}
                editable={false}
                style={styles.input}
                backgroundColor="transparent"
                value={carNumber}
              ></TextInput>
              <Image
                source={require("../../assets/images/plate.png")}
                style={styles.plate}
              ></Image>
            </View>
          </View>
          {/* THIRD PART */}
          <View style={styles.containerCar}>
            <View
              style={[
                styles.containerCarPicture,
                { paddingBottom: "20%" },
              ]}
            >
              {blocked ? (
                <Pressable onPress={INeedToGo}>
                  <Image
                    style={styles.car}
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
                  styles.containerActionMain,
                  { paddingBottom: "30%" },
                ]}
              >
                <Text style={styles.text}>
                  Seems Like {driverBlockingYou} ({carBlockingYou}) is blocking
                  you !
                </Text>
                <Pressable
                  style={[
                    styles.input,
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
                  styles.containerActionMain,
                  { paddingBottom: "30%" },
                ]}
              >
                <Text style={styles.text}>
                  Seems like anyone is blocking you !
                </Text>
                <Text style={styles.text}>You're free to go !</Text>
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
