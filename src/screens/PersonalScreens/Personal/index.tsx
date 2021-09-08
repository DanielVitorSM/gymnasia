import React from 'react';
import { SafeAreaView } from 'react-native';

import { Header } from '../../../components/Header';
import { styles } from './styles';

export function Personal() {
    return (
        <SafeAreaView style={styles.container}>
            <Header name="Personal"/>
        </SafeAreaView>
    )
}
