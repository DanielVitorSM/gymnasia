import React, { ReactNode } from 'react';
import { View, Text, Modal, ModalProps } from 'react-native';
import { theme } from '../../global/styles/theme';
import { typography } from '../../global/styles/typography';

import { PrimaryButton } from '../PrimaryButton';
import { styles } from './styles';

type Props = ModalProps & {
    title?: string;
    children?: ReactNode;
    hasBack?: boolean;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export function ModalTime({ title = "Informe o horário", hasBack = true, onCancel = () => {}, onSubmit = () => {}, children, ...rest }: Props) {
    return (
        <Modal
            statusBarTranslucent
            transparent
            animationType="fade"
            onDismiss={onCancel}
            {...rest}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={[typography.small700, { textAlign: "center", marginBottom: 15 }]}>
                        { title }
                    </Text>

                    { children }

                    <PrimaryButton
                        text="Confirmar"
                        style={{ width: "auto", marginTop: 15 }}
                        onPress={onSubmit}
                    />
                    {
                        hasBack &&
                        <PrimaryButton
                            text="Voltar"
                            style={{ width: "auto", marginTop: 5, backgroundColor: theme.colors.gray_medium }}
                            onPress={onCancel}
                        />
                    }
                </View>
            </View>
        </Modal>
    )
}
