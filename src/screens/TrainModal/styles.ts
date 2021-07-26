import { theme } from '../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
        flex: 1
    },
    image: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
    },
    gradient: {
        height: '50%',
        width: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 10
    },
    title: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text500,
        fontSize: 24,
        textAlign: "left",
        marginHorizontal: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    icons: {
        flexDirection: 'row'
    },
    info: {
        flexDirection: 'row',
        marginRight: 10
    },
    info_text: {
        color: theme.colors.white,
        fontSize: 12,
        fontFamily: theme.fonts.text400,
        marginLeft: 5
    },
    text: {
        color: theme.colors.secondary_100,
        marginBottom: 10,
        fontFamily: theme.fonts.text400,
        fontSize: 16,
        textAlign: 'left'
    },
    bold: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        fontWeight: '700'
    },
    description: {
        color: theme.colors.secondary_100,
        fontFamily: theme.fonts.text400,
        textAlign: 'justify'
    },
    line: {
        height: 2,
        width: '90%',
        alignSelf: "center",
        backgroundColor: theme.colors.secondary_60,
        marginVertical: 15
    },
    exercise: {
        width: '100%',
        padding: 10,
        flexDirection: 'row',
        alignItems: "center"
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.tertiary
    },
    repeat: {
        color: theme.colors.white,
        fontSize: 20,
        fontFamily: theme.fonts.text700
    },
    name: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text400,
        marginLeft: 20
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
    },
    button: {
        backgroundColor: theme.colors.primary,
        height: 50,
        width: '60%',
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 100,
        bottom: 30,
        position: 'absolute',
        elevation: 10,
        zIndex: 10
    },
    button_text: {
        color: theme.colors.white,
        fontFamily: theme.fonts.text700,
        textTransform: 'uppercase'
    }
});