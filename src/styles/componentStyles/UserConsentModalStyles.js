import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyle';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    height: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    padding: 24,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  termsText: {
    fontSize: 14,
    color: Colors.darkGray,
    lineHeight: 20,
    textAlign: 'justify',
    paddingBottom: 24,
  },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  acceptButton: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.mainOrange,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: Colors.mainOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.6,
  },
  acceptButtonTextDisabled: {
    color: Colors.mediumGray,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});