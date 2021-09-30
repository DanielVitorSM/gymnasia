import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden'
    },
    button: {
        padding: 3,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 10
    },
    group: {
        textAlign: 'left',
        justifyContent: 'center',
        paddingRight: 40,
        paddingLeft: 10,
        flex: 1,
        height: 70
    }
});