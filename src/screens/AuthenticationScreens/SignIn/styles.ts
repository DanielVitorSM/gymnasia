import { Dimensions, StyleSheet } from "react-native";
import { theme } from "../../../global/styles/theme";
const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
    },
    banner: {
        width: '100%',
        marginBottom: -12,
    },
    part: {
        width: width - 60,
        alignItems: "center",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderless: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: theme.colors.black,
        padding: 6,
        marginHorizontal: 8,
        marginTop: 10
    }
});