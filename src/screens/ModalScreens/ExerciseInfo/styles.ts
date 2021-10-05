import { theme } from './../../../global/styles/theme';
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    image: {
        width: width - 40,
        height: width - 40,
        resizeMode: 'cover',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.colors.gray_light,
        marginBottom: 5
    },
    text: {
        marginTop: 15,
        marginBottom: 10
    },
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    badge: {
        color: 'white',
        padding: 8,
        backgroundColor: theme.colors.primary_light,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
        textTransform: 'capitalize'
    }
});