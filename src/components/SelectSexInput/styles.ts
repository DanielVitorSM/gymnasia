import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    card: {
        backgroundColor: theme.colors.white_transparent,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        height: 80,
        width: 80
    },
    text: {
        color: theme.colors.black,
        fontFamily: theme.fonts.text400,
        marginTop: 5
    },
    active: {
        backgroundColor: theme.colors.secondary_80
    }
});