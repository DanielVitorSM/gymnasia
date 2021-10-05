import { theme } from './../../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary_light,
        flex: 1,
        justifyContent: 'flex-end'
    },
    info: {
        alignItems: 'center',
        marginBottom: 100
    },
    buttons:{
        flexDirection: 'row',
        overflow: 'hidden',
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 20
    },
    button: {
        backgroundColor: theme.colors.primary_medium,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        color: theme.colors.white,
    },
    overlay: {
        backgroundColor: "#0e0e0e55",
        flex: 1,
    },
    content: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    }
})