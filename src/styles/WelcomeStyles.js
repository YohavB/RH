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
  },
  input: {
    width: "100%",
    height: 40,
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
    // You can add specific text styling for disabled state if needed
  },
});
