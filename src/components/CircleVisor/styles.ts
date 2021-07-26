import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        marginVertical: 10
    },
    text: {
        color: theme.colors.secondary_100,
        fontSize: 16,
        marginBottom: 5
    },
    time: {
        fontSize: 50,
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        position: "absolute",
        top: 15,
        lineHeight: 80,
        alignSelf: "center"
    }
});