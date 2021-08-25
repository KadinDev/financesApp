//como instalamos a parte de navegação precisa desse aqui
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// tudo que estiver dentro do AuthProvider agora terá acesso
// as informações que estão dentro dele.
import { AuthProvider } from './src/contexts/auth';

import { Routes } from './src/routes/index';

console.disableYellowBox=true;

export default function App(){
  return (
    <NavigationContainer style={styles.container}>

      <AuthProvider
        //agora só colocar ele por volta dos componentes que quero que tenha
        // acesso as info dentro do Provider
      >

        <StatusBar backgroundColor='#131313' barStyle='light-content' />
        <Routes/>

      </AuthProvider>

    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4f4f',
    alignItems: 'center',
  }
})