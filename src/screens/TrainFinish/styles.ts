import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    time: {
        color: theme.colors.white,
        fontSize: 70,
        fontFamily: theme.fonts.text700
    },
    info: {
        color: theme.colors.secondary_100,
        fontSize: 16,
        fontFamily: theme.fonts.text400,
        marginBottom: 5
    },
    title: {
        color: theme.colors.white,
        fontSize: 24,
        fontFamily: theme.fonts.text500,
        textAlign: "center",
        marginVertical: 30
    },
    green: {
        color: theme.colors.primary
    },
    card: {
        flexDirection: 'row',
        alignItems: "flex-end",

    },
    number: {
        fontSize: 30,
        color: theme.colors.secondary_100,
        marginRight: 8
    },
    share: {
        backgroundColor: theme.colors.tertiary,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 20,
        borderRadius: 50
    },
    text: {
        color: theme.colors.white,
        marginLeft: 5
    }
});