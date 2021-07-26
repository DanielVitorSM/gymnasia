import { theme } from '../../global/styles/theme';
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
        width: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: theme.colors.secondary_80,
        fontSize: 14,
        fontFamily: theme.fonts.text400,
        marginBottom: 10,
        marginTop: 30,
        textAlign: 'center'
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navButtons: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        width: 300
    }
});