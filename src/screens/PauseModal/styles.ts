import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0EFF00CF",
        flex: 1,
        alignItems: "center",
        paddingTop: 150
    },
    title: {
        fontSize: 32,
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        marginBottom: 20
    },
    button: {
        width: '70%',
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 7,
        borderRadius: 100
    },
    text: {
        fontSize: 14,
        fontFamily: theme.fonts.text500
    }
});