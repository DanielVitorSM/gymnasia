import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    blue: {
        color: theme.colors.tertiary
    },
    signup: {
        marginTop: 20,
        textAlign: "center"
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: theme.colors.white_transparent,
        borderRadius: 10,
        color: theme.colors.white,
        paddingHorizontal: 15,
        fontSize: 14,
        fontFamily: theme.fonts.text500
    }
});