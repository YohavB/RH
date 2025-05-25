import { StyleSheet } from "react-native";
import { Colors, Fonts } from "./GlobalStyle";

export default StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 48,
    flexDirection: "column",
    justifyContent: "center",
    height: "70%",
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: "#000",
    marginBottom: 4,
    flexDirection: "row",
  },
  brandText: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.mainOrange,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: "#000",
    marginBottom: 60,
  },
  cameraButtonContainer: {
    alignSelf: "center",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  countryPicker: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
    borderRadius: 8,
  },
  inputFocused: {
    borderColor: Colors.mainOrange,
    borderWidth: 1,
  },
  submitButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    backgroundColor: Colors.mainOrange,
    display: "flex",
    width: 235,
    padding: 10,
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
    borderColor: Colors.mainOrange,
  },
  submitButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.white,
  },
  submitButtonTextDisabled: {
    color: Colors.white,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
});
