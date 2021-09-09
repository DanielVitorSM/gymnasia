import Constants from 'expo-constants';
import { Dimensions, StyleSheet } from "react-native";
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
    menu: {
        marginRight: -20, 
        paddingHorizontal: 20, 
        height: 50,
        justifyContent: "center"
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
    },

    //Modal Exercise Menu Edit
    overlay: {
        margin: 0, 
        justifyContent: 'flex-end'
    },
    modal: {
        backgroundColor: theme.colors.secondary_50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 4,
        alignItems: "center"
    },
    touchable: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%'
    },
    line: {
        backgroundColor: theme.colors.secondary_60,
        marginVertical: 15,
        height: 5,
        width: '40%',
        borderRadius: 50
    },


    //Modal Exercise Select
    select: {
        flex: 4/5,
        width: Dimensions.get("screen").width,
    },
    exercise: {
        flexDirection: 'row',
        alignItems: "center",
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    thumb: {
        width: 80,
        height: 80,
    },
    info: {
        flex: 1,
        marginHorizontal: 15,
        alignItems: "flex-start",
        paddingTop: 12,
        paddingBottom: 15
    },

    //Modal Dialog Interval
    dialog: {
        backgroundColor: theme.colors.white_smoke,
        borderRadius: 15,
        padding: 20,
        paddingTop: 30,
        alignItems: "center"
    },
    press: {
        height: 50,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: theme.colors.tertiary
    },
    input: {
        width: '100%',
        borderColor: theme.colors.secondary_100,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        padding: 10,
        marginTop: 10,
        marginBottom: 30
    }
});