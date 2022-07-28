import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Text, TextInput, View, Pressable, Image } from "react-native";

import { useDispatch } from "react-redux";
import { setUserName, setCarNumber } from "./redux/action";

import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyle from "../utils/GlobalStyle";
import KeyboardAvoidingWrapper from "../utils/KeyboardAvoidingWrapper";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const Login = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState("empty");
  const [name, setName] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  const dispatch = useDispatch();

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
        console.log("setData from Login and -> Main");
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

  const postToDB = () => {
    //post to databases
  };

  const signInWithGoogle = async () => {
    console.log("Loggin with Google");
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("Sign in Cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("Sign in already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("Play service is not available");
      } else {
        // some other error happened
        console.log(error.message);
      }
    }
  };

  const printUser = () => {
    console.log("PrintingUserInfo");
    console.log(userInfo);
  };

  const signOut = async () => {
    console.log("Sign Out");
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView
        style={[GlobalStyle.MainContainer, { justifyContent: "flex-start" }]}
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
              source={require("../assets/images/plate.png")}
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
          onPress={signInWithGoogle}
        >
          <Text style={GlobalStyle.ButtonText}>Signout</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            GlobalStyle.Pressable,
            {
              backgroundColor: pressed ? "rgb(210, 230, 255)" : "orange",
            },
          ]}
          onPress={printUser}
        >
          <Text style={GlobalStyle.ButtonText}>Print user info</Text>
        </Pressable>

        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
          disabled={isSigninInProgress}
        />
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;

// userInfoClass
// {
//   idToken: string,
//   serverAuthCode: string,
//   scopes: Array<string>, // on iOS this is empty array if no additional scopes are defined
//   user: {
//     email: string,
//     id: string,
//     givenName: string,
//     familyName: string,
//     photo: string, // url
//     name: string // full name
//   }
// }
