import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Header } from '../../../components/Header';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';

export function MyTrains() {
    const Navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Header 
                name="Meus Treinos"
                rightButton={
                    <BorderlessButton
                        style={styles.add}
                        onPress={() => Navigation.navigate("AddTrain")}
                    >
                        <Feather name="plus" size={24} color={theme.colors.secondary_100}/>
                    </BorderlessButton>
                }
            />
        </SafeAreaView>
    )
}
