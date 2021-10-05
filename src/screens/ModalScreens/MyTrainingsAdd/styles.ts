import { theme } from './../../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        flex: 1
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 20
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 20
    },
    text:{
        marginBottom: 5
    },
    select: {
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden'
    },
    button: {
        flex: 1/3,
        backgroundColor: theme.colors.gray_light,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        backgroundColor: theme.colors.primary_light,
        color: theme.colors.white
    }
});