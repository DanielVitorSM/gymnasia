import { theme } from './../../global/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 90,
        marginHorizontal: 40
    },
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