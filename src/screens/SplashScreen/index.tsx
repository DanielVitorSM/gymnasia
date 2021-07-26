import React from 'react';
import { View, ImageBackground } from 'react-native';

import Background from '../../../assets/splash.png';

export function SplashScreen() {
    return (
        <ImageBackground 
            source={Background}
            style={{
                flex: 1
            }}
        />
    )
}
