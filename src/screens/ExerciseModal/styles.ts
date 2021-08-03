import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginVertical: 30
    },
    title: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text700,
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20
    },
    text: {
        color: theme.colors.secondary_100,
        marginBottom: 10,
        fontFamily: theme.fonts.text400,
        fontSize: 16,
        textAlign: 'left'
    },
    bold: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        fontWeight: '700'
    },
});