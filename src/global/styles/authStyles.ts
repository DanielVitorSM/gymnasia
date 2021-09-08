import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const authStyles = StyleSheet.create({
    small: {
        color: theme.colors.secondary_80,
        fontSize: 12,
        fontFamily: theme.fonts.text400,
    },
    header: {
        color: theme.colors.secondary_100,
        fontSize: 24,
        fontFamily: theme.fonts.text500,
    },
    text: {
        color: theme.colors.secondary_100,
        fontSize: 12,
        fontFamily: theme.fonts.text500,
    },
    right: {
        textAlign: "right"
    },
    center: {
        textAlign: "center"
    }
})