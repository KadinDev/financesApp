import React, { useContext, useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import { Header } from '../../components/Header';

import firebase from '../../services/firebaseConnection';
import { format, isPast, isBefore } from 'date-fns';

import {
    Background,
    Container,
    Nome,
    Saldo,
    Title,
    List,
    Area
} from './styles';

import { HistoricoList } from '../../components/HistoricoList';
import { DatePicker } from '../../components/DatePicker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

export function Home(){

    //signOut vindo do auth linha 123
    const { user } = useContext(AuthContext);

    // se tiver user logado pega o uid dele
    const uid = user && user.uid;

    const [historico, setHistorico] = useState([]);
    const [saldo, setSaldo] = useState(0);

    const [ newDate, setNewDate ] = useState(new Date());
    const [ show, setShow ] = useState(false) //calendário começa fechado

    useEffect( () => {
        async function loadList(){
            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            });

            //agora pega o historico
            await firebase.database().ref('historico')
            .child(uid)
            .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy')) //equalTo, pegar as datas que forem no formato da data de hoje
            .limitToLast(10).on('value', (snapshot) => { //.limitToLast(10) pegar sempre os ultimos 10
                setHistorico([]); //zera o array

                snapshot.forEach( (childItem) => {
                    let list = {
                        // nomes tem que ser iguais os do firebase
                        key: childItem.key,
                        tipo: childItem.val().tipo,
                        valor: childItem.val().valor,
                        
                        date: childItem.val().date,
                    };

                    setHistorico( oldArray => [...oldArray, list ].reverse() );
                } )
            } )
        }
        loadList();
    
    }, [newDate] ); //passe newDate para cá, agora toda vez que houver mudanãs nessa const
    // vai chamar o useEffect novament e ordenando de acordo com a newDate acima, linha 49

    function handleDelete(data){

        //desse modo irá poder excluir apenas os item cadastrados na data de hoje,
        //se vc deseja excluir todos os items não importa a data é só apagar
        //esses e deixar apenas o alert abaixo

        // pegando data do item
        const [diaItem, mesItem, anoItem] = data.date.split('/');
        const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

        //pegando data de hoje
        const formatDiaHoje = format(new Date(), 'dd/MM/yyyy' );
        const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/');
        const dateHoje = new Date(`${diaHoje}/${mesHoje}/${anoHoje}`);

        // isPast para verificar se a data já passou
        //se passou isPast devolve true, se não false.
        //isBefore compara se a primeira data é anterior a segunda
        if ( isBefore(dateItem, dateHoje) ){
            // se a data do registro já passou vai entrar aqui!
            alert('você não pode excluir um registro angito!');
            return;
        }

        Alert.alert(
            'Cuidado Atenção!',
            `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Deletar',
                    onPress: () => handleDeleteSuccess(data)//passa a data, apagará toda a data
                }
            ]
        )
    };

    async function handleDeleteSuccess(data){
        await firebase.database().ref('historico')
        .child(uid).child(data.key).remove()
        .then( async() => {
            let saldoAtual = saldo;

            // se eu apagar uma despesa, vai pegar o valor de despesa e adicionar no saldo 
            // se eu apagar uma receita vai diminuir no salário o valor de tal
            data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);
            
            await firebase.database().ref('users').child(uid)
            .child('saldo').set(saldoAtual);
        
        } )

        .catch( (error ) => {
            console.log(error);
        } )
    };

    function handleShowPicker(){
        setShow(true)
    };

    function handleClose(){
        setShow(false)
    };

    const onChangeDate = (date) => {
        setShow(Platform.OS === 'ios');
        setNewDate(date)

    }
    
    return (
        <Background>
            <Header/>
            <Container>
                <Nome> { user && user.nome } </Nome>
                <Saldo> R$ { saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') } </Saldo>
            </Container>
            
            <Area>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleShowPicker}
                >
                    <Icon name='event' color="#fff" size={30} />
                </TouchableOpacity>

                <Title> Últimas movimentações </Title>
            </Area>


            <List
                showsVerticalScrollIndicator={false}
                data={historico}
                keyExtractor={ item => item.key }
                renderItem={ ({item}) => ( 
                    //passando o item através de props, chamado data,
                    //para manipular lá
                
                    <HistoricoList data={item} deleteItem={handleDelete} /> 
                
                ) }
            />

            {
                show && ( // se o show tiver true renderiza o DatePicker
                    <DatePicker
                        onClose={handleClose}
                        date={newDate}
                        onChange={onChangeDate}
                    />
                )
            }

        </Background>
    )
}