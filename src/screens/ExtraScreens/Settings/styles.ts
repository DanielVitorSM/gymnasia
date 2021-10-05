import { theme } from './../../../global/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    colored: {
        color: theme.colors.primary_light
    },
    section: {
        marginTop: 20,
        marginBottom: 15
    }
});