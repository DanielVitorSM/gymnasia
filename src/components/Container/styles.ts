import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    outside: {
        flex: 1
    },
    image: {
        flex: 1,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
        zIndex: -1
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 90,
        marginHorizontal: 40,
    },
    logo: {
        width: 177,
        height: 37
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        width: 300
    }
});