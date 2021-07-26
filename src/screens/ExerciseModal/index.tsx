import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { styles } from './styles'
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamsList } from '../../routes/app.routes';
import SadPng from '../../assets/sad.png';

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
                    source={data.gif ? { uri: data.gif } : SadPng}
                />
                <Text style={styles.title}>{ data.name }</Text>

                {
                    data.muscles &&
                    <TextWithBold title="Principais Músculos: " data={ data.muscles }/>
                }

                {
                    data.capacity &&
                    <TextWithBold title="Capacidades Físicas: " data={ data.capacity }/>
                }

                {
                    data.howTo &&
                    <TextWithBold title="Como Fazer: " data={ data.howTo }/>
                }
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