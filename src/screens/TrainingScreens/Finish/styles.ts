import { theme } from './../../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary_light,
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
        paddingTop: 72,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    title: {
        color: theme.colors.white,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        width: '100%'
    },
    card: {
        flex: 9/30,
        height: 150,
        backgroundColor: theme.colors.primary_medium,
        elevation: 5,
        borderRadius: 10,
        padding: 15,
        borderWidth: 0.5,
        borderColor: theme.colors.primary_dark
    },
    icon: {
        marginBottom: 20
    },
    text: {
        color: theme.colors.white
    }
});