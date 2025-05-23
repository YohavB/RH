import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "./GlobalStyle";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: "#000",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 28,
    fontFamily: Fonts.semiBold,
    color: "#000",
    marginBottom: 24,
  },
  cardContainer: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
    marginBottom: 32,
  },
  carImageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  carImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: "#000",
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: "#000",
    textAlign: "right",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  addCarButton: {
    padding: 10,
  },
  addCarText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
  },
  okButton: {
    backgroundColor: Colors.mainOrange,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  okButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
}); 