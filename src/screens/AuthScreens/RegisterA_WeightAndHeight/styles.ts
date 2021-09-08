import { theme } from '../../../global/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formContainer: {
        width: 300
    },
    title: {
        color: theme.colors.secondary_80,
        fontSize: 14,
        fontFamily: theme.fonts.text400,
        marginVertical: 20,
        textAlign: 'center'
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});