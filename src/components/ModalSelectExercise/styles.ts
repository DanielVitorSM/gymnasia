import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        backgroundColor: theme.colors.overlay,
        flex: 1,
    },
    container: {
        borderTopStartRadius: 30, 
        borderTopEndRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 20
    }
});