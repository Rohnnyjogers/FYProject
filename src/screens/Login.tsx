import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { COLOR, FONTFAMILY, SIZE } from '../theme/theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const userAuth = auth;
  
    const signUp = async () => {
        setLoading(true);

        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
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
            const response = await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Sign-in successful!");
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
            
            {loading ? <ActivityIndicator size={'large'} color={COLOR.primaryBlueHex}/>
            :
            <>
                <Button title='Sign-in' onPress={signIn}/>
                <Button title='Sign-up' onPress={signUp}/>
            </>}
        </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    title:{
        fontFamily: FONTFAMILY.jost_bold,
        fontSize: SIZE.size_24,
        color: COLOR.primaryBlueHex
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
})