import { theme } from './../../../global/styles/theme';
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    content: {
        backgroundColor: theme.colors.overlay,
        flex: 1,
        paddingBottom: 40
    },
    info: {
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
        flex: 1
    },
    bottom: {
        flex: 1,
        backgroundColor: theme.colors.white,
        marginTop: -30,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        padding: 20
    },
    row: {
        flexDirection: 'row', 
        alignItems: "center",
    },
    text: {
        color: theme.colors.white
    },
    small: {
        marginRight: 10,
        marginLeft: 5
    },
    line: {
        backgroundColor: theme.colors.gray_light,
        height: 2,
        width: width - 140 ,
        alignSelf: 'flex-end'
    },
    add: {
        borderRadius: 100,
        height: 50,
        width: 50,
        marginRight: 20,
        borderWidth: 2,
        borderColor: theme.colors.gray_light,
        alignItems: "center",
        justifyContent: "center"
    },
    edit: {
    }
})