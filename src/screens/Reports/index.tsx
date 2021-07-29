import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ChartFat, CalcIMC } from '../../components/ChartFat';
import { Header } from '../../components/Header';
import { ChartWeight } from '../../components/ChartWeight';
import { ChartIMC } from '../../components/ChartIMC';
import { SectionHeader } from '../../components/SectionHeader';
import { WeightPodium } from '../../components/WeightPodium';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useAuth } from '../../hooks/auth-context';

export function Reports() {
    const { user } = useAuth();
    const imc = CalcIMC(user.height, user.weight);
    const Navigation = useNavigation();

    function handleNavigateToPersonalData(){
        Navigation.navigate("Dados Pessoais");
    }

    return (
        <View style={styles.container}>
            <Header name="Relatórios" />
            <ScrollView>
                {
                    false &&
                    <View>
                        <SectionHeader title="Histórico de Peso:" typeRight="add"/>
                        <ChartWeight />
                        <WeightPodium min={80} now={81} max={103}/>
                    </View>
                }

                <SectionHeader 
                    title={`IMC: ${imc.toFixed(2)}`}
                    onPress={handleNavigateToPersonalData}
                />
                <ChartIMC imc={imc}/>

                <SectionHeader 
                    title="Percentual de gordura (aprox.):" 
                    onPress={handleNavigateToPersonalData}
                />
                <ChartFat {...user}/>
            </ScrollView>
        </View>
    )
}