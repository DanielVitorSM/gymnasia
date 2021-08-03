import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        paddingHorizontal: 5,
        paddingTop: 10
    },
    cardItem: {
        flexGrow: 1,
        flexBasis: 0,
        margin: 5,
    },
    cardHeader: {
        justifyContent: "center",
        backgroundColor: theme.colors.secondary_60,
        width: '100%',
        height: 50
    },
    cardImage: {
        flex: 1,
        width: (Dimensions.get("screen").width - 30) / 2,
        height: (Dimensions.get("screen").width - 30) / 2,
        padding: 0
    },
    cardLabel: {
        fontSize: 14,
        color: theme.colors.secondary_100,
        fontWeight: "500",
        textAlign: 'center'
    }
});