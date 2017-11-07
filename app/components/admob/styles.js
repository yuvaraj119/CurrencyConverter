import EStyleSheet from 'react-native-extended-stylesheet';
import { Platform } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    alignItems: 'center',
  },
    title:{
      color: '$primaryBlue',
    }
});

export default styles;
