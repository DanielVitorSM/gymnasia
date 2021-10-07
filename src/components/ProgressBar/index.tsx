import React from 'react';
import { Dimensions, View } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
    progress: number;
}

/**
 * Render Horizontal Progress Bar
 * @param progress 0 - 1;
 */

export function ProgressBar({ progress }: Props) {
    return (   
        <View style={styles.container}>
            <Svg 
                style={{flex: 1}}
                    width={Dimensions.get("screen").width}
                    height={5}
            >
                <Rect
                    x="0"
                    y="0"
                    width="100%"
                    height={10}
                    fill={theme.colors.black}
                />
                <Rect
                    x="0"
                    y="0"
                    width={`${progress * 100}%`}
                    height={"100%"}
                    fill={theme.colors.yellow_sun}
                />
            </Svg>
        </View>
    )
}
