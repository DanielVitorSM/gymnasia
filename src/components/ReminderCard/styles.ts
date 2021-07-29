import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    content: {
        backgroundColor: theme.colors.secondary_50,
        width: '100%',
        padding: 20,
        justifyContent: "space-between",
        flexDirection: 'row',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
        borderRightWidth: 2,
        borderRightColor: '#F008',
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.text500,
        color: theme.colors.white,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 16,
        fontFamily: theme.fonts.text700,
        color: theme.colors.secondary_100
    },
    text: {
        fontSize: 12,
        fontFamily: theme.fonts.text400,
        color: theme.colors.secondary_70
    },
    button: {
        width: 100,
        height: '100%',
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: -10
    }
});