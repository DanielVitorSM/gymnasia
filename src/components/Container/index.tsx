import React, { ReactNode } from 'react'
import { SafeAreaView, ImageBackground, KeyboardAvoidingView, View, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { PreviousButton, NextButton } from '../NavButtons';

import LogoSvg from '../../assets/logo.svg';
import BackgroundJpg from '../../assets/background.jpg';
import { styles } from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type Props = {
    children: ReactNode;
    keyboardAvoid?: boolean;
    navButtons?: boolean;
    enabledPrevious?: boolean;
    enabledNext?: boolean;
    onNextPress?: () => void;
    onPreviousPress?: () => void;
    onTouchOutside?: () => void;
}

export function Container({ children, keyboardAvoid = false, enabledNext = false, navButtons = false, enabledPrevious = true, onNextPress, onPreviousPress, onTouchOutside }: Props) {
    const Navigation = useNavigation();

    function handleGoBack(){
        Navigation.goBack();
    }
    function handleDimissKeyboard(){
        Keyboard.dismiss();
    }

    function handleNextButton(){
        if(enabledNext && onNextPress)
            onNextPress()
    }

    return (
        <TouchableWithoutFeedback 
            style={styles.outside} 
            containerStyle={styles.outside}  
            accessible={false} 
            onPress={onTouchOutside || (keyboardAvoid ? handleDimissKeyboard : () => {})}
        >
        <ImageBackground
                source={BackgroundJpg}
                resizeMode="cover"
                style={styles.image}
            >
                {
                    keyboardAvoid 
                    ?
                    <KeyboardAvoidingView
                        behavior="height"
                        
                        keyboardVerticalOffset={10} 
                        style={styles.container}
                    >
                        <LogoSvg style={styles.logo}/>
                        { children }
                        {
                            navButtons &&
                            <View style={styles.buttons}>
                                <PreviousButton onPress={onPreviousPress || handleGoBack}/>
                                <NextButton enabled={enabledNext} onPress={onNextPress}/>
                            </View>
                        }
                    </KeyboardAvoidingView>
                    :
                    <SafeAreaView
                        style={styles.container}
                    >
                        <LogoSvg style={styles.logo}/>
                        { children }
                        {
                            navButtons &&
                            <View style={styles.buttons}>
                                <PreviousButton enabled={enabledPrevious} onPress={onPreviousPress || handleGoBack}/>
                                <NextButton enabled={enabledNext} onPress={handleNextButton}/>
                            </View>
                        }
                    </SafeAreaView>
                }
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}