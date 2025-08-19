import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyle';
import { Fonts } from '../GlobalStyle';

export default StyleSheet.create({
  selector: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1
  },
  selectorText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.mainOrange,
    marginBottom: 16,
    textAlign: 'center',
  },
  carList: {
    width: '80%',
    maxHeight: '80%',
  },
  carInfoContainer: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12,
    backgroundColor: Colors.white,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
    position: "relative",
  },
  carIconContainer: {
    position: "absolute",
    left: 0,
  },
  carDetails: {
    width: "80%",
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.darkGray,
    textAlign: "center",
  },
  carSelector: {
    marginBottom: 16,
  },
  cancelButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.mainOrange,
  },
}); 