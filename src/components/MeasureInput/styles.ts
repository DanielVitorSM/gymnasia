import { StyleSheet } from 'react-native';
import { theme } from './../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white_transparent,
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 120,
        justifyContent: 'center'
    },
    input: {
        fontSize: 30,
        textAlign: 'right',
        color: theme.colors.white,
    },
    text: {
        fontSize: 14,
        paddingBottom: 2,
        marginLeft: 2,
        color: theme.colors.white
    }
});