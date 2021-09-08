import React, { useState } from 'react'
import { View, Text, Image, SafeAreaView, TextInput, KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import { RectButton, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import CheckBox from '@react-native-community/checkbox';

export type IExerciseSelected = {
    name: string;
    uid: string;
    time: number;

}

export function AddTrain() {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("Médio");
    const [interval, setInterval] = useState("10");
    const [isPublic, setIsPublic] = useState(false);

    const data: IExerciseSelected[] = [
        {
            name: 'Abdominal supra esplinhal do quadrado do cateto',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 30
        },
        {
            name: 'Polichinelo',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 60
        },
        {
            name: 'Afundo',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 20
        },
        {
            name: 'Agachamento',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 15
        },
        {
            name: 'Agachamento',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 15
        },
        {
            name: 'Agachamento',
            uid: "dae302aa-36d9-4c08-bd92-69be6c47d877",
            time: 15
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback 
                containerStyle={styles.container}
                style={styles.container}
                onPress={() => Keyboard.dismiss()}
            >
                <View style={styles.header}>
                    <Text style={styles.heading}>Novo treino</Text>
                </View>

                <KeyboardAvoidingView 
                    style={[styles.container, { padding: 20 }]}
                    behavior="padding"
                >
                    <Text style={styles.text}>Nome do treino:</Text>
                    <TextInput 
                        style={[styles.inputText, styles.value]}
                        keyboardType="default"
                        onChangeText={setName}
                        value={name}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 2/5 }}>
                            <Text style={styles.text}>Dificuldade:</Text>
                            <View style={styles.inputText}>
                                <Picker
                                    style={styles.value}
                                    mode="dialog"
                                    selectedValue={difficulty}
                                    onValueChange={setDifficulty}
                                    dropdownIconColor={theme.colors.secondary_80}
                                >
                                    <Picker.Item label="Fácil" value="Fácil"/>
                                    <Picker.Item label="Médio" value="Médio"/>
                                    <Picker.Item label="Difícil" value="Difícil"/>
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flex: 2/5 }}>
                            <Text style={styles.text}>Intervalo:</Text>
                            <View style={[styles.inputText, styles.row]}>
                                <TextInput 
                                    style={[styles.value, { flex: 1 }]}
                                    keyboardType="numeric"
                                    onChangeText={setInterval}
                                    value={interval}
                                />
                                <Text style={styles.text}>segundos</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.text}>Adicionar exercícios:</Text>
                        <View style={styles.row}>
                            <FontAwesome5 name="clock" size={16} color={theme.colors.secondary_80} />
                            <Text style={[styles.text, { marginLeft: 5 }]}>40s</Text>
                        </View>
                    </View>

                    <DraggableFlatList
                        data={data}
                        numColumns={1}
                        keyExtractor={(_, index) => index.toString() + "-exercise-item-draggable"}
                        renderItem={({ item, index, drag, isActive }) => 
                            <TouchableOpacity 
                                activeOpacity={.9} 
                                onLongPress={drag}
                                style={styles.item}
                            >
                                <Text numberOfLines={1} style={[styles.value, { flex: 1, textTransform: 'capitalize' }]}> { item.name } </Text>
                                <View style={styles.row}>
                                    <Text  style={styles.text}> { item.time }s </Text>
                                    <TouchableOpacity 
                                        activeOpacity={.9} 
                                        onLongPress={drag}
                                        containerStyle={{ marginLeft: 20 }}
                                    >
                                        <FontAwesome5 name="ellipsis-v" size={20} color={theme.colors.secondary_60} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        }
                        ListFooterComponent={() => 
                            <TouchableOpacity 
                                activeOpacity={.9}
                                style={[styles.item, styles.add]}
                            >
                                <FontAwesome5 name="plus" size={20} color={theme.colors.secondary_60} />
                            </TouchableOpacity>
                        }
                        containerStyle={{ flex: 1, marginTop: 5 }}
                    />
                    <TouchableWithoutFeedback
                        onPress={() => setIsPublic(!isPublic)}
                        style={[styles.row, styles.check]}
                    >
                        <CheckBox 
                            value={isPublic}
                            onValueChange={setIsPublic}
                            boxType="square"
                            tintColors={{
                                true: theme.colors.primary,
                                false: theme.colors.secondary_70
                            }}
                        />
                        <Text style={styles.text}>Compartilhar com a comunidade</Text>
                    </TouchableWithoutFeedback>

                    <RectButton style={styles.button}>
                        <Text style={[styles.value, { color: 'white' }]}>Criar treino</Text>
                    </RectButton>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}
