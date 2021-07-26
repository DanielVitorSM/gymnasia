import React from 'react';
import { PieChart } from 'react-native-svg-charts'

import { styles } from './styles';

type Props = {
    imc: number;
}

export function ChartIMC({ imc }: Props) {
    const data = [
        {
            key: 1,
            value: 10,
            svg: { fill: '#1C424A' },
            arc: { outerRadius: imc <= 18.5 ? "150%" : '100%' }
        },
        {
            key: 2,
            value: 30,
            svg: { fill: '#0EFF00' },
            arc: { outerRadius: imc > 18.5 && imc <= 24.9 ? "150%" : '100%' }
        },
        {
            key: 3,
            value: 22,
            svg: { fill: '#FFD800' },
            arc: { outerRadius: imc > 24.9 && imc <= 29.9 ? "150%" : '100%' }
        },
        {
            key: 4,
            value: 15,
            svg: { fill: '#FF7A00' },
            arc: { outerRadius: imc > 29.9 && imc <= 34.9 ? "150%" : '100%' }
        },
        {
            key: 5,
            value: 12,
            svg: { fill: '#FF0000' },
            arc: { outerRadius: imc > 34.9 ? "150%" : '100%' }
        }
    ]

    return (
        <PieChart
            style={styles.chart}
            outerRadius={'60%'}
            innerRadius={30}
            data={data}
        />
    )
}