import { StyleSheet } from 'react-native';
import { Colors, Fonts } from './GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    zIndex: 1,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
  nameText: {
    fontSize: 32,
    fontFamily: Fonts.semiBold,
    color: Colors.text,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  cameraButtonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
  },
}); 