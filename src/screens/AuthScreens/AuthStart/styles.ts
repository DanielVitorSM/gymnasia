import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles/theme";

export const styles = StyleSheet.create({
    title: {
        color: theme.colors.secondary_80,
        fontSize: 14,
        fontFamily: theme.fonts.text400,
        marginVertical: 20,
        textAlign: 'center'
    },
    content: {
        width: "100%"
    }
});