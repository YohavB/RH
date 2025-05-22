import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "./GlobalStyle";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Camera background is black
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.medium,
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    // Semi-transparent dark overlay to make text readable
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingTop: 80, // Account for status bar
  },
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.bold,
    textAlign: "center",
    marginTop: 50,
  },
  bracketContainer: {
    width: width * 0.8,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bracket: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    // Semi-transparent white to show what's underneath
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden', // For scan line
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  detectedContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  detectedText: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: Fonts.bold,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: 'center',
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.medium,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 8,
  },
  processingText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.medium,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    gap: 20,
    marginBottom: 40,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 120,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  useButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.mainOrange,
    minWidth: 120,
    alignItems: "center",
  },
  useButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  disabledButton: {
    opacity: 0.6,
  },
}); 