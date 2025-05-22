import { StyleSheet } from "react-native";

// Define common colors and gradients for reuse
export const Colors = {
  orange: "#FF9E4E",
  pinkish: "#ED726B",
  white: "#FFFFFF",
  blue: "#2169B6",
  mainOrange: "#F5855F", // Main app color
  textDark: "#4f4f4f",
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
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
  },
}); 