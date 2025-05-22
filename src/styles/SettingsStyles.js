import { StyleSheet } from 'react-native';
import { Colors } from './GlobalStyle';

export default StyleSheet.create({
  // Add specific Settings screen styles here
  title: { 
    fontSize: 60, 
    textAlign: "center" 
  },
  text: {
    fontSize: 20,
    margin: 20,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 25,
  },
  pressable: {
    backgroundColor: "#fff",
    width: 250,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
}); 