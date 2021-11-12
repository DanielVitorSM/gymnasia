import { theme } from './../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    video: {
        width: '100%',
        aspectRatio: 4/5,
        borderRadius: 10,
        backgroundColor: theme.colors.gray_light
    }
});