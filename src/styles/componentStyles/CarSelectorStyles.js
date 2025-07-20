import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyle';
import { Fonts } from '../GlobalStyle';

export default StyleSheet.create({
  selector: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.pinkish,
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
  carItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  plateNumber: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.darkGray,
  },
  carDetails: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.gray,
    marginTop: 4,
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