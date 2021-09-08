import Constants from 'expo-constants';
import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: theme.colors.secondary_10,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        alignItems: "center",
        height: 80,
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center"
    },
    heading: {
        fontFamily: theme.fonts.text500,
        fontSize: 14,
        color: theme.colors.secondary_100,
    },
    text: {
        fontFamily: theme.fonts.text400,
        fontSize: 12,
        color: theme.colors.secondary_70,
    },
    value: {
        color: theme.colors.secondary_80,
        fontSize: 14,
        fontFamily: theme.fonts.text400,
    },
    inputText: {
        backgroundColor: theme.colors.secondary_10,
        borderBottomColor: theme.colors.secondary_50,
        justifyContent: "center",
        borderBottomWidth: 2,
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 5,
        height: 50,
        width: '100%',
    },
    inputSelect: {
        borderBottomColor: theme.colors.secondary_50,
        backgroundColor: 'red',
        padding: 20,
        color: theme.colors.secondary_80,
    },
    item: {
        backgroundColor: theme.colors.secondary_10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        marginVertical: 2,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: "center",
        height: 50,
        width: '100%',
    },
    add: {
        justifyContent: "center",
        borderWidth: 1,
        borderColor: theme.colors.secondary_60,
    },
    check: {
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 10
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: "center",
    }
});