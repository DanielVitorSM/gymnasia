import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 80,
        width: 64,
        borderRadius: 10,
    },
    group: {
        textAlign: 'left',
        justifyContent: 'center',
        paddingLeft: 20,
        flex: 1,
        height: 70
    },
    close: {
        marginHorizontal: 15,
        opacity: .5
    }
});