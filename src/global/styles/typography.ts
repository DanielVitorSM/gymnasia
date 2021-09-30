import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const typography = StyleSheet.create({
    heading400: {
        fontSize: 32,
        fontFamily: theme.fonts.regular,
        color: theme.colors.black,
        lineHeight: 30
    },
    heading700: {
        fontSize: 32,
        fontFamily: theme.fonts.bold,
        color: theme.colors.black
    },
    value700: {
        fontSize: 24,
        fontFamily: theme.fonts.medium,
        color: theme.colors.pink_cardinal
    },
    text300: {
        fontSize: 16,
        fontFamily: theme.fonts.light,
        color: theme.colors.black
    },
    text500: {
        fontSize: 16,
        fontFamily: theme.fonts.medium,
        color: theme.colors.black
    },
    text700: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.black
    },
    sub300: {
        fontSize: 14,
        fontFamily: theme.fonts.light,
        color: theme.colors.black
    },
    sub500: {
        fontSize: 14,
        fontFamily: theme.fonts.medium,
        color: theme.colors.black
    },
    small300: {
        fontSize: 12,
        fontFamily: theme.fonts.light,
        color: theme.colors.black
    },
    small700: {
        fontSize: 12,
        fontFamily: theme.fonts.bold,
        color: theme.colors.black
    },
    info300: {
        fontSize: 10,
        fontFamily: theme.fonts.light,
        color: theme.colors.black
    },
    info700: {
        fontSize: 10,
        fontFamily: theme.fonts.bold,
        color: theme.colors.black
    },
})