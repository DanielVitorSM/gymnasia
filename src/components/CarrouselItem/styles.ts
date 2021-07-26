import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.black,
        height: 300,
        width: 300,
        marginHorizontal: 0,
        justifyContent: "flex-end"
    },
    gradient: {
        height: 100,
        justifyContent: "flex-end"
    },
    name: {
        color: theme.colors.white,
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16
    }
});