import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 5
    },
    button: {
        padding: 30,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: theme.colors.overlay
    },
    title: { 
        color: theme.colors.white, 
        textTransform: 'uppercase',
        marginBottom: 15,
    },
    text:{
        color: theme.colors.white
    },
    icon: {
        marginRight: 5
    },
    row: {
        marginTop: 5,
        flexDirection: 'row'
    }
});