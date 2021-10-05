import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, SafeAreaView, ScrollView, Keyboard } from 'react-native';
import { InputDate } from '../../../components/InputDate';
import { InputNumber } from '../../../components/InputNumber';
import { InputSex } from '../../../components/InputSex';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { TopHeader } from '../../../components/TopHeader';
import { typography } from '../../../global/styles/typography';
import { useAuth } from '../../../hooks/authentication';

import { styles } from './styles';

export function User() {
    const { userData, updateUserData, user } = useAuth();
    console.log(user)

    const [basic, setBasic] = useState({
        height: userData.height,
        weight: userData.weight,
        birth: new Date(userData.birth),
        sex: userData.sex
    })
    const [extra, setExtra] = useState({
        hip: userData.hip || 0,
        neck: userData.neck || 0,
        waist: userData.waist || 0,
    })

    return (
        <SafeAreaView onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
            <TopHeader
                title="Informações Pessoais"
                extra="config"
            />
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={typography.sub500}>BÁSICO</Text>
                <View style={styles.line}/>
                
                <View style={styles.row}>
                    <Text style={typography.text500}>Altura</Text>
                    <View style={styles.input}>
                        <InputNumber
                            maxNumber={260}
                            rightText="cm"
                            numberValue={basic.height}
                            onChangeNumberValue={num => setBasic(state => {
                                return {
                                    ...state,
                                    height: num
                                }
                            })}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={typography.text500}>Peso</Text>
                    <View style={styles.input}>
                        <InputNumber
                            rightText="kg"
                            decimal
                            maxNumber={600}
                            numberValue={basic.weight}
                            onChangeNumberValue={num => setBasic(state => {
                                return {
                                    ...state,
                                    weight: num
                                }
                            })}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={typography.text500}>Data de Nascimento</Text>
                    <View style={styles.input}>
                        <InputDate 
                            date={basic.birth}
                            onChangeDate={date => setBasic(state => {
                                return {
                                    ...state,
                                    birth: date
                                }
                            })}
                        />
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={typography.text500}>Sexo</Text>
                    <View style={styles.input}>
                        <InputSex
                            sex={basic.sex}
                            onChangeSex={sex => setBasic(state => {
                                return {
                                    ...state,
                                    sex
                                }
                            })}
                        />
                    </View>
                </View>

                <PrimaryButton 
                    text="Atualizar"
                    style={styles.button}
                    onPress={() => updateUserData(basic)}
                />

                <Text style={typography.sub500}>EXTRA</Text>
                <View style={styles.line}/>
                
                <View style={styles.row}>
                    <Text style={typography.text500}>Cintura</Text>
                    <View style={styles.input}>
                        <InputNumber
                            maxNumber={300}
                            minNumber={40}
                            rightText="cm"
                            numberValue={extra.waist}
                            onChangeNumberValue={num => setExtra(state => {
                                return {
                                    ...state,
                                    waist: num
                                }
                            })}
                        />
                    </View>
                </View>
                
                <View style={styles.row}>
                    <Text style={typography.text500}>Pescoço</Text>
                    <View style={styles.input}>
                        <InputNumber
                            maxNumber={80}
                            minNumber={20}
                            rightText="cm"
                            numberValue={extra.neck}
                            onChangeNumberValue={num => setExtra(state => {
                                return {
                                    ...state,
                                    neck: num
                                }
                            })}
                        />
                    </View>
                </View>
                {
                    basic.sex === "F"
                    &&
                    <View style={styles.row}>
                        <Text style={typography.text500}>Quadril</Text>
                        <View style={styles.input}>
                            <InputNumber
                                maxNumber={250}
                                minNumber={40}
                                rightText="cm"
                                numberValue={extra.neck}
                                onChangeNumberValue={num => setExtra(state => {
                                    return {
                                        ...state,
                                        neck: num
                                    }
                                })}
                            />
                        </View>
                    </View>
                }
                <PrimaryButton 
                    text="Atualizar"
                    style={styles.button}
                    onPress={() => updateUserData(extra)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};