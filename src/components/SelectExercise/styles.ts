import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    list: {
        padding: 20,
        flex: 1,
        backgroundColor: theme.colors.secondary_20
    },
    item: {
        width: "100%",
        height: 80,
        backgroundColor: theme.colors.secondary_10,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: "center"
    },
    image: {
        width: 80,
        height: 80
    },
    title: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text400,
        fontSize: 16,
        marginHorizontal: 20
    }
});