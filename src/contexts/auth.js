// contextos
// a criação de context para compartilhar dados do usuário nas telas
// que queremos copartilhar, no caso quando o user logar, vamos pegar as informações
// noma, foto, etc.. e compartilhar com outras telas pra não ter que ficar procurando
// em toda tela nova.

import React, { createContext, useState, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export function AuthProvider( { children } ) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuth, setLoadingAuth] = useState(false);

    //verificar se tem alguém logado e mostrar a page Home, se não tiver manda para
    // a tela de login
    useEffect( () => {
        async function loadStorage(){
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser){[]
                // JSON.parse converte novamente para JSON
                setUser( JSON.parse(storageUser) );
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, [] );

    // cadastrar usuário
    async function signUp(nome, email, password, repeatPassword){

        setLoadingAuth(true);

        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                saldo: 0,
                nome: nome,
                pass: password,
                repeatPass: repeatPassword,
            })

            //aqui vai para a parte de authentication
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome, //nome é opcional
                    email: value.user.email.trim(),
                };
                setUser(data);

                storageUser(data);
                setLoadingAuth(false);

            } ) 
        } )
        .catch( (error) => {
            alert(error.code);
            setLoadingAuth(false);
        } )
    };

    // logar usuário
    async function signIn(email, password) {

        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then ( async ( value ) => {
            let uid = value.user.uid;
            // .once = eu quero pegar uma única vez
            await firebase.database().ref('users').child(uid).once('value')
            .then( (snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                };

                setUser(data);

                storageUser(data);
                setLoadingAuth(false);

            })
        } )
        .catch( (error) => {
            alert(error.code);
            setLoadingAuth(false);
        } )
    };

    // deslogar usuário
    async function signOut(){
        await firebase.auth().signOut();

        // limpar o asyncstorage
        await AsyncStorage.clear()
        .then( () => {
            setUser(null); //após limpar o setUser volta a ser null
        } )
    }


    // salvando login no async storage para quando atualizar o app não perder a sessão de login
    // JSON.stringiy(data), transformando data em string pois não pode ir como objeto
    async function storageUser(data){
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data) )
    }

    return (
        <AuthContext.Provider 
        // tudo que estiver por volta desse contexto agora, terá acesso as informações,
        // passadas aqui
        //signed para verificar se tem algum usuario
        
        // !!user, converte o null da linha 13 para bollean (true ou false)
        // signUp, estou exportando a função para o provider
        value={{ 
            
            signed: !!user, 
            user, 
            signUp, //cadastrar 
            signIn, //logar
            signOut, //deslogar, acessar ele no Home
            loading,
            loadingAuth
        }} >

            {children} 

        </AuthContext.Provider>
    )
}
