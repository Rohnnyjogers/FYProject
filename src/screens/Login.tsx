import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { initAuth } from '../../firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
    const signUp = async () => {
        setLoading(true);

        try{
            const response = await createUserWithEmailAndPassword(initAuth, email, password);
            Alert.alert("Sign-up successful!");
        
        } catch (error: any){
            Alert.alert("Sign-up invalid: "+error.message);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async () => {
        setLoading(true);

        try{
            await signInWithEmailAndPassword(initAuth, email, password);
        } catch (error: any) {
            Alert.alert("Sign-in invalid: "+error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>spence.</Text>
            
            <View style={styles.inputContainer}>
                <TextInput 
                    value={email} 
                    style={styles.input}
                    placeholder='e-mail'
                    placeholderTextColor={COLOR.primaryBlueHex}
                    onChangeText={(text) => setEmail(text)}/>
                
                <TextInput
                    secureTextEntry={true}
                    value={password}
                    style={styles.input}
                    placeholder='password'
                    placeholderTextColor={COLOR.primaryBlueHex}
                    onChangeText={(text) => setPassword(text)}/>
            </View>
            
            {loading ? <ActivityIndicator size={'large'} color={COLOR.primaryBlueHex}/>
            :
            <View style={styles.buttonContainer}>
                <Button 
                    title='Sign-in'
                    onPress={signIn}
                    color={COLOR.primaryBlueHex}
                />
                <Button 
                    title='Sign-up' 
                    onPress={signUp}
                    color={COLOR.primaryBlueHex}
                />
            </View>}
        </View>
  )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        marginBottom: SIZE.size_20
    },
    title:{
        fontFamily: FONTFAMILY.jost_bold,
        fontSize: SIZE.size_24,
        color: COLOR.primaryBlueHex
    },
    inputContainer: {
        marginTop: SIZE.size_20,
        marginBottom: SIZE.size_40
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginTop: SIZE.size_60,
        gap: SIZE.size_10
    }
})