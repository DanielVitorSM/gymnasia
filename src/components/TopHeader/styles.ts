import { StyleSheet } from "react-native";
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        paddingBottom: 15
    },
    menu: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 15,
        marginBottom: 10
    },
    input: {
        width: 250,
        height: 40,
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        paddingHorizontal: 20
    },
    button: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center"
    }
});