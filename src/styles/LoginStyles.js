import { StyleSheet } from "react-native";
import { Colors } from "./GlobalStyle";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    alignItems: "center",
    height: "70%",
    gap: 150,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000",
    lineHeight: 46,
  },
  titleBrand: {
    fontSize: 42,
    fontWeight: "900",
    color: "#000",
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "400",
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
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.textDark,
  },
});
