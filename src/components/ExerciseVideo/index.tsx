import * as React from 'react';
import { Video, VideoProps } from 'expo-av';
import { Alert } from 'react-native';

import { styles } from './styles';

export function ExerciseVideo(props: VideoProps) {
    return (
        <Video
            isMuted
            shouldPlay
            resizeMode="contain"
            isLooping
            style={styles.video}
            renderToHardwareTextureAndroid
            removeClippedSubviews
            { ...props }
        />
    );
}