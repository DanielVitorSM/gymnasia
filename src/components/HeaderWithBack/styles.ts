import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.black,
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: "center",
        justifyContent: "space-between"
    },
    icon: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: theme.colors.secondary_100
    }
});