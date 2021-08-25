import React, { useContext } from 'react';

import { 
    Container,
    Nome,
    NewLink,
    NewText,
    Logout,
    LogoutText
} from './styles';


import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import { Header } from '../../components/Header';

export function Profile() {

    const navigation = useNavigation();
    const { user, signOut } = useContext(AuthContext)

    return (
        <Container>

            <Header />
            
            <Nome
                //se tiver usuario mostre o nome dele
            >
                { user && user.nome }
            </Nome>
            <NewLink
                activeOpacity={0.7}
                onPress={ () => navigation.navigate('Registrar') }
            >
                <NewText> Registrar gastos </NewText>
            </NewLink>

            <Logout
                activeOpacity={0.7}

                // função anômina, só vai deslogar quando eu clicar nessa função anônima
                // se passo direto ( onPress={signOut()} ), vai chamar(deslogar) automaticamente
                onPress={ () => signOut() }
            >
                <LogoutText> Sair </LogoutText>
            </Logout>

        </Container>
    )
}