import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback } from 'react'
import { Text, SafeAreaView, ScrollView, Image, View } from 'react-native'

import { TopHeader } from '../../../components/TopHeader';
import { exercises } from '../../../data/exercises';
import { theme } from '../../../global/styles/theme';
import { typography } from '../../../global/styles/typography';
import { RootStackScreenParams } from '../../../routes/authenticated.routes';
import { styles } from './styles';

export function ExerciseInfo({ route }: StackScreenProps<RootStackScreenParams, "ExerciseInfoModal">) {
    const { exerciseUid } = route.params;
    const { capacity, image, howTo, name, muscles } = exercises.find(value => value.uid === exerciseUid) || exercises[0];

    const renderBadges = useCallback((text: string) => {
        let array = text.split(",");
        return array.map((value, index) => 
            <Text style={[typography.sub500, styles.badge]} key={`badge-text-${index}`}>{ value }</Text>
        );
    },[]);
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopHeader leftBack title={name}/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Image 
                    source={image} 
                    style={styles.image}
                />

                <Text style={[typography.sub500, styles.text]}>Principal Capacidade Física:</Text>
                <View style={{ alignSelf: 'flex-start' }}>
                    <Text style={[typography.sub500, styles.badge, { backgroundColor: theme.colors.pink_cardinal }]}>{ capacity }</Text>
                </View>

                <Text style={[typography.sub500, styles.text]}>Músculos Envolvidos:</Text>
                <View style={styles.badges}>
                    { renderBadges(muscles) }
                </View>

                <Text style={[typography.sub500, styles.text]}>Como Executar:</Text>
                <Text style={[typography.sub300, { marginBottom: 20 }]}>{ howTo }</Text>
            </ScrollView>
        </SafeAreaView>
    )
}