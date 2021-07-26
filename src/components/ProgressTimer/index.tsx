import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Svg, { Defs, ClipPath, Rect } from 'react-native-svg';
import { addSeconds, format,differenceInSeconds } from 'date-fns';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

type Props = {
    progress: number;
}

/**
 * Retorna um elemento timer com um progressbar
 * @param progress 0 - 1;
 */

export function ProgressTimer({ progress }: Props) {
    const [width, setWidth] = useState(0);
    // let helper = addSeconds(new Date(0), spendTime);
    // let time = format(helper, "mm:ss");

    return (
        <View style={styles.container}>
            {/* <Text style={styles.text} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>{ time }</Text> */}
            <Svg 
            style={{flex: 1}}
                width={width}
                height={20}
                viewBox="0 0 100 10"
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
                    fill={theme.colors.primary}
                />
            </Svg>
        </View>
    )
}
