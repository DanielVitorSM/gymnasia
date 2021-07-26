import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        height: 300, 
        padding: 20, 
        flexDirection: 'row' 
    },
    ycontent: {
        height: '100%'
    },
    content: {
        flex: 1, 
    },
    y: {
        marginBottom: 30,
        flex: 1
    },
    x: {
        marginHorizontal: -10, 
        height: 30
    },
    chart: { 
        flex: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'white',
        marginBottom: 5,
        marginLeft: 5
    }
});