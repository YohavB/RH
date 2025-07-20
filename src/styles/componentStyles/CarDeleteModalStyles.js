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
    position: "relative",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    marginBottom: 24,
  },
  modalTitleLastCar: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.mainOrange,
    marginBottom: 10,
  },
  carPreview: {
    borderRadius: 12,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
    marginBottom: 24,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  previewLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textLight,
  },
  previewValue: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
  },
  deleteButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    width: "45%",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.white,
  },
});
