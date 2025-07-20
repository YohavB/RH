import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../GlobalStyle';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.textBlack,
    marginBottom: 24,
    textAlign: 'center',
  },
  okButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    width: '50%',
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.white,
  }
}); 