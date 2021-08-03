import Constants from 'expo-constants';
import { StyleSheet } from "react-native";
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 60,
        alignItems: "center"
    },
    image: {
        width: 300,
        height: 300
    },
    text: {
        fontSize: 20,
        fontFamily: theme.fonts.text500
    },
    content: {
        alignItems: "center",
        justifyContent: "space-between",
        padding: 30,
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 24,
        color: theme.colors.white,
        fontFamily: theme.fonts.text700
    },
    control: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%'
    },
    button: {
        padding: 10
    },
    stop: {
        backgroundColor: theme.colors.tertiary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 50
    },
    stop_text: {
        color: theme.colors.white
    },
    inactive: {
        opacity: .5
    }
});