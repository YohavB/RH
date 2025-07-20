import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    marginTop: 20,
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
    marginBottom: 20,
    alignItems: "center",
  },
  inputContainer: {
    paddingHorizontal: 20,
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
  cancelButton: {
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    backgroundColor: Colors.white,
    width: 150,
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.mainOrange,
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
