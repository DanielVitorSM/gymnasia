import React, { useCallback } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import Constants from 'expo-constants';

import InstagramIconSVG from '../../../assets/icons/instagram-alt.svg';

import { TopHeader } from '../../../components/TopHeader'
import { typography } from '../../../global/styles/typography';
import { styles } from './styles';
import { theme } from '../../../global/styles/theme';

export function About() {
    const version = Constants.manifest?.version;
    const instagrams = ["danielvitorsm", "sabrinacatelampersonal", "gabrielcorreiadasilva4", "brenoutimura", "marianacosta955"]

    const showInstagrams = useCallback(() => {
        return instagrams.map((value, index) => (
            <View key={`instagram-view-${index}`} style={styles.row}>
                <InstagramIconSVG style={{ marginRight: 5 }} key={`instagram-icon-${index}`}/>
                <Text key={`instagram-text-${index}`} style={[typography.text300, { color: theme.colors.gray_medium }]}>@{ value }</Text>
            </View>
        ))
    },[]);

    return (
        <SafeAreaView style={{ flex: 1, paddingBottom: 15 }}>
            <TopHeader title="Sobre" />
            <View style={[styles.container, { flex: 1 }]}>
                <Text style={[typography.text300, { color: theme.colors.gray_light, marginBottom: 10 }]}>v{ version || "2.4.3" }</Text>
                <Text style={typography.text300}>Gymnasia é uma solução para o desenvolvimento físico e o incentivo a prática de exercícios idealizado com base no tema de Trabalho de Conclusão de Curso em Desenvolvimento de Sistemas. Desenvolvido depois de muita pesquisa e auxílio de profissionais do ramo, esta é uma versão de testes e não é usada comerciamente.</Text>

                <Text style={[typography.info700, styles.section]}>Atribuições</Text>
                <Text style={typography.text300}>Ícones por <Text style={{ color: theme.colors.primary_light}}>Freepik</Text> e <Text style={{ color: theme.colors.primary_light}}>Flaticon</Text></Text>
                <Text style={[typography.info700, styles.section]}>Equipe</Text>
                { showInstagrams() }
            </View>
        </SafeAreaView>
    )
}