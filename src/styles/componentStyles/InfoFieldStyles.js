import { StyleSheet } from 'react-native';
import { Fonts } from '../GlobalStyle';

export default StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#A0A0A0',
  },
  value: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: '#000',
  },
}); 