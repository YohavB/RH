import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../GlobalStyle';

export default StyleSheet.create({
  container: {
    width: 60,
    height: 50,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: "100%",
  },
  flagText: {
    fontSize: 22,
    textAlign: "center",
  },
  codeText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    marginBottom: 16,
    textAlign: "center",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryCode: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  countryName: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: "#666",
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.mainOrange,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: Colors.mainOrange,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontFamily: Fonts.medium,
    fontSize: 16,
  },
}); 