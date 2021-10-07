import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import MenuIconSVG from '../../assets/icons/menu-bar-alt.svg';
import BackIconSVG from '../../assets/icons/arrow-left-alt.svg';
import SearchIconSVG from '../../assets/icons/search-alt.svg';
import SettingsIconSVG from '../../assets/icons/settings-alt';
import { theme } from '../../global/styles/theme';
import { typography } from '../../global/styles/typography';

import { styles } from './styles';

type Props = {
    title: string;
    extra?: "search" | "config" | "none";
    leftBack?: boolean;
    onSeachChange?: (text: string) => void;
    onRightButtonClick?: () => void;
}

export function TopHeader({ 
    title, 
    extra="none",
    leftBack = false,
    onSeachChange=() => {}, 
    onRightButtonClick=() => {} 
}: Props) {
    const Navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Pressable 
                    style={styles.button}
                    hitSlop={50}
                    onPress={() => leftBack ? Navigation.goBack() : Navigation.dispatch(DrawerActions.openDrawer())}
                >
                    {
                        leftBack
                        ?
                        <BackIconSVG />
                        :
                        <MenuIconSVG />
                    }
                </Pressable>

                {
                    extra === "search"
                    &&
                    <TextInput
                        style={[typography.small300, styles.input]}
                        onChangeText={onSeachChange}
                        placeholder="Pesquisar..."
                    />
                }

                <Pressable 
                    style={styles.button}
                    hitSlop={50}
                    onPress={() => extra === "config" ? Navigation.navigate("Configurações") : onRightButtonClick}
                    disabled={extra === "none"}
                >
                    {
                        extra === "config"
                        &&
                        <SettingsIconSVG width={32} height={32} fill={theme.colors.primary_light}  />
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
