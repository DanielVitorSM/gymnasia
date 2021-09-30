import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20
    },
    line: {
        height: 2,
        width: 250,
        backgroundColor: theme.colors.yellow_sun,
        marginTop: 10,
        marginBottom: 25,
        borderRadius: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15
    },
    input: {
        width: 180
    },
    button: {
        marginBottom: 30
    }
});