import { StyleSheet } from 'react-native';
import { Fonts } from '../GlobalStyle';

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
}); 