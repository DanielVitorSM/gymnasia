import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'

import { styles } from './styles'
import { TopHeader } from '../../../components/TopHeader'
import { typography } from '../../../global/styles/typography'
import { ChartIMC } from '../../../components/ChartIMC'
import { ChartFat } from '../../../components/ChartFat'
import { useAuth } from '../../../hooks/authentication'

export function Reports() {
    const { userData: { height, weight, birth, sex, waist, hip, neck } } = useAuth();
    const imc = weight / (height / 100) ** 2;

    return (
        <SafeAreaView>
            <TopHeader title="Relatórios" extra="config"/>

            <ScrollView style={styles.content}>
                <Text style={[typography.sub500, { marginBottom: 15 }]}>ÍNDICE DE MASSA CORPORAL</Text>
                <View style={styles.row}>
                    <View style={styles.chart}>
                        <ChartIMC imc={imc}/>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={typography.small300}>IMC:</Text>
                        <Text style={typography.value700}>{ imc.toFixed(2) } kg/m²</Text>
                        <Text style={[typography.small300, { marginTop: 10 }]}>Situação:</Text>
                        <Text numberOfLines={2} style={typography.value700}>
                            { imc <= 18.5 && "Abaixo do Peso" }
                            { imc > 18.5 && imc <= 25 && "Peso normal" }
                            { imc > 25 && imc <= 30 && "Acima do Peso" }
                            { imc > 30 && "Obesidade" }
                        </Text>
                    </View>
                </View>

                <View style={styles.space}>
                    <View style={styles.line} />
                </View>

                <Text style={[typography.sub500, { marginBottom: 15 }]}>ÍNDICE DE GORDURA CORPORAL (ESTIMADO)</Text>
                <View style={styles.row}>
                    <ChartFat 
                        birth_date={new Date(birth)} 
                        height={height} 
                        weight={weight} 
                        sex={sex}  
                        hip={hip} 
                        waist={waist} 
                        neck={neck}
                    />
                </View>

                <View style={styles.space}>
                    <View style={styles.line} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}