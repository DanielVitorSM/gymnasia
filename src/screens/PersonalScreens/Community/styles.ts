import { StyleSheet } from "react-native";
import { theme } from "../../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card_list_container: {
        padding: 20,
        flex: 1
    },
    card: {
        backgroundColor: theme.colors.secondary_10,
        padding: 20,
        marginBottom: 20,
        elevation: 10
    },
    card_user: {
        fontSize: 10,
        fontFamily: theme.fonts.text400,
        color: theme.colors.secondary_80
    },
    card_title: {
        fontSize: 16,
        fontFamily: theme.fonts.text500,
        color: theme.colors.secondary_100,
        marginBottom: 10
    },
    card_text: {
        fontSize: 12,
        fontFamily: theme.fonts.text400,
        color: theme.colors.secondary_80,
        marginLeft: 5,
        marginRight: 10
    },
    card_content: {
        flexDirection: 'row'
    },
    card_info: {
        flexDirection: 'row',
        alignItems: "center"
    }
});