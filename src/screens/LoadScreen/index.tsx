import React from 'react'
import { ActivityIndicator, ImageBackground, SafeAreaView, StatusBar } from 'react-native'

import BackgroundJPG from '../../assets/background.jpg';
import { theme } from '../../global/styles/theme';
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
                <ActivityIndicator color={theme.colors.pink_cardinal} size={30} style={styles.load}/>
            </ImageBackground>
        </SafeAreaView>
    )
}
