import React, { useContext, useEffect } from 'react';
import Home from '../screens/Home';
import Rewards from '../screens/Rewards';
import Saved from '../screens/Saved';
import Profile from '../screens/Profile';
import ReceiptViewer from '../screens/ReceiptViewer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { COLOR } from '../theme/theme';
import Icon from 'react-native-vector-icons/Feather';
import { ADD_TO_SAVED_AND_TAX, NAV_ERROR, REMOVE_FROM_SAVED, REMOVE_FROM_TAX } from '../types/types';
import NavError from '../components/NavError';
import { ReceiptContext } from '../../App';
import { auth } from '../../firebaseconfig';
import { addReceiptToRecent, sendReceiptToVendor, updateCustomerRecordWithVendor } from '../service/service';

const HomeStack = createNativeStackNavigator();
const SavedStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return(
    <HomeStack.Navigator 
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen 
        name='Home' 
        component={Home}/>
      <HomeStack.Screen 
        name={ADD_TO_SAVED_AND_TAX} 
        component={ReceiptViewer}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: COLOR.primaryBlueHex
        }}/>
        <SavedStack.Screen
        name='Nav Error'
        component={NavError}/>
    </HomeStack.Navigator>
  )
}

const SavedStackScreen = () => {
  return(
    <SavedStack.Navigator
      screenOptions={{headerShown: false}}>
        <SavedStack.Screen
          name='Saved'
          component={Saved}/>
        <SavedStack.Screen
          name={REMOVE_FROM_SAVED}
          component={ReceiptViewer}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: COLOR.primaryBlueHex
          }}/>
        <SavedStack.Screen
          name={REMOVE_FROM_TAX}
          component={ReceiptViewer}
          options={{
            headerShown: true,
            headerTitle: '',
            headerTintColor: COLOR.primaryBlueHex
          }}
        />  
        <SavedStack.Screen
          name={NAV_ERROR}
          component={NavError}/>
    </SavedStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  const contextValue = useContext(ReceiptContext) || {recentReceipts: [], setRecentReceipts: () => {}};
  const { recentReceipts, setRecentReceipts } = contextValue;
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if(recentReceipts.length > 0){
      recentReceipts.forEach((receipt) => {
        addReceiptToRecent(userId, receipt);
        updateCustomerRecordWithVendor(userId, receipt);
        sendReceiptToVendor(userId, receipt);
      });
      setRecentReceipts([]);
    }
  },[recentReceipts, setRecentReceipts, userId]);

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
          name='SavedStackScreen' 
          component={SavedStackScreen}
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