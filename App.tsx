import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseconfig';
import TabNavigator from './src/navigator/TabNavigator';
import Login from './src/screens/Login';
import NfcManager, { Ndef, NdefRecord, NfcEvents, NfcTech, TagEvent } from 'react-native-nfc-manager';
import { ReceiptProps } from './src/types/types';


const Stack = createNativeStackNavigator();

export const ReceiptContext = React.createContext<{
  recentReceipts: ReceiptProps[], 
  setRecentReceipts: React.Dispatch<React.SetStateAction<ReceiptProps[]>>} | undefined>(
    undefined
  );

const App: React.FC = () => {
  const [user, setUser] = useState<User|null>(null);
  const [recentReceipts, setRecentReceipts] = useState<ReceiptProps[]>([]);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  },[])

  useEffect(()=>{
    // NfcManager.setEventListener(NfcEvents.DiscoverTag, handleNfcTag);

    const startNfcListener = async () => {
      const nfcSupported = await NfcManager.isSupported();
      
      try{
        if(nfcSupported){
          await NfcManager.start();
          await NfcManager.requestTechnology(NfcTech.Ndef);
          const tag = await NfcManager.getTag();

          if(tag && tag.ndefMessage){
            
            const message: NdefRecord[] = tag.ndefMessage;
            
            const fullPayload: Uint8Array = new Uint8Array(message.map(record => record.payload).flat());
            const fullPayloadStr: string = Ndef.text.decodePayload(fullPayload);
            const payload: Uint8Array = new Uint8Array(message[0].payload);
            const receipt: ReceiptProps = JSON.parse(Ndef.text.decodePayload(payload));
            
            console.log('Payload array:', receipt)
            console.log('Receipt at 0 in payload array:', receipt)

            setRecentReceipts(prevReceipts => [...prevReceipts, receipt]);
          }
        }
        else{
          console.log('NFC not supported on this device');
        }
      }
      catch(error){
        console.log('Error starting NFC manager', error);
      }
      await NfcManager.registerTagEvent();
    }

    startNfcListener();

    return(() => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent();
      NfcManager.cancelTechnologyRequest();
    })

  },[]);

  const handleNfcTag = (tag: TagEvent) => {
    console.log('Nfc tag detected:', tag);   
  }

  return (
    <ReceiptContext.Provider value={{recentReceipts, setRecentReceipts}}>
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
  )
}

const styles = StyleSheet.create({})

export default App;