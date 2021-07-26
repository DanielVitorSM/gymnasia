import React from 'react'
import { FontAwesome } from '@expo/vector-icons'; 
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

export function NextButton({ enabled = true, ...rest }: RectButtonProps) {
    return (
        <RectButton style={[styles.container, !enabled && styles.desactive]} {...rest}>
            <FontAwesome style={styles.nextButtonIcon} name="chevron-right" size={20} color="black" />
        </RectButton>
    )
}

export function PreviousButton({ enabled = true, ...rest }: RectButtonProps) {
    return (
        <RectButton style={[styles.container, !enabled && styles.desactive]} {...rest}>
            <FontAwesome style={styles.prevButtonIcon} name="chevron-left" size={20} color="black" />
        </RectButton>
    )
}