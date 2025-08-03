import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../GlobalStyle";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 8,
    zIndex: 1,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 127, 80, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.mainOrange,
  },
  carIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.mainOrange,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: "#000",
    marginBottom: 24,
  },
  noCarsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  noCarsText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textLight,
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  googleButton: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: Colors.mainOrange,
    textColor: Colors.white,
    marginTop: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addCarButton: {
    borderRadius: 16,
    padding: 10,
    backgroundColor: Colors.mainOrange,
    textColor: Colors.white,
    marginTop: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addCarText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
});
