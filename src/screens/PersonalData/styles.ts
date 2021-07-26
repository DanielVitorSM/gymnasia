import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text400,
        fontSize: 16,
        marginBottom: 5,
        marginTop: 10
    },
    content: {
        flex: 1,
        padding: 20,
        paddingVertical: 10
    }
});