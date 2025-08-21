/** @format */

import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "black", // Camera background is black
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
    marginBottom: 16,
  },
});
