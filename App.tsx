import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
import TabNavigator from './src/navigator/TabNavigator';
import Login from './src/screens/Login';


const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login' 
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? 
          <Stack.Screen
            name='Internal'
            component={TabNavigator}
          />
          :
          <Stack.Screen
            name='Login'
            component={Login}
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App