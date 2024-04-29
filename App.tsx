import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
import TabNavigator from './src/navigator/TabNavigator';
import Login from './src/screens/Login';
import NfcManager, { Ndef, NfcEvents, NfcTech, TagEvent } from 'react-native-nfc-manager';
import { ReceiptProps } from './src/types/types';
import { PaperProvider } from 'react-native-paper';
import PushNotification from 'react-native-push-notification';


const Stack = createNativeStackNavigator();

export const ReceiptContext = React.createContext<{
  recentReceipts: ReceiptProps[],
  setRecentReceipts: React.Dispatch<React.SetStateAction<ReceiptProps[]>>
} | undefined>(
  undefined
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recentReceipts, setRecentReceipts] = useState<ReceiptProps[]>([]);

  const handleTag = async (tag: TagEvent) => {
    try {
      const message = tag.ndefMessage;
      if (message) {
        const payload: Uint8Array = new Uint8Array(message[0].payload);
        const receipt: ReceiptProps = JSON.parse(Ndef.text.decodePayload(payload));
        setRecentReceipts(prevReceipts => [...prevReceipts, receipt]);
        console.log('Receipt read: ', receipt);
      }
    } catch (error) {
      console.error('Error handling tag: ', error);
    }
  }

  const startNfcListener = async () => {
    // NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNfcTag);
    const nfcSupported = await NfcManager.isSupported();
    await NfcManager.start();

    try {
      if (nfcSupported) {
        const tech = await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();

        if (tag && tech) {
          handleTag(tag);
          await NfcManager.registerTagEvent();
        }
      }
      else {
        console.warn('NFC not supported on this device');
      }
    }
    catch (error) {
      console.error('Error starting NFC manager', error);
    }

  }

  useEffect(() => {
    startNfcListener();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      NfcManager.unregisterTagEvent();
      NfcManager.cancelTechnologyRequest();
    }

  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = () => {
    PushNotification.requestPermissions();
  };

  return (
    <PaperProvider>
      <ReceiptContext.Provider value={{ recentReceipts, setRecentReceipts }}>
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
      </ReceiptContext.Provider>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({})

export default App;