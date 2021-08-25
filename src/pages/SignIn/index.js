import React, { useRef, useState, useContext } from 'react';
import { 
    Platform,
    ActivityIndicator
} from 'react-native';

//agora para poder navegar para criar uma conta
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth';

import  {
    Background,
    Container,
    Logo,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText
} from './styles';

import * as Animatable from 'react-native-animatable';

export function SignIn(){

    const navigation = useNavigation();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // para logar
    const { signIn, loadingAuth } = useContext(AuthContext);
    function handleLogin(){
        signIn(email, password);
    }
    //
    
    return (
        <Background>
            <Container
                behavior={ Platform.OS === 'ios' ? 'padding' : '' }
                enable
            >
                <Logo
                    source={require('../../assets/Logo.png')}
                />

                <Animatable.View 
                    animation='flipInY'
                    duration={1200}
                    style={{flexDirection: 'row'}}>
                    
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize="none"

                        value={email}
                        onChangeText={ (text) => setEmail(text) }
                    />
                </Animatable.View>

                <Animatable.View 
                    animation='flipInY'
                    duration={1700}
                    style={{flexDirection: 'row'}}>

                    <Input
                        placeholder="Senha"
                        autoCorrect={false}
                        autoCapitalize="none"
                        
                        value={password}
                        onChangeText={ (pass) => setPassword(pass) }

                        secureTextEntry={true}
                    />
                </Animatable.View>

                <SubmitButton
                    animation='flipInY'
                    duration={2200}
                    activeOpacity={0.7}

                    onPress={handleLogin}
                >

                    {
                        loadingAuth ? (
                            <ActivityIndicator size={30} color="#FFF" />
                        ) : (
                            <SubmitText>Entrar</SubmitText>
                        )
                    }

                </SubmitButton>

                <Link
                    activeOpacity={0.7}
                    onPress={ () => navigation.navigate('SignUp') }
                >
                    <LinkText> criar uma conta! </LinkText>
                </Link>

            </Container>
        </Background>
    )
};

