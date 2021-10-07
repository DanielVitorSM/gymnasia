import React, { useState, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
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
import { ModalTime } from '../../../components/ModalTime';
import { InputTime } from '../../../components/InputTime';
import { createNotifications } from '../../../utils/notification';

export function Info() {
    const [weight, setWeight] = useState(54);
    const [height, setHeight] = useState(156);
    const [birth, setBirth] = useState(new Date("07/10/2004"));
    const [sex, setSex] = useState("F");
    const [reminder, setReminder] = useState(new Date(15 * 60 * 60 * 1000))
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [showReminder, setShowReminder] = useState(false);

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

    function handleContinue(){
        let age = differenceInYears(Date.now(), birth);
        if(age < 12 || age > 120)
            return Alert.alert("Data de nascimento inválida", "Insira uma data de nascimento válida!");
        setShowReminder(true)
    }
     
    async function handleSubmit(){
        await createNotifications(reminder);
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
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback 
                style={styles.container}
                onPress={() => Keyboard.dismiss()}
            >
                <KeyboardAvoidingView 
                    behavior="position"
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
                                onPress={handleContinue}
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
            </TouchableWithoutFeedback>
            <ModalTime
                title="Selecione um horário para ser lembrado:"
                onSubmit={handleSubmit}
                visible={showReminder}
                onCancel={() => setShowReminder(false)}
            >
                <InputTime
                    value={reminder}
                    onChangeValue={setReminder}
                />
            </ModalTime>
        </SafeAreaView>
    )
}