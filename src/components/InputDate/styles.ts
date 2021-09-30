import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        height: 50,
        width: '100%'
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 13
    }
});