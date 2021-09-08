import React from 'react'
import { View, SafeAreaView, FlatList, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../../../components/Header'
import { styles } from './styles'
import { theme } from '../../../global/styles/theme';
import { RectButton } from 'react-native-gesture-handler';

export function Community() {
    const data = [
        {
            id: 0,
            title: "Alongamento",
            user: "Joana da Silva",
            difficulty: "Fácil",
            time: 300,
            rating: 4.2
        },
        {
            id: 1,
            title: "Alongamento",
            user: "Joana da Silva",
            difficulty: "Fácil",
            time: 300,
            rating: 4.2
        },
        {
            id: 2,
            title: "Alongamento",
            user: "Joana da Silva",
            difficulty: "Fácil",
            time: 300,
            rating: 4.2
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Comunidade"/>
            <FlatList 
                data={data}
                keyExtractor={({ id }) => id.toString()}
                contentContainerStyle={styles.card_list_container}
                renderItem={({ item }) => (
                    <RectButton rippleColor="#FFFFFF55" style={styles.card}>
                        <Text style={styles.card_user}>{ item.user }</Text>
                        <Text style={styles.card_title}>{ item.title }</Text>
                        <View style={styles.card_content}>
                            <View style={styles.card_info}>
                                <Ionicons 
                                    name="speedometer" 
                                    size={16} 
                                    color={theme.colors.secondary_100} 
                                />
                                <Text style={styles.card_text}>{ item.difficulty }</Text>
                                <Ionicons 
                                    name="time" 
                                    size={16} 
                                    color={theme.colors.secondary_100} 
                                />
                                <Text style={styles.card_text}>{ item.time / 60 } min</Text>
                            </View>
                        </View>
                    </RectButton>
                )}
            />
        </SafeAreaView>
    )
}
