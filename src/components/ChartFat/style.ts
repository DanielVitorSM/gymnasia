import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: "center",
        justifyContent: "space-around",
    },
    label: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text400,
        fontSize: 12,
        marginTop: 5
    },
    number: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text700,
        fontSize: 24
    },
    chart: {
        width: 120
    }
});