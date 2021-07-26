import React, { ReactNode } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import BackgroundJpg from '../../assets/background.jpg';
import { styles } from './styles';

type Props = {
    children: ReactNode;
}

export function BackgroundImage({ children }: Props) {
    return (
        <ImageBackground
            source={BackgroundJpg}
            resizeMode="cover"
            style={styles.container}
        >
            { children }
        </ImageBackground>
    )
}
