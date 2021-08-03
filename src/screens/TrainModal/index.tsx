import React from 'react'
import { View, Text, SafeAreaView, ImageBackground, FlatList, Alert } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
 
import { RootStackParamsList } from '../../routes/app.routes';
import { styles } from './styles'
import { theme } from '../../global/styles/theme';
import { ITrain } from '../Trains';


export function TrainModal({ route }: StackScreenProps<RootStackParamsList, "TrainModal">) {
    const Navigation = useNavigation()
    const { data } = route.params
    const { black_transparent, transparent } = theme.colors

    return (
        <SafeAreaView  style={styles.container} >
            <ImageBackground 
                style={styles.image} 
                source={data.image}
                resizeMode="cover"
            >
                <LinearGradient
                    style={styles.gradient}
                    colors={[transparent, black_transparent]}
                >
                    <Text style={styles.title}>{ data.title }</Text>
                    <View style={styles.header}>
                        <View style={styles.icons}>
                            <TextIcon 
                                icon="speedometer"
                                text={ data.difficulty }
                            />
                            <TextIcon 
                                icon="time"
                                text={ data.duration }
                            />
                            <TextIcon 
                                icon="hourglass"
                                text={`${data.interval} seg`}
                            />
                        </View>
                        <BorderlessButton
                            enabled
                            borderless
                            rippleColor="white"
                        >
                            <MaterialIcons 
                                name="edit" 
                                size={30} 
                                color={theme.colors.secondary_100}
                            />
                        </BorderlessButton>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.content}>
                <Text style={styles.description}>
                    { data.description }
                </Text>
                <View  style={styles.line} />
                <FlatList 
                    data={data.exercises}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <RectButton 
                            style={styles.exercise}
                            rippleColor={theme.colors.white_transparent}
                        >
                            <View style={styles.circle}>
                                <Text style={styles.repeat}>{ item.time }</Text>
                            </View>
                            <Text style={styles.name}>{ item.name }</Text>
                        </RectButton>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 70 }}
                />
            </View>
            <RectButton
                style={styles.button}
                onPress={() => Navigation.navigate("TrainRoutes", { data, startedAt: Date.now() })}
            >
                <Text style={styles.button_text}>Iniciar Treino</Text>
            </RectButton>
        </SafeAreaView>
    )
}

interface TextIconProps {
    icon: "time" | "speedometer" | "hourglass";
    text: string;
}

/**
 * Microcomponente para exibir os ícones com informações
 * @param icon Nome do icon referente ao Ionicons
 * @param text Texto que aparecerá depois do icone
 */

function TextIcon({ icon, text }: TextIconProps){
    return(
        <View style={styles.info}>
            <Ionicons 
                name={icon} 
                size={20} 
                color={theme.colors.white}
            />
            <Text style={styles.info_text}>
                { text }
            </Text>
        </View>
    )
}