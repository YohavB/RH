import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import GlobalStyle from "../utils/GlobalStyle";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    getData();
    console.log("useEffect in SplashScreen");
  }, []);

  const getData = () => {
    try {
      AsyncStorageLib.getItem("userInfo").then((value) => {
        if (value != null) {
          console.log("getData from SplashScreen -> Main");
          navigation.replace("Main");
        } else {
          console.log("No Data found from SplashScreen -> Login");
          navigation.replace("Login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.MainContainer}>
      <Image
        source={require("../assets/RH.png")}
        style={{ width: "100%", height: "60%" }}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;
