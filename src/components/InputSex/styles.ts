import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        overflow: 'hidden'
    },
    button: {
        flex: 1/2,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    selected: {
        backgroundColor: theme.colors.primary_light
    }
});