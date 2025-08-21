/** @format */

import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  bracketContainer: {
    marginTop: "50%",
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  bracketText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.medium,
    textAlign: "center",
    marginBottom: 20,
  },
  bracket: {
    width: "100%",
    height: 92,
    borderRadius: 20,
    // Semi-transparent white to show what's underneath
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden", // For scan line
  },
  scanLine: {
    position: "absolute",
    height: 2,
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  detectedContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    minWidth: width * 0.7,
  },
  detectedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  detectedText: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: Fonts.bold,
    letterSpacing: 2,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: "center",
    flex: 1,
    marginLeft: 5,
  },
  countryPicker: {
    height: 45,
    width: 55,
    marginRight: 10,
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  loadingText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.medium,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginLeft: 10,
  },
  processingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  processingText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.medium,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 50,
    marginBottom: 80,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 120,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  useButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    minWidth: 120,
    alignItems: "center",
  },
  useButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  disabledButton: {
    opacity: 0.6,
  },
  countryText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.medium,
    textAlign: "center",
    marginTop: 10,
  },
});
