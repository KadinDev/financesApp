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
                
                selectedValue={tipo} //tipo vindo da linha 21 do index New

                // pega o valor e passa para o onChange, que vai mandar para o setIpo
                //linha 44, e setTipo linha 21
                onValueChange={ (valor) => onChange(valor) }
                
            >
                <RNPickerSelect.Item label="Receita" value="receita" />
                <RNPickerSelect.Item label="Despesa" value="despesa" />
            
            </RNPickerSelect>

        </PickerView>
    )
}