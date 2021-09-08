import React from 'react'
import { ActivityIndicator, ImageBackground, SafeAreaView, StatusBar, View } from 'react-native'

import BackgroundJPG from '../../assets/background.jpg';
import LogoSVG from '../../assets/logo.svg';
import { styles } from './styles';

export function LoadScreen() {
    return (
        <SafeAreaView
            style={styles.container}
        >
            <ImageBackground
                source={BackgroundJPG}
                style={styles.content}
            >   
                <StatusBar hidden/>
                <LogoSVG style={styles.logo}/>
                <ActivityIndicator color="red" size={30} style={styles.load}/>
            </ImageBackground>
        </SafeAreaView>
    )
}
