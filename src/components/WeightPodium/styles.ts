import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    rank: {
        justifyContent: "center",
        marginHorizontal: 20
    },
    label: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text400,
        fontSize: 10,
        textAlign: "center",
    },
    number: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        fontSize: 20,
        textAlign: "center",
    },
    bigLabel: {
        fontSize: 14,
    },
    bigNumber: {
        fontSize: 24,
    },
});