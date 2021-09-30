import React from 'react'
import { View, Text, TouchableHighlight, Image, TouchableHighlightProps } from 'react-native'

import { IExerciseObject } from '../../data/exercises';
import RightIconSVG from '../../assets/icons/right-alt.svg';
import { styles } from './styles';
import { typography } from '../../global/styles/typography';
import { theme } from '../../global/styles/theme';

type Props = TouchableHighlightProps & {
    data: IExerciseObject;
}

export function ItemExercise({ data, ...rest }: Props){
    return(
        <View style={styles.container}>
            <TouchableHighlight 
                style={styles.button}
                activeOpacity={.5}
                underlayColor={theme.colors.gray_light}
                { ...rest }
            >
                <>
                <Image 
                    source={data.image}
                    resizeMode="cover"
                    style={styles.image}
                />
                <View style={styles.group}>
                    <Text 
                        numberOfLines={1} 
                        style={[
                            typography.info700, 
                            { color: theme.colors.pink_cardinal, textTransform: 'uppercase' }
                        ]}
                    >
                        { data.capacity }
                    </Text>
                    <Text 
                        numberOfLines={1} 
                        style={[
                            typography.text700, 
                            { paddingBottom: 5 }
                        ]}
                    >
                        { data.name }
                    </Text>
                    <Text 
                        numberOfLines={2} 
                        style={typography.info300}
                    >
                        { data.muscles }
                    </Text>
                </View>
                <RightIconSVG />
                </>
            </TouchableHighlight>
        </View>
    )
}