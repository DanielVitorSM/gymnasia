import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 20,
    },
    text: {
        color: theme.colors.secondary_100,
        fontSize: 60
    }
});