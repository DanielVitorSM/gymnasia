import React from 'react';
import { View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

type WeightChartType = {
    x: number;
    y: number;
}

export function ChartWeight() {
    const data: Array<WeightChartType> = [ {x: 1, y: 2}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 5, y: 20}];
    
    const axesSvg = { 
        fontSize: 8,
        fontFamily: theme.fonts.text400,
        fill: theme.colors.secondary_80
    }

    const verticalContentInset = { 
        top: 10, 
        bottom: 10 
    }

    return (
        <View style={styles.container}>
            <View style={styles.ycontent}>
                <YAxis
                    data={data}
                    style={styles.y}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    yAccessor={({item}) => item.y}
                />
            </View>
            <View style={styles.content}>
                <LineChart
                    style={styles.chart}
                    data={data}
                    contentInset={verticalContentInset}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    xAccessor={({item}) => item.x}
                    yAccessor={({item}) => item.y}
                >
                    <Grid/>
                </LineChart>
                <XAxis
                    style={styles.x}
                    data={data}
                    formatLabel={(value) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                    xAccessor={({item}) => item.x}
                />
            </View>
        </View>
    )
}