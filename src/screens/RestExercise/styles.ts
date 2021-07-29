import Constants from 'expo-constants';
import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 60,
        justifyContent: 'flex-end'
    },
    content: {
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        textAlign: "center"
    },
    timer: {
        fontSize: 28,
        marginBottom: 20,
        color: theme.colors.white_smoke,
        fontFamily: theme.fonts.text400,
    },
    control: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: theme.colors.white_smoke,
        width: 100,
        marginHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 100,
        alignItems: "center"
    },
    text: {
        fontSize: 14,
        fontFamily: theme.fonts.text700,
        color: theme.colors.black
    },
    footer: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-start',
        marginTop: 120
    },
    image: {
        width: '100%',
        flex: 1
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10
    },
    progress: {
        fontSize: 18,
        fontFamily: theme.fonts.text400,
        color: theme.colors.secondary_20,
        textTransform: 'uppercase'
    },
    name: {
        fontSize: 18,
        fontFamily: theme.fonts.text700,
        color: theme.colors.black
    },
    time: {
        fontSize: 20,
        fontFamily: theme.fonts.text400,
        color: theme.colors.secondary_20
    }
});