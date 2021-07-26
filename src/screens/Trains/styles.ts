import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    section: {
        color: theme.colors.secondary_100,
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 4,
        borderBottomEndRadius: 10,
        width: 130,
        fontSize: 16,
        fontFamily: theme.fonts.text400,
        marginTop: 10
    },
});