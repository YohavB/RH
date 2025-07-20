import { StyleSheet } from 'react-native';
import { Colors } from '../GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  bottomRow: {
    alignSelf: "flex-end",
  },
  rectangle: {
    width: 26,
    height: 37,
    flexShrink: 0,
    backgroundColor: "white",
    borderRadius: 4,
  },
}); 