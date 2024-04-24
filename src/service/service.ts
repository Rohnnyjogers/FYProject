import { child, get, ref, remove, set, update } from "firebase/database";
import { PurchaseProps, ReceiptProps, Reward } from "../types/types";
import { database } from "../../firebaseconfig";
import { Alert } from "react-native";


export const updateCustomerRecordWithVendor = async (
    userId: string | undefined,
    receiptData: ReceiptProps
) => {
    const dbRef = ref(database, `/vendors/${receiptData.vendorName}/${receiptData.vendorName}_${receiptData.vendorId}/customers/${userId}/purchases`);
    const { items } = receiptData;

    try{
        const purchasesSnapshot = await get(dbRef);
        const purchases = purchasesSnapshot.exists() ? purchasesSnapshot.val() : {};

        for (const item of items){
            const { description, quantity } = item;
            const currentItem: PurchaseProps = purchases[description];
            const itemRef = child(dbRef, description);

            if(currentItem){
                const updateQuantity = currentItem.quantity + quantity;
                update(itemRef, {quantity: updateQuantity});
                
                if(currentItem.rewardable){

                    if(currentItem.activeReward || currentItem.nextRewardPhase){
                        let currentRewardCount = currentItem.rewardCount;

                        if(currentRewardCount !== null){

                            for(let i=0;i<quantity;i++){
                                
                                if(currentRewardCount >= currentItem.nextRewardCount){
                                    update(itemRef, {nextRewardPhase: false});
                                    break;
                                }
                                currentRewardCount++;
                            }
                            update(itemRef, {rewardCount: currentRewardCount});
                        }
                    }                  
                }
            } 
            else{
                const purchaseData: PurchaseProps = {
                    quantity: quantity,
                    rewardable: true,
                    activeReward: false,
                    rewardCount: null,
                    nextRewardCount: 0,
                    nextRewardPhase: false,
                    totalCompleteRewards: 0
                }

                await set(itemRef, purchaseData);
            }
        }
    }catch(error){
        console.error('Error while accessing customer purchases', error);
    }
}

export const sendReceiptToVendor = (
    userId: string | undefined,
    receiptData: ReceiptProps
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`
    const dbRef = ref(database, `/vendors/${receiptData.vendorName}/${receiptData.vendorName}_${receiptData.vendorId}/customers/${userId}/receipts/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            console.error(`A receipt with receipt key ${receiptKey} already exists at ${dbRef}`);
        }
        else{
            set(dbRef, receiptData);
        }
    });
}

export const addReceiptToReceipts = (
    userId: string | undefined,
    receiptData: ReceiptProps,
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`
    const dbRef = ref(database, `/users/${userId}/receipts/receipts/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            console.error(`A receipt with receipt key ${receiptKey} already exists.`)
        }
        else{
            set(dbRef, receiptData);
        }
    });
}

export const addReceiptToExpenses = async (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `E_${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/expenses/${receiptKey}`);

    try{
        const receiptSnapshot = await get(dbRef);
        
        if(receiptSnapshot.exists()){
            Alert.alert('Receipt already in Expenses', undefined, [{
                onPress: () => {
                    navigation.navigate('Home');
                }
            }]);
        }
        else{
            set(dbRef, receiptData);
            Alert.alert('Receipt added to Expenses', undefined, [{
                onPress: () => {
                    navigation.navigate('Home');
                }
            }]);
        }
    }catch(error){
        console.log('Error occured while accessing Expenses: ', error);
    }
}

export const addReceiptToSaved = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/saved/${receiptKey}`);

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
        console.error('Error saving receipt: ', error.message);
        Alert.alert('Error locating receipt');
    });
}



export const addReceiptToTax = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `T_${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/tax/${receiptKey}`);

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

export const removeReceiptFromExpenses = async (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `E_${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/expenses/${receiptKey}`);
    
    try{
        const receiptSnaphot = await get(dbRef);
        
        if(receiptSnaphot.exists()){
            Alert.alert('Receipt removed', undefined, [{
                onPress: () => {
                    navigation.navigate('Receipts');
                }
            }]);

            return remove(dbRef);
        }
        else{
            Alert.alert('Receipt not found')
            return Promise.resolve();
        }
    }catch(error){
        console.log("from 'removeReceiptFromExpenses()', error accessing receipt", error);
    }
}

export const removeReceiptFromSaved = (
    userId: string | undefined,
    receiptData: ReceiptProps,
    navigation: any
) => {
    const receiptKey = `${receiptData.vendorName}_${receiptData.vendorId}_${receiptData.receiptId}`;
    const dbRef = ref(database, `/users/${userId}/receipts/saved/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            Alert.alert('Receipt removed', undefined, [{
                onPress: () => {
                    navigation.navigate('Receipts');
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
    const dbRef = ref(database, `/users/${userId}/receipts/tax/${receiptKey}`);

    get(dbRef)
    .then((snapshot) => {
    if(snapshot.exists()){
        Alert.alert('Tax receipt removed', undefined, [{
            onPress: () => {
            navigation.navigate('Receipts');
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