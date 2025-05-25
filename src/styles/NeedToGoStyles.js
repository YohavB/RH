import { StyleSheet } from 'react-native';
import { Colors, Fonts } from './GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "#FF0000", // Red
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#00FF00", // Green
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#0000FF", // Blue
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 300,
    height: 50,
    borderColor: "#555",
    backgroundColor: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#FFFF00", // Yellow
  }
}); 