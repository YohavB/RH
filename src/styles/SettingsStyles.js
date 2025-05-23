import { StyleSheet } from 'react-native';
import { Colors, Fonts } from './GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 40,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 127, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: Colors.mainOrange,
  },
  carIcon: {
    width: 24,
    height: 24,
    tintColor: Colors.mainOrange,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: '#000',
    marginBottom: 24,
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
  },
  addCarButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  addCarText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.mainOrange,
  },
}); 