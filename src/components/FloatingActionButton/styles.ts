import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary_light,
        height: 60,
        width: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 60,
        overflow: 'hidden',
        elevation: 5,
        zIndex: 1
    },
    button: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
});