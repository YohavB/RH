import { StyleSheet } from 'react-native';
import { Colors, Fonts } from './GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
    borderWidth: 1,
    borderColor: "#FF0000", // Red
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#00FF00", // Green
  },
  backButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#0000FF", // Blue
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    borderWidth: 1,
    borderColor: "#FFFF00", // Yellow
  },
  contentContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF00FF", // Magenta
  },
  section: {
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#00FFFF", // Cyan
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 127, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#FFA500", // Orange
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.mainOrange,
    borderWidth: 1,
    borderColor: "#800080", // Purple
  },
  carIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.mainOrange,
    borderWidth: 1,
    borderColor: "#008000", // Dark Green
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#000',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FF4500", // OrangeRed
  },
  infoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#4B0082", // Indigo
  },
  addCarButton: {
    marginTop: 16,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#800000", // Maroon
  },
  addCarText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
    borderWidth: 1,
    borderColor: "#008080", // Teal
  },
}); 