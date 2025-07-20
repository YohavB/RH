import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

export default StyleSheet.create({
  optionsMenu: {
    position: "absolute",
    top: 28,
    right: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3,
    minWidth: 140,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionItem: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  optionBottomBorder: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 1,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
  },
  optionItemHovered: {
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    transform: [{ scale: 1.02 }],
  },
  optionText: {
    fontSize: 15,
    fontFamily: Fonts.medium,
    textAlign: 'center',
  },
}); 