import React from 'react'
import Home from '../screens/Home'
import Rewards from '../screens/Rewards'
import Saved from '../screens/Saved'
import Profile from '../screens/Profile'
import ReceiptViewer from '../screens/ReceiptViewer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet } from 'react-native'
import { COLOR } from '../theme/theme'
import Icon from 'react-native-vector-icons/Feather'

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return(
    <HomeStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <HomeStack.Screen 
        name='Home' 
        component={Home}/>
      <HomeStack.Screen 
        name='ReceiptViewer' 
        component={ReceiptViewer}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: COLOR.primaryBlueHex
        }}/>
    </HomeStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
      <BottomTab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      }}>
        <BottomTab.Screen 
          name='HomeStackScreen' 
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Icon 
                name="home"
                size={25}
                color={
                  focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
                }
              />
            )
          }}/>
        <BottomTab.Screen 
          name='rewards' 
          component={Rewards}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Icon 
                name="star"
                size={25}
                color={
                  focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
                }
              />
            )
          }}
          />
        <BottomTab.Screen 
          name='saved' 
          component={Saved}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Icon 
                name="folder"
                size={25}
                color={
                  focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
                }
              />
            )
          }}
          />
        <BottomTab.Screen 
          name='profile' 
          component={Profile}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Icon 
                name="user"
                size={25}
                color={
                  focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
                }
              />
            )
          }}
          />
      </BottomTab.Navigator>
  )
}

const styles = StyleSheet.create({})

export default TabNavigator