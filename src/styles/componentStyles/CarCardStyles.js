import { StyleSheet } from "react-native";
import { Fonts, Colors } from "../GlobalStyle";

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    overflow: "visible",
  },
  detailsContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 40,
    paddingRight: 50,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textLight,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: "#000",
  },
  optionsContainer: {
    position: "absolute",
    top: 6,
    right: 2,
    zIndex: 1000,
  },
  optionsButton: {},
  optionsIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.mainOrange,
    transform: [{ rotate: "90deg" }],
  },
});
