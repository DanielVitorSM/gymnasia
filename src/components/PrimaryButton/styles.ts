import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: theme.colors.primary_light
    },
    button: {
        height: 50,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    disabled: {
        backgroundColor: theme.colors.gray_dark
    },
    text: {
        color: theme.colors.white
    }
});