import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  titleSize: {
    fontSize: width * 0.032,
  },
  littleLargeTitleSize: {
    fontSize: width * 0.04,
  },
  largeTitleSize: {
    fontSize: width * 0.05,
  },
  extraLargeTitleSize: {
    fontSize: width * 0.06,
  },
  descSize: {
    fontSize: width * 0.03,
  },

  iconSize: {
    fontSize: width * 0.045,
  },
  iconText: {
    fontSize: width * 0.03,
  },
  textSize: {
    fontSize: width * 0.02,
  },
});
