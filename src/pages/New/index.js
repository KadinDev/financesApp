import React, { useState, useContext } from 'react';

//TouchableWithoutFeedback para fechar teclado clicando em qualquer lugar da tela
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { format } from 'date-fns';

import { useNavigation } from '@react-navigation/native';

import {
    Background,
    Input,
    SubmitButton,
    SubmitText
} from './styles';

import { Header } from '../../components/Header';
import { Picker } from '../../components/Picker';

import firebase  from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';

export function New(){

    const navigation = useNavigation();

    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('receita');

    //pega user e renomeia para usuario
    const { user: usuario } = useContext(AuthContext);

    function handleSubmit(){
        
        Keyboard.dismiss();
        
        //isNaN(parseFloat(valor) se realmente é um número
        if(isNaN(parseFloat(valor)) || tipo === null ) {
            Alert.alert('Preencha todos os campoes!');
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${tipo} - Valor: ${parseFloat(valor)} `,

            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )

    }

    async function handleAdd(){
        //pega o id da pessoa logada
        let uid = usuario.uid;

        //gerando chave aleatória e armazena dentro da key
        let key = await (await firebase.database().ref('historico').child(uid).push()).key;
        
        // passa os dados
        await firebase.database().ref('historico').child(uid).child(key).set({
            tipo: tipo,
            valor: parseFloat(valor),
            date: format(new Date(), 'dd/MM/yyyy' )  
        })

        // atualizar o saldo
        let user = firebase.database().ref('users').child(uid);
        await user.once('value').then( (snapshot) => {
            let saldo = parseFloat(snapshot.val().saldo);

            // -= pegando o saldo que tem, igual ao saldo menos o valor enviado
            // += pega o saldo e soma com o valor enviado
            tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor);
            
            //acessa o saldo e passa o saldo atualizado
            user.child('saldo').set(saldo);
        });

        Keyboard.dismiss();
        setValor('');
        navigation.navigate('Home');
    
    }

    return (
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } >
            <Background>
                <Header />

                <SafeAreaView style={{alignItems: 'center'}}>
                    <Input
                        placeholder="Valor Desejado"
                        keyboardType="numeric"
                        returnKeyType="next"

                        //assim cancela o botao de enviar do teclado, quando clicar
                        //enviar ele não envia, ele vai fechar o teclado
                        onSubmitEditing={ () => Keyboard.dismiss() }

                        value={valor}
                        onChangeText={ (text) => setValor(text) }
                    />

                    <Picker
                        //chamo de onChange e passo o setTipo para manipular Picker
                        onChange={setTipo}
                        tipo={tipo}
                    />


                    <SubmitButton
                        activeOpacity={0.7}
                        onPress={handleSubmit}
                    >
                        <SubmitText> Registrar </SubmitText>
                    </SubmitButton>
                </SafeAreaView>

            </Background>
        </TouchableWithoutFeedback>
    )
};