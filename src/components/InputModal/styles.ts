import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        backgroundColor: theme.colors.black_transparent,
        flex: 1,
    },
    align: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        paddingVertical: 30
    },
    label: {
        fontSize: 16,
        fontFamily: theme.fonts.text700,
        textAlign: "center"
    },
    input: {
        width: 250,
        borderColor: theme.colors.secondary_100,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
        marginVertical: 5
    },
    select: {
        width: 250,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
        marginVertical: 20,
        height: 20,
    },
    button: {
        backgroundColor: '#3EB489',
        padding: 10,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5
    },
    text: {
        fontFamily: theme.fonts.text400,
        fontSize: 14
    },
    active: {
        borderColor: 'purple'
    },
    error: {
        borderColor: 'red'
    },
    errorLabel: {
        fontSize: 10,
        marginLeft: 5,
        color: 'red',
        marginBottom: 5
    }
});