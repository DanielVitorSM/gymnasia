import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        padding: 30,
        width: 300
    }
});