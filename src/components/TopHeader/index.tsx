import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, Pressable, StatusBar } from 'react-native';

import MenuIconSVG from '../../assets/icons/menu-bar-alt.svg';
import SearchIconSVG from '../../assets/icons/search-alt.svg';
import ConfigIconSVG from '../../assets/icons/settings-alt.svg';
import { theme } from '../../global/styles/theme';
import { typography } from '../../global/styles/typography';

import { styles } from './styles';

type Props = {
    title: string;
    extra?: "search" | "config" | "none";
    searchValue?: string;
    onSeachChange?: (text: string) => void;
    onRightButtonClick?: () => void;
}

export function TopHeader({ 
    title, 
    extra="none", 
    searchValue="", 
    onSeachChange=() => {}, 
    onRightButtonClick=() => {} 
}: Props) {
    const Navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor={theme.colors.primary_dark}
                translucent={false}
            /> 
            <View style={styles.menu}>
                <Pressable 
                    style={styles.button}
                    hitSlop={50}
                    onPress={() => Navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <MenuIconSVG />
                </Pressable>

                {
                    extra === "search"
                    &&
                    <TextInput
                        style={[typography.small300, styles.input]}
                        value={searchValue}
                        onChangeText={onSeachChange}
                        placeholder="Pesquisar..."
                    />
                }

                <Pressable 
                    style={styles.button}
                    hitSlop={50}
                    onPress={onRightButtonClick}
                    disabled={extra === "none"}
                >
                    {
                        extra === "config"
                        &&
                        <ConfigIconSVG />
                    }
                    {
                        extra === "search"
                        &&
                        <SearchIconSVG />
                    }
                </Pressable>
            </View>
            <Text style={[typography.heading700, { paddingLeft: 20 }]}>{ title }</Text>
        </View>
    )
}
