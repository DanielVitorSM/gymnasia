import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white_transparent,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        justifyContent: 'center'
    },
    text: {
        fontSize: 24,
        paddingBottom: 2,
        marginLeft: 2,
        color: theme.colors.white
    }
});