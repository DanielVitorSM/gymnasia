import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlay: {
        backgroundColor: theme.colors.black_transparent,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        flexDirection: 'row',
        alignItems: "center",
        height: 50,
        width: '100%',
        backgroundColor: theme.colors.secondary_10,
        borderBottomColor: theme.colors.secondary_50,
        borderBottomWidth: 2,
    },
    icon: {
        marginHorizontal: 15
    },
    label: {
        color: theme.colors.secondary_80,
        fontSize: 14
    },
    content: {
        backgroundColor: 'white',
    },
    item: {
        width: 200,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 16,
        color: 'black'
    }
});