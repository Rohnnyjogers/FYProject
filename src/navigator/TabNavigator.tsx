import React, { useContext, useEffect } from 'react';
import Home from '../screens/Home';
import Rewards from '../screens/Rewards';
import Receipts from '../screens/Receipts';
import Profile from '../screens/Profile';
import ReceiptViewer from '../screens/ReceiptViewer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { COLOR } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ADD_TO_SAVED_TAX_EXPENSE, NAV_ERROR, RECEIPT_LIST_VIEWER, REMOVE_FROM_SAVED, REMOVE_FROM_TAX } from '../types/types';
import NavError from '../components/NavError';
import { ReceiptContext } from '../../App';
import { auth } from '../../firebaseconfig';
import { addReceiptToReceipts, sendReceiptToVendor, updateCustomerRecordWithVendor } from '../service/service';
import { checkAndUpdateRewards } from '../functions/rewardFunctions';
import PushNotification from 'react-native-push-notification';
import ReceiptListViewer from '../screens/ReceiptListViewer';

const HomeStack = createNativeStackNavigator();
const ReceiptsStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name='Home'
        component={Home} />
      <HomeStack.Screen
        name={ADD_TO_SAVED_TAX_EXPENSE}
        component={ReceiptViewer}
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: COLOR.primaryBlueHex
        }} />
      <ReceiptsStack.Screen
        name='Nav Error'
        component={NavError} />
    </HomeStack.Navigator>
  )
}

const ReceiptsStackScreen = () => {
  return (
    <ReceiptsStack.Navigator
      screenOptions={{ headerShown: false }}>
      <ReceiptsStack.Screen
        name='Receipts'
        component={Receipts}
      />
      <ReceiptsStack.Screen
        name={REMOVE_FROM_SAVED}
        component={ReceiptViewer}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: COLOR.primaryBlueHex
        }}
      />
      <ReceiptsStack.Screen
        name={REMOVE_FROM_TAX}
        component={ReceiptViewer}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: COLOR.primaryBlueHex
        }}
      />
      <ReceiptsStack.Screen
        name={NAV_ERROR}
        component={NavError}
      />
      <ReceiptsStack.Screen
        name={RECEIPT_LIST_VIEWER}
        component={ReceiptListViewer}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTintColor: COLOR.primaryBlueHex
        }}
      />
    </ReceiptsStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  const contextValue = useContext(ReceiptContext) || { recentReceipts: [], setRecentReceipts: () => { } };
  const { recentReceipts, setRecentReceipts } = contextValue;
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (recentReceipts.length > 0) {

      recentReceipts.forEach((receipt) => {
        addReceiptToReceipts(userId, receipt);
        updateCustomerRecordWithVendor(userId, receipt);
        sendReceiptToVendor(userId, receipt);
        checkAndUpdateRewards(userId, receipt);
      });
      setRecentReceipts([]);
    }
  }, [recentReceipts, setRecentReceipts, userId]);

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
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name="home"
              size={28}
              color={
                focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
              }
            />
          )
        }} />
      <BottomTab.Screen
        name='rewards'
        component={Rewards}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name="stars"
              size={28}
              color={
                focused ? COLOR.primaryBlueHex : COLOR.primaryGreyHex
              }
            />
          )
        }}
      />
      <BottomTab.Screen
        name='ReceiptsStackScreen'
        component={ReceiptsStackScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name="folder"
              size={28}
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
          tabBarIcon: ({ focused, size, color }) => (
            <Icon
              name="account-box"
              size={28}
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

export default TabNavigator;

const styles = StyleSheet.create({})
