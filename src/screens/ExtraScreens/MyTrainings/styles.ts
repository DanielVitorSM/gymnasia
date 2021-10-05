import { theme } from './../../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex: 1
    },
    item: {
        backgroundColor: theme.colors.gray_light,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15
    },
    press: {
        padding: 20,
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    },
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        justifyContent: 'flex-end'
    },
    modal: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: "80%"
    },
    buttons: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 20
    }
});