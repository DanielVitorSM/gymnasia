import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 10,
        paddingTop: 10
    },
    cardItem: {
        backgroundColor: theme.colors.secondary_60,
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6,
        minHeight: 170
    },
    cardImage: {
        width: 80,
        height: 80
    },
    cardLabel: {
        fontSize: 14,
        color: theme.colors.secondary_100,
        marginTop: 20,
        fontWeight: "500",
        textAlign: 'center'
    }
});