import React from 'react';
import { Text, PressableProps, StyleProp, ViewStyle, Pressable, View, ActivityIndicator } from 'react-native';
import { theme } from '../../global/styles/theme';
import { typography } from '../../global/styles/typography';

import { styles } from './styles';

type Props = PressableProps & {
    text?: string;
    enabled?: boolean;
    style?: StyleProp<ViewStyle>;
    loading?: boolean;
}

export function PrimaryButton({ text = "Continuar", enabled = true, loading = false, style, ...rest }: Props) {
    return (
        <View style={[styles.container, style]}>
            <Pressable
                style={[styles.button, !enabled && styles.disabled ]}
                disabled={!enabled}
                android_ripple={{
                    color: theme.colors.overlay
                }}
                { ...rest }
            >
                {
                    loading
                    ?
                    <ActivityIndicator 
                        color={theme.colors.white} 
                        size={24} 
                    />
                    :
                    <Text style={[typography.text500, styles.text]}>
                        { text }
                    </Text>
                }
            </Pressable>
        </View>
    )
}
