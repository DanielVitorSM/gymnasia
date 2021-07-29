import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.colors.black_transparent
    },
    content: {
        backgroundColor: 'white',
        width: "70%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 20
    },
    title: {
        fontSize: 16,
        marginLeft: 6,
        marginBottom: 10,
        fontFamily: theme.fonts.text700
    },
    check: {
        flexDirection: 'row',
        alignItems: "center"
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    button: {
        padding: 5,
    },
    text: {
        fontFamily: theme.fonts.text500,
        textTransform: 'uppercase',
        color: theme.colors.tertiary
    }
})