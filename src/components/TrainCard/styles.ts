import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        height: 140,
    },
    image: {
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    title: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        fontSize: 16
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    label: {
        color: theme.colors.white,
        fontSize: 14,
        fontFamily: theme.fonts.text400,
        marginLeft: 5,
        marginRight: 10
    }
});