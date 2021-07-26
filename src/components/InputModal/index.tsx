import React, { Dispatch, SetStateAction, useState, ReactNode } from 'react'
import { View, Text, Modal, TextInput, KeyboardAvoidingView, Keyboard, Platform, TextInputProps, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import { theme } from '../../global/styles/theme'
import { styles } from './styles'

export type OnSubmitType = (value: string) => Error | void;

type ModalBasicProps = {
    title: string;
    visible: boolean;
    children: ReactNode;
    handleCloseModal: () => void;
    handleUnfocusedInput?: () => void;
    handleSubmit: () => any;
}

type ModalProps = {
    title: string;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    onSubmit: OnSubmitType;
}

type InputProps = ModalProps & TextInputProps;

type SelectProps = ModalProps & {
    initialValue: string;
    children?: ReactNode;
}

export function InputModal({ setVisible, onSubmit, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(){
        if(!value)
            return setError("Não deixe vazio");
        try{
            onSubmit(value);
            setValue("");
            setVisible(false);
        }catch(err){
            setError(err.message);
        }
    }

    function handleUnfocusedInput(){
        setIsFocused(false);
        Keyboard.dismiss();
    }

    function handleCloseModal(){
        setVisible(false);
    }

    function handleFocusInput(){
        setIsFocused(true);
        setError("");
    }

    return (
        <ModalBasic {...rest} handleUnfocusedInput={handleUnfocusedInput} handleSubmit={handleSubmit} handleCloseModal={handleCloseModal}>
            <TextInput 
                {...rest}
                value={value}
                onChangeText={setValue}
                onFocus={handleFocusInput}
                style={[
                    styles.input, 
                    isFocused && styles.active,
                    error !== "" && styles.error
                ]}
            />
            {
                error != "" &&
                <Text style={styles.errorLabel}>{error}</Text>
            }
        </ModalBasic>
    )
}

export function SelectModal({ initialValue, setVisible, onSubmit, children, ...rest }: SelectProps) {
    const [value, setValue] = useState("");

    function handleSubmit(){
        onSubmit(value);
        setValue("");
        setVisible(false);
    }

    function handleCloseModal(){
        setVisible(false);
    }

    return (
        <ModalBasic {...rest} handleCloseModal={handleCloseModal} handleSubmit={handleSubmit}>
            <Picker
                selectedValue={initialValue}
                onValueChange={setValue}
                style={styles.select}
                dropdownIconColor="black"
            >
                { children }
            </Picker>
        </ModalBasic>
    )
}

function ModalBasic({ title, visible, children, handleCloseModal, handleUnfocusedInput, handleSubmit,...rest }: ModalBasicProps){
    return (
        <Modal
            visible={visible || false}
            statusBarTranslucent
            transparent
            animationType="slide"
        >
                <View style={styles.overlay}
                    onTouchStart={handleUnfocusedInput}
                >
                    <KeyboardAvoidingView 
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={0}
                        style={styles.align}
                    >
                            <View style={styles.content}>
                                <Text style={styles.label}>{ title }</Text>
                                <View>
                                    { children }
                                </View>
                                <TouchableOpacity 
                                    onPress={handleCloseModal}
                                    style={[
                                        styles.button, 
                                        { backgroundColor: theme.colors.white_smoke}
                                    ]}
                                >
                                    <Text style={styles.text}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  
                                    activeOpacity={0.9}
                                    onPress={handleSubmit} 
                                    style={styles.button}
                                >
                                    <Text style={[
                                        styles.text, 
                                        { color: theme.colors.white_smoke}
                                    ]}
                                    >Alterar</Text>
                                </TouchableOpacity>
                            </View>
                    </KeyboardAvoidingView>
                </View>
        </Modal>
    )
}