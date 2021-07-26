import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.secondary_50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 30
    },
    title: {
        color: theme.colors.secondary_100,
        marginLeft: 5,
        fontSize: 14,
        fontWeight: "700",
        textTransform: "capitalize"
    },
    text: {
        textAlign: 'right',
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '500'
    }
});