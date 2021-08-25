import React, { useRef, useState, useContext } from 'react';
import { 
    Platform,
    ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../contexts/auth';

import  {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
} from './styles';


export function SignUp(){

    const [ nome, setNome ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    
    // para cadastrar
    const { signUp, loadingAuth } = useContext(AuthContext);
    function handleSignUp(){
        signUp(nome, email, password, repeatPassword)
    }
    //
    

    return (
        <Background>
            <Container
                behavior={ Platform.OS === 'ios' ? 'padding' : '' }
                enable
            >
                
                <AreaInput>
                    <Input
                        placeholder="Nome"
                        autoCorrect={false}
                        autoCapitalize="none"

                        value={nome}
                        onChangeText={ (text) => setNome(text) }
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Email"
                        autoCorrect={false}
                        autoCapitalize="none"

                        value={email}
                        onChangeText={ (text) => setEmail(text) }
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Senha"
                        autoCorrect={false}
                        autoCapitalize="none"
                        
                        value={password}
                        onChangeText={ (pass) => setPassword(pass) }
                        secureTextEntry={true}
                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Repetir Senha"
                        autoCorrect={false}
                        autoCapitalize="none"
                        
                        value={repeatPassword}
                        onChangeText={ (pass) => setRepeatPassword(pass) }
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton
                    activeOpacity={0.7}
                    onPress={handleSignUp}
                >   
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={30} color="#FFF" />
                        ) : (
                            <SubmitText>Cadastrar</SubmitText>
                        )
                    }
                </SubmitButton>

                

            </Container>
        </Background>
    )
}