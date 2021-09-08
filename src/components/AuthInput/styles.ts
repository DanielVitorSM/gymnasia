import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        backgroundColor: theme.colors.white_transparent,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: theme.colors.white_transparent,
        flexDirection: 'row',
        alignItems: "center",
        paddingLeft: 15
    },
    input: {
        color: theme.colors.white,
        fontSize: 14,
        fontFamily: theme.fonts.text500,
        flex: 1,
        height: 50
    },
    icon: {
        width: 50,
        height: 50,
        textAlign: "center",
        textAlignVertical: 'center'
    },
    focus: {
        borderColor: theme.colors.secondary_100
    },
    error: {
        borderColor: 'red',
        color: 'red'
    }
});