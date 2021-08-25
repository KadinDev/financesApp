import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Home } from '../pages/Home';
import { New } from '../pages/New';
import { Profile } from '../pages/Profile'; 
import { CustomDrawer } from '../components/CustomDrawer'; 

const AppDrawer = createDrawerNavigator();

export function AppRoutes(){
    return(
        <AppDrawer.Navigator

            //estou passando pro CustomDrawer todas as propriedades
            // o CustomDrawer agora é todo o menu do drawer / personalizado
            drawerContent={ (props) => <CustomDrawer {...props} /> }

            drawerStyle={{
                backgroundColor: '#171717',
                width: 200
            }}
            drawerContentOptions={{
                labelStyle: {
                    fontWeight: 'bold'
                },
                activeTintColor: '#FFF',
                activeBackgroundColor: '#00b94a',
                inactiveBackgroundColor: '#000',
                inactiveTintColor: '#ddd',
                itemStyle: {
                    marginVertical: 5,
                }
            }}
        >
            
            <AppDrawer.Screen name='Home' component={Home} />

            <AppDrawer.Screen name='Registrar' component={New} />

            <AppDrawer.Screen name='Perfil' component={Profile} />


        </AppDrawer.Navigator>
    )
};
