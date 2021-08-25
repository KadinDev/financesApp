import React, { useState } from 'react';

import { 
    Container,
    Header
} from './styles';

import { Platform, TouchableOpacity, Text } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export function DatePicker( { onClose, date, onChange }){

    //new Date(date) começa com a date que estou recebendo
    const [dateNow, setDateNow] = useState(new Date(date));

    return (
        <Container>
            { Platform.OS === 'ios' && (
                <Header>
                    <TouchableOpacity onPress={onClose}>
                        <Text> Fechar </Text>
                    </TouchableOpacity>
                </Header>
            ) }
            <DateTimePicker
                value={dateNow}
                mode="date"
                display="default"
                onChange={ (event, date) => {
                    // se não tiver nenhuma data manda o dateNow
                    const currentDate = date || dateNow;

                    setDateNow(currentDate);
                    onChange(currentDate);
                } }

                style={{ backgroundColor: 'white' }}
            />
        </Container>
    )
}