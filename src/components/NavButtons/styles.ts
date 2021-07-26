import { theme } from './../../global/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    desactive: {
        opacity: .5
    },
    nextButtonIcon: {
        marginTop: 4,
        marginLeft: 4
    },
    prevButtonIcon: {
        marginTop: 4,
        marginRight: 2
    }
});