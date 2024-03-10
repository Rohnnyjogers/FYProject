import { get, ref, remove, set } from "firebase/database";
import { ReceiptProps } from "../types/types";
import { database } from "../../firebaseconfig";
import { Alert } from "react-native";

export const addReceiptToRecent = (
    userId: string | undefined,
    receiptData: ReceiptProps,
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`
    const dbRef = ref(database, `/users/${userId}/receipts/recent/${receiptData.vendorName}_${receiptData.vendorId}/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            console.error(`A receipt with receipt key ${receiptKey} already exists.`)
        }
        else{
            set(dbRef, receiptData);
        }
    })
}

export const addReceiptToSaved = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/saved/${receiptData.vendorName}_${receiptData.vendorId}/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
    if(snapshot.exists()){
        Alert.alert('Receipt already in Saved', undefined, [{
            onPress: () => {
                navigation.navigate('Home');
            }
        }]);
    }
    else{
        set(dbRef, receiptData)
        .then(() => {
        Alert.alert('Receipt Saved', undefined, [{
            onPress: () => {
                navigation.navigate('Home');
            }
        }]);
        })
        .catch((error: any) => {
            console.error('Error saving receipt: ', error);
            Alert.alert('Error saving receipt '+error.message);
        });
    }
    })
    .catch((error: any) => {
        console.error('Error saving receipt: ', error);
        Alert.alert('Error locating receipt');
    });
}

export const addReceiptToTax = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `T_${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/tax/${receiptData.vendorName}_${receiptData.vendorId}/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
    if(snapshot.exists()){
        Alert.alert('Receipt already in Tax', undefined, [{
            onPress: () => {
                navigation.navigate('Home');
            }
        }]);
    }
    else{
        set(dbRef, receiptData)
        .then(() => {
            Alert.alert('Tax Receipt Saved', undefined, [{
                onPress: () => {
                navigation.navigate('Home');
                }
            }]);
        })
        .catch((error: any) => {
            console.error('Error saving receipt: ', error);
            Alert.alert('Error saving receipt '+error.message);
        });
    }
    })
    .catch((error: any) => {
        console.error('Error saving receipt: ', error);
        Alert.alert('Error locating receipt');
    });
}

export const removeReceiptFromSaved = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/saved/${receiptData.vendorName}_${receiptData.vendorId}/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            Alert.alert('Receipt removed', undefined, [{
                onPress: () => {
                    navigation.navigate('Saved');
                }
            }]);

            return remove(dbRef);
        } 
        else {
            Alert.alert('Receipt not found')
            return Promise.resolve();
        }
    })
    .catch((error: any) => {
        Alert.alert('Error removing receipt: '+error.message);
    });
}

export const removeReceiptFromTax = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `T_${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/tax/${receiptData.vendorName}_${receiptData.vendorId}/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
    if(snapshot.exists()){
        Alert.alert('Tax receipt removed', undefined, [{
            onPress: () => {
            navigation.navigate('Saved');
            }
        }]);

        return remove(dbRef);
    }
    else {
        Alert.alert('Receipt not found');
        return Promise.resolve();
    }
  })
  .catch((error: any) => {
        Alert.alert('Error removing receipt '+error.message);
  });
}