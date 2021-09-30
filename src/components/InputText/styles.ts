import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10
    },
    content: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: theme.colors.gray_light
    },
    icon: {
        margin: 13,
        height: 24,
        width: 24,
        opacity: 0.7
    },
    input: {
        flex: 1
    },
    error: {
        color: theme.colors.red,
        borderColor: theme.colors.red
    },
    right: {
        paddingHorizontal: 13,
        alignItems: "center",
        justifyContent: "center"
    },
    border: {
        borderLeftColor: theme.colors.white,
        borderLeftWidth: 2
    }
});