import React from 'react';

// só estou renomeando o Picker para RNPickerSelect
import { Picker as RNPickerSelect } from '@react-native-community/picker';
import { PickerView } from './styles';


export function Picker( { onChange, tipo } ){
    return (
        <PickerView>

            <RNPickerSelect
                style={{
                    width: '100%'
                }}
                
                selectedValue={tipo}
                onValueChange={ (valor) => onChange(valor) }
                
            >
                <RNPickerSelect.Item label="Receita" value="receita" />
                <RNPickerSelect.Item label="Despesa" value="despesa" />
            
            </RNPickerSelect>

        </PickerView>
    )
}