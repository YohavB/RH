import { StyleSheet } from "react-native";

// Define common colors and gradients for reuse
export const Colors = {
  orange: "#FF9E4E",
  pinkish: "#ED726B",
  white: "#FFFFFF",
  blue: "#2169B6",
  mainOrange: "#F5855F", // Main app color
  textDark: "#4f4f4f",
  background: "#FFFFFF", // Background color for the entire app
  inputBackground:"#F1F3F5",
};

// Define font families
export const Fonts = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

export const Gradients = {
  orangeToPink: {
    colors: [Colors.orange, Colors.pinkish],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1.09 },
  },
};

// Common styles shared across multiple components
export default StyleSheet.create({
  // Button styles
  button: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  
  // Text styles
  h1: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
  },
  h2: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textDark,
  },
  h3: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
    color: Colors.textDark,
  },
  body: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textDark,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textDark,
  },
  
  // Layout styles
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Input styles
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#555",
    backgroundColor: Colors.white,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: Fonts.regular,
  },
  
  // Global container style - use this for root containers
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Screen container - use this for individual screens
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
}); 