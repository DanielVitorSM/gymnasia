import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 10,
        marginVertical: 10
    },
    left: {
        flexDirection: 'row',
        alignItems: "center"
    },
    title: {
        marginHorizontal: 10,
        fontSize: 16,
        color: theme.colors.white,
        fontFamily: theme.fonts.text700
    },
    button: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    }
});