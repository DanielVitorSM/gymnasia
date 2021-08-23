import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { styles } from './styles'
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamsList } from '../../routes/app.routes';

interface ITextWithBold {
    title: string;
    data: string;
}

export function ExerciseModal({ route }: StackScreenProps<RootStackParamsList, "ExerciseModal">) {
    const { data } = route.params

    return (
        <View  style={styles.container} >
            <ScrollView>
                <Image 
                    style={styles.image} 
                    source={data.image}
                />
                <Text style={styles.title}>{ data.name }</Text>
                <TextWithBold title="Trabalha Principalmente: " data={ data.muscles }/>
                <TextWithBold title="Capacidade Física Principal: " data={ data.capacity }/>
                <TextWithBold title="Como Fazer: " data={ data.howTo }/>
            </ScrollView>
        </View>
    )
}

function TextWithBold({ title, data }: ITextWithBold){
    return (
        <Text style={styles.text}>
            <Text style={styles.bold}>
                { title }
            </Text>
            { data }
        </Text>
    )
}