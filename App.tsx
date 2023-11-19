import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './src/navigator/TabNavigator'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name='Internal'
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App