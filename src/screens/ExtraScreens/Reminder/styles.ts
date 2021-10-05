import { theme } from './../../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    modal: {
        paddingTop: 30,
        padding: 20,
    },
    center: {
        alignSelf: "center",
        marginBottom: 10
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    badge: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        padding: 8,
        marginHorizontal: 5,
        marginVertical: 5
    },
    active: {
        backgroundColor: theme.colors.primary_light,
        color: theme.colors.white
    },
    list: {
        marginHorizontal: 20,
        marginBottom: 20,
        paddingBottom: 85
    },
    item: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: "space-between",
        marginBottom: 15
    },
    remove: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    }
});