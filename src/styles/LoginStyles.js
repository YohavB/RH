import { StyleSheet } from 'react-native';
import { Colors } from './GlobalStyle';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    display: 'flex',
    width: 375,
    padding: 0,
    paddingHorizontal: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 84,
  },
  headerContainer: {
    marginBottom: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    lineHeight: 46,
  },
  titleBrand: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000',
    lineHeight: 50,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '400',
    color: Colors.mainOrange,
    marginTop: 16,
  },
  googleButton: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textDark,
  },
}); 