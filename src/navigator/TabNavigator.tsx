import React from 'react'
import Home from '../screens/Home'
import Rewards from '../screens/Rewards'
import Saved from '../screens/Saved'
import Profile from '../screens/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { COLOR } from '../theme/theme'

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarShowLabel: false,
    }}>
        <BottomTab.Screen 
          name='home' 
          component={Home}
          options={{
            tabBarIcon: ({focused, size, color}) => (
              <Icon 
                name="home"
                size={25}
                color={
                  focused ? COLOR.primaryBlueHex : COLOR.primaryLightGreyHex
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
                  focused ? COLOR.primaryBlueHex : COLOR.primaryLightGreyHex
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
                  focused ? COLOR.primaryBlueHex : COLOR.primaryLightGreyHex
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
                  focused ? COLOR.primaryBlueHex : COLOR.primaryLightGreyHex
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