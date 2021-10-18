import * as React from 'react';
import { Video, VideoProps } from 'expo-av';
import { Alert } from 'react-native';

import { styles } from './styles';

export function ExerciseVideo(props: VideoProps) {
    function handleError(){
        Alert.alert("Erro ao carregar o vídeo", "Houve um erro ao carregar o vídeo do exercício, tente novamente.");
    }

    return (
        <Video
            isMuted
            shouldPlay
            resizeMode="contain"
            isLooping
            style={styles.video}
            onError={handleError}
            { ...props }
        />
    );
}