import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: '100%',
        zIndex: -1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 90
    },
    load: {
        position: 'absolute',
        bottom: "15%"
    },
});