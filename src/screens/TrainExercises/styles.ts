import Constants from 'expo-constants';
import { theme } from '../../global/styles/theme';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: Constants.statusBarHeight + 20
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    button: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50
    },
    text: {
        marginHorizontal: 10,
        color: 'white'
    }
});