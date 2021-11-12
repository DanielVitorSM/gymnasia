import React from 'react'
import { View, Text, SafeAreaView, Alert } from 'react-native'
import { PrimaryButton } from '../../../components/PrimaryButton'

import { TopHeader } from '../../../components/TopHeader'
import { theme } from '../../../global/styles/theme'
import { typography } from '../../../global/styles/typography'
import { useAuth } from '../../../hooks/authentication'
import { styles } from './styles'

export function Settings() {
    const { user, signOut } = useAuth();

    console.log(user)

    function handleOnSignOut(){
        Alert.alert("Tem certeza?", "Ao sair da conta os dados locais serão apagados, faremos um backup automático caso esteja conectado a internet", [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    style: "default",
                    onPress: signOut
                }
            ],
            { cancelable: true }
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopHeader title="Configurações"/>
            <View style={styles.container}>
                <Text style={[typography.sub500, styles.section]}>Conta</Text>
                <Text style={typography.text500}>
                    Status: <Text style={styles.colored}>{ !user.isOffline ? "Online" : "Offline" }</Text>
                </Text>
                <Text style={typography.text500}>
                    Email: <Text style={styles.colored}>{ user.email || "Não encontrado" }</Text>
                </Text>
                
                <PrimaryButton 
                    text="Sair da Conta"
                    textStyle={{ color: theme.colors.red }}
                    style={{ backgroundColor: theme.colors.gray_light, marginTop: 10 }}
                    onPress={handleOnSignOut}
                />
            </View>
        </SafeAreaView>
    )
}