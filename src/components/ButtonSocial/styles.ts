import { StyleSheet } from "react-native";

import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'red',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
        marginVertical: 5
    },
    load: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        marginRight: 20
    },
    text: {
        color: theme.colors.white_smoke,
        fontSize: 15,
        fontFamily: theme.fonts.text700,
        textAlign: 'center'
    }
});