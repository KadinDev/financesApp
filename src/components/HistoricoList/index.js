import React from 'react';
import {
    Container,
    Tipo,
    IconView,
    TipoText,
    ValorText
} from './styles';

import { TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

export function HistoricoList( { data, deleteItem } ){
    return (
        <TouchableWithoutFeedback
            onLongPress={ () => deleteItem(data) } // para o clique de segurar a tela
        >
            <Container>
                <Tipo>
                    <IconView 
                        //para o IconView mando uma prop chama tipo, e passo o data.tipo para ela
                        //assim posso pegar e controlar no styled components
                        tipo={data.tipo} >
                        
                        <Icon 
                            name={ data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up' } 
                            color="#FFF" 
                            size={20} 
                        />
                        <TipoText> { data.tipo } </TipoText>
                    </IconView>
                </Tipo>

                <ValorText>
                    { data.tipo === 'despesa' ? `- R$ ${data.valor}` : `R$ ${data.valor}` } 
                    
                </ValorText>
            </Container>
        </TouchableWithoutFeedback>
    )
}