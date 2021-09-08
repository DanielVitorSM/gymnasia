import { Alert } from "react-native";
import * as Linking from 'expo-linking';

export function errorAlert(message: string, onContinue: () => void){
    Alert.alert(
        "Problema encontrado!", 
        message + " Caso o erro persista contate o suporte.",
        [
            {
                text: "Suporte",
                onPress: () => Linking.openURL("https://wa.me/5518991748269")
            },
            {
                text: "Continuar",
                onPress: onContinue
            },
        ],
        {
            cancelable: true,
            onDismiss: onContinue
        }
    );
}