import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.textBlack,
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textDark,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    flex: 1,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
  secondaryButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    flex: 1,
    alignItems: "center",
    marginRight: 12,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
  },
});

