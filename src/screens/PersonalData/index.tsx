import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, KeyboardType, ToastAndroid, Platform } from 'react-native';
import { differenceInYears, format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import { useAuth } from '../../hooks/auth-context';

import { InputModal, SelectModal, OnSubmitType } from '../../components/InputModal';
import { SimpleDataCard } from '../../components/SimpleDataCard';
import { Header } from '../../components/Header';
import { styles } from './styles';

type ModalType = "text-input" | "date" | "sex";

export function PersonalData() {
    const { user, updateUser } = useAuth()
    const [modalType, setModalType] = useState<ModalType>("text-input");
    const [showModal, setShowModal] = useState(false);
    const [keyboardModalType, setKeyboardModalType] = useState<KeyboardType>("default")
    const [modalTitle, setModalTitle] = useState("Alterar");
    const [modalOnSubmit, setModalOnSubmit] = useState<OnSubmitType>(() => () => {});

    function openModal(modalTitle: string, keyboardType?: KeyboardType | null, modalType?: ModalType){
        setKeyboardModalType(keyboardType || "default");
        setModalType(modalType || "text-input");
        setModalTitle(`Alterar ${modalTitle}`);
        setShowModal(true);
    }

    function handleNameUpdate(value: string){
        if(value.length > 30)
            throw new Error("Nome muito grande");
        if(value.length < 5)
            throw new Error("Nome muito pequeno");
        updateUser({ ...user, name: value });
    }

    function handleHeightUpdate(value: string){
        const h = Number(value);
        if(h > 300 || h < 50)
            throw new Error("Insira uma altura real");
        if(!Number.isInteger(h))
            throw new Error("Insira a altura em centímetros");
        updateUser({ ...user, height: h });
    }

    function handleWeightUpdate(value: string){
        const w = Number(value);
        if(w > 600 || w < 20)
            throw new Error("Insira um peso válido");
        updateUser({ ...user, weight: w });
    }

    function handleBirthUpdate(event: any, selectedDate: Date | undefined){
        setShowModal(false)
        if(selectedDate && differenceInYears(new Date(), selectedDate) >= 12)
            return updateUser({ ...user, birth_date: selectedDate });

        if(Platform.OS === "android")
            ToastAndroid.show("Insira uma data válida", 2);
    }

    function handleSexUpdate(value: string){
        updateUser({ ...user, sex: value });
    }

    function handleNeckUpdate(value: string){
        const n = Number(value);
        if(n > 100 || n < 15)
            throw new Error("Insira uma medida válida");
        updateUser({ ...user, neck: n });
    }

    function handleHipUpdate(value: string){
        const h = Number(value);
        if(h > 260 || h < 40)
            throw new Error("Insira uma medida válida");
        updateUser({ ...user, hip: h });
    }

    function handleWaistUpdate(value: string){
        const w = Number(value);
        if(w > 300 || w < 30)
            throw new Error("Insira uma medida válida");
        updateUser({ ...user, waist: w });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header name="Configurações"/>

            <ScrollView style={styles.content}>
                <Text style={styles.text}>Informações</Text>

                <SimpleDataCard 
                    icon="user-alt" 
                    title="Nome"
                    value={user.name}
                    onClick={(title) => {
                        openModal(title);
                        setModalOnSubmit(() => handleNameUpdate);
                    }}
                />
                <SimpleDataCard 
                    icon="ruler-vertical" 
                    title="Altura"
                    value={`${user.height} cm`}
                    onClick={(title) => {
                        openModal(title, "numeric");
                        setModalOnSubmit(() => handleHeightUpdate);
                    }}
                />
                <SimpleDataCard 
                    icon="weight" 
                    title="Peso"
                    value={`${user.weight.toFixed(1)} kg`}
                    onClick={(title) => {
                        openModal(title, "decimal-pad");
                        setModalOnSubmit(() => handleWeightUpdate);
                    }}
                />
                <SimpleDataCard 
                    icon="calendar-alt" 
                    title="Data de Nascimento" 
                    value={`${format(user.birth_date, "dd/MM/yyyy")}`}
                    onClick={(title) => {
                        openModal(title, null, "date");
                    }}
                />
                <SimpleDataCard 
                    icon="venus-mars" 
                    title="Sexo" 
                    value={`${user.sex === "F" ? "Feminino" : "Masculino"}`}
                    onClick={(title) => {
                        openModal(title, null, "sex");
                        setModalOnSubmit(() => handleSexUpdate);
                    }}
                />

                <Text style={styles.text}>Medidas</Text>

                <SimpleDataCard 
                    icon="ruler" 
                    title="Pescoço"
                    value={user.neck ? `${user.neck} cm` : "Não definido"}
                    onClick={(title) => {
                        openModal(title, "numeric");
                        setModalOnSubmit(() => handleNeckUpdate);
                    }}
                />
                <SimpleDataCard 
                    icon="ruler" 
                    title="Cintura" 
                    value={user.waist ? `${user.waist} cm` : "Não definido"}
                    onClick={(title) => {
                        openModal(title, "numeric");
                        setModalOnSubmit(() => handleWaistUpdate);
                    }}
                />
                <SimpleDataCard 
                    icon="ruler" 
                    title="Quadril" 
                    value={user.hip ? `${user.hip} cm` : "Não definido"}
                    onClick={(title) => {
                        openModal(title, "numeric");
                        setModalOnSubmit(() => handleHipUpdate);
                    }}
                />
            </ScrollView>
            {
                modalType === "text-input" &&
                <InputModal
                    keyboardType={keyboardModalType}
                    title={modalTitle}
                    visible={showModal}
                    setVisible={setShowModal}
                    onSubmit={modalOnSubmit}
                />
            }
            {
                (modalType === "date" && showModal) &&
                <DateTimePicker 
                    value={user.birth_date}
                    mode="date"
                    display="calendar"
                    onChange={handleBirthUpdate}
                    maximumDate={new Date(Date.now() - 378432000000)}
                />
            }
            {
                (modalType === "sex" && showModal) &&
                <SelectModal 
                    title={modalTitle}
                    visible={showModal}
                    setVisible={setShowModal}
                    initialValue={user.sex as "F" | "M"}
                    onSubmit={modalOnSubmit}
                >
                    <Picker.Item label="Masculino" value="M"/>
                    <Picker.Item label="Feminino" value="F"/>
                </SelectModal>
            }
        </SafeAreaView>
    )
}