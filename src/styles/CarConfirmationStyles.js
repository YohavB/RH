import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "./GlobalStyle";

const { width } = Dimensions.get("window");

// Styles for the Car Confirmation Screen
export default StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.darkGray,
  },
  errorContainer: {
    flex: 1,
    padding: 24,
  },
  errorText: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: "center",
  },
  headerContainer: {
    width: "90%",
  },
  headerText: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: "#000",
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 21,
    fontFamily: Fonts.semiBold,
    color: "#000",
    marginBottom: 24,
  },
  cardContainer: {
    position: "absolute",
    top: "25%",
    width: "80%",
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
    padding: 10,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#F1F3F5",
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textBlack,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textBlack,
    textAlign: "right",
  },
  buttonsContainer: {
    width: "100%",
    marginTop: "auto",
  },
  blockingButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap:15,
  },
  actionButton: {
    width: "80%",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  blockedByButton: {
    backgroundColor: Colors.mainOrange,
  },
  blockingButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  blockingButtonText: {
    color: Colors.mainOrange,
  },
  saveButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 50,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.mainOrange,
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.mainOrange,
  },
  confirmButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    minWidth: 120,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.mainOrange,
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  carSelector: {
    marginBottom: 16,
  },
});
