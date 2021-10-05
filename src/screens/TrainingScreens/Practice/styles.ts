import { theme } from './../../../global/styles/theme';
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary_light,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
        marginTop: -30
    },
    image: {
        width: width,
        height: width,
        justifyContent: 'flex-end'
    },
    text: {
        color: theme.colors.white,
        textTransform: 'uppercase',
        height: 64,
        textAlign: 'center',
        textAlignVertical: 'bottom',
        maxWidth: 250
    },
    countdown: {
        fontSize: 64,
        fontFamily: theme.fonts.medium,
        lineHeight: 64,
        height: 80,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    controls: {
        flexDirection: 'row',
        width: 250,
        alignItems: "center",
        justifyContent: 'space-evenly',
        height: 64,
    },
    overlay: {
        backgroundColor: theme.colors.overlay,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    modal: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        alignItems: "center",
        padding: 20,
        paddingTop: 30,
        width: 300
    },
    info: {
        backgroundColor: theme.colors.overlay,
        alignSelf: 'flex-start',
        marginBottom: 40,
        marginLeft: 20,
        borderRadius: 20,
        overflow: 'hidden'
    },
    info_button: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    }
});