import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const sizes = {
    screen: {
        width,
        height
    }
}