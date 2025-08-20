import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 5,
    minHeight: '100%',
  },
  profileButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
  },
  nameText: {
    fontSize: 32,
    fontFamily: Fonts.semiBold,
    color: Colors.mainOrange  ,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 20, // Reduced from 40 to match scrollViewContent
    width: '100%',
  },
  instructionText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textDark,
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
  submitButton: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainOrange,
    backgroundColor: Colors.mainOrange,
    display: "flex",
    width: 235,
    padding: 10,
    paddingHorizontal: 16,
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
    borderColor: Colors.mainOrange,
  },
  submitButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.white,
  },
  submitButtonTextDisabled: {
    color: Colors.white,
  },
  noCarText: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  goToSettingsButton: {
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  goToSettingsButtonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.white,
  },
  userCarsRelationsContainer: {
    width: '100%',
    marginTop: 20,
  },
}); 