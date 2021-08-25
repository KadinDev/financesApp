import React, {useContext} from 'react';
import {View, Text, Image } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { AuthContext } from '../../contexts/auth';

export function CustomDrawer(props){ //quando coloco props, trás todo o menu do Drawer tbm para juntar com a personalização que fiz
    
    const { user, signOut } = useContext(AuthContext);
    
    return(
        <DrawerContentScrollView {...props} >

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={{width: 85, height: 85}}
                    resizeMode='contain'
                />

                <Text style={{color:'#fff', fontSize: 16, marginTop: 5}}>Bem-vindo</Text>

                <Text style={{color:'#fff', fontSize: 20, fontWeight: 'bold', paddingBottom: 25 }}>
                    { user && user.nome }
                </Text>
            </View>

            <DrawerItemList 
                {...props} //todas as propriedades
            />

            <DrawerItem
                {...props}
                label="Sair do app"
                inactiveBackgroundColor='#c62c36'
                onPress={ () => signOut()}
            />
        
        </DrawerContentScrollView>
    )
}