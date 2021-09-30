import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    group: {
        marginHorizontal: 10
    },
    text: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        width: 80,
        height: 50,
        textAlign: "center",
        textAlignVertical: "center"
    },
    button: {
        width: 80,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    }
});