import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Pressable, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../styles/GlobalStyle";
import styles from "../styles/SettingsStyles";
import KeyboardAvoidingWrapper from "../../utils/KeyboardAvoidingWrapper";

import { useSelector, useDispatch } from "react-redux";
import { setUserName, setCarNumber, logout } from "../redux/actions";

export default function Settings({ navigation }) {
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const { userName, carNumber } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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
          dispatch(setUserName(userInfo.name));
          dispatch(setCarNumber(userInfo.plateNumber));
          console.log("setData from Settings");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const validatePlate = (value) => {
    value = value.replace(/[^0-9]/g, "");
    setPlateNumber(value);
  };

  const updateData = async () => {
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
        console.log("setData from Settings and -> Main");
        dispatch(setUserName(name));
        dispatch(setCarNumber(plateNumber));
        //postToDB
        navigation.replace("Main");
      } catch (error) {
        console.log(error);
        Alert.alert("*Horn Noise*", "It seems something goes wrong");
      }
    }
  };

  const removeDataAndLogout = async () => {
    try {
      await AsyncStorageLib.clear();
      dispatch(logout);
      console.log("clear data from settings and -> login");

      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const navToMain = () => {
    navigation.navigate("Main");
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={{ width: "100%", height: "100%", backgroundColor: "#2169B6", alignItems: "center", justifyContent: "center", alignContent: "center" }}>
        <Pressable style={{ zIndex: 2, position: "absolute", left: "88%", top: "5%", width: 50 }} onPress={navToMain}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/images/close.png")}
          />
        </Pressable>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styles.title}>Settings</Text>
          <View
            style={{
              justifyContent: "space-evenly",
              height: 200,
            }}
          >
            <TextInput
              autoCapitalize="words"
              autoCorrect={false}
              style={{
                borderWidth: 1,
                padding: 10,
                width: 300,
                height: 50,
                borderColor: "#555",
                backgroundColor: "#fff",
                borderRadius: 10,
                textAlign: "center",
                fontSize: 20,
              }}
              value={userName}
              placeholder="New Name"
              onChangeText={(value) => setName(value)}
              maxLength={20}
            />
            <View>
              <TextInput
                contextMenuHidden={true}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  width: 300,
                  height: 50,
                  borderColor: "#555",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 20,
                  borderWidth: 0,
                }}
                placeholder="Plate Number"
                value={carNumber}
                onChangeText={(value) => validatePlate(value)}
                keyboardType="number-pad"
                maxLength={8}
                backgroundColor="transparent"
              ></TextInput>
              <Image
                source={require("../../assets/images/plate.png")}
                style={{
                  position: "absolute",
                  zIndex: -1,
                  width: 300,
                  height: 50,
                }}
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
                styles.pressable,
                {
                  backgroundColor: pressed ? "rgb(210, 230, 255)" : "orange",
                },
              ]}
              onPress={updateData}
            >
              <Text style={styles.buttonText}>Update And Continue</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.pressable,
                {
                  backgroundColor: pressed ? "rose" : "red",
                },
              ]}
              onPress={removeDataAndLogout}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
