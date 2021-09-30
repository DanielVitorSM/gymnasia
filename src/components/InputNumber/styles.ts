import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: theme.colors.gray_light,
        alignItems: "center",
        justifyContent: 'space-between',
        borderRadius: 10
    },
    button: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 50,
        flex: 1,
        textAlign: "center"
    }
});