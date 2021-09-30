import { StyleSheet } from 'react-native';
import { theme } from '../../../global/styles/theme';

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: theme.colors.gray_light,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        paddingHorizontal: 20
    },
    chart: {
        width: 120,
    },
    line: {
        backgroundColor: theme.colors.gray_light,
        height: 2,
        width: 200,
        borderRadius: 20
    },
    space: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
    }
});