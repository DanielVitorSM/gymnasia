import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
        zIndex: -1
    }
})