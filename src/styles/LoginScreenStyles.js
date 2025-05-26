import { StyleSheet } from "react-native";
import { Colors, Fonts } from "./GlobalStyle";

export default StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 48,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 84,
    height: "70%",
  },
  headerContainer: {
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.medium,
    color: "#000",
    lineHeight: 46,
  },
  titleBrand: {
    fontSize: 42,
    fontFamily: Fonts.bold,
    color: "#000",
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    color: Colors.mainOrange,
    marginTop: 16,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "90%",
    padding: (11, 102, 11, 8),
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 20,
    height: 24,
    width: 24,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
});
