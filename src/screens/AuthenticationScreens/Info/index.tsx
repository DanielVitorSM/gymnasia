import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Text, View } from 'react-native';
import { differenceInYears } from 'date-fns';

import BannerSVG from '../../../assets/banner.svg';
import { theme } from '../../../global/styles/theme';
import { typography } from '../../../global/styles/typography';
import { styles } from './styles';
import { useAuth, IUserDataObject } from '../../../hooks/authentication';

import { PrimaryButton } from '../../../components/PrimaryButton';
import { InputNumber } from '../../../components/InputNumber';
import { InputDate } from '../../../components/InputDate';
import { InputSex } from '../../../components/InputSex';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('screen').height

export function Info() {
    const [weight, setWeight] = useState(54);
    const [height, setHeight] = useState(156);
    const [birth, setBirth] = useState(new Date("07/10/2004"));
    const [sex, setSex] = useState("F");
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { updateUserData, signOut } = useAuth();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        }
        );
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

     
    async function handleSubmit(){
        setLoading(true)
        let age = differenceInYears(Date.now(), birth);
        if(age < 12 || age > 120){
            setLoading(false)
            return Alert.alert("Data de nascimento inválida", "Insira uma data de nascimento válida!");
        }
        
        await updateUserData({
            weight,
            height,
            sex,
            birth
        } as IUserDataObject);
    }

    function handleSignBack(){
        signOut();
    }

    return (
        <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ minHeight: screenHeight}}
            onTouchStart={() => Keyboard.dismiss()}
        >
            <KeyboardAvoidingView
                style={styles.container}
                contentContainerStyle={styles.container}
                keyboardVerticalOffset={-100}
            >
                <BannerSVG style={styles.banner}/>
                <View style={styles.content}>
                    <View style={styles.part}>
                        <Text style={[typography.heading400, { textAlign: "center", marginBottom: 30 }]}>
                            Só mais algumas informações
                        </Text>

                        <View style={styles.row}>
                            <View style={[styles.group, { paddingRight: 10 }]}>
                                <Text style={typography.small700}>Peso</Text>
                                <InputNumber 
                                    numberValue={weight}
                                    onChangeNumberValue={setWeight}
                                    rightText="kg"
                                    decimal
                                />
                            </View>

                            <View style={[styles.group, { paddingLeft: 10 }]}>
                                <Text style={typography.small700}>Altura</Text>
                                <InputNumber 
                                    numberValue={height}
                                    onChangeNumberValue={setHeight}
                                    rightText="cm"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.group, { paddingRight: 10 }]}>
                                <Text style={typography.small700}>Sexo</Text>
                                <InputSex
                                    sex={sex}
                                    onChangeSex={setSex}
                                />
                            </View>
                            <View style={[styles.group, { paddingLeft: 10 }]}>
                                <Text style={typography.small700}>Data de Nascimento</Text>
                                <InputDate
                                    date={birth}
                                    onChangeDate={setBirth}
                                />
                            </View>
                        </View>
                        
                        <PrimaryButton
                            text={"Continuar"}
                            enabled={true}
                            loading={loading}
                            onPress={handleSubmit}
                        />
                    </View>

                    <View style={[styles.part, styles.row,isKeyboardVisible && { display: 'none' }]}>
                        <Text style={typography.small300}>
                            Deseja entrar com outra conta?
                        </Text>
                        <Text
                            style={[typography.small300, { color: theme.colors.primary_light, marginLeft: 5 }]}
                            onPress={handleSignBack}
                        >
                            Voltar
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}