import { get, ref } from "firebase/database";
import React, { SetStateAction } from "react";
import { auth, database } from "../../firebaseconfig";
import { ReceiptProps } from "../types/types";

export const getRecentReceipts = async (
    setReceiptsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setRecentReceipts: React.Dispatch<React.SetStateAction<ReceiptProps[]>>
) => {
    const userId = auth.currentUser?.uid;
    const dbRef = ref(database, `/users/${userId}/receipts/receipts`);

    try {
        const receiptsSnapshot = await get(dbRef);

        if (receiptsSnapshot.exists()) {
            const receiptsArray: ReceiptProps[] = Object.values(receiptsSnapshot.val());
            receiptsArray.sort((a: ReceiptProps, b: ReceiptProps) => b.receiptDate.getTime() - a.receiptDate.getTime());
            const recentReceipts = receiptsArray.slice(0, 10);

            setRecentReceipts(recentReceipts);
            setReceiptsLoading(false);
        }

    } 
    catch (error){ 
        console.log('Error retrieving receipts (getRecentReceipts()): ', error);
    }
}

export const previousMonthSpendingTotal = (
    thirtyDayData: number[]
) => {
    return thirtyDayData.reduce((acc, item) => acc + item, 0);
}

export const getPrevMonthsSpendingData = async (
    userId: string | undefined,
    setThirtyDayData: React.Dispatch<SetStateAction<number[]>>,
    setLineCartLoading: React.Dispatch<SetStateAction<boolean>>
  ) => {
    const dbRef = ref(database, `/users/${userId}/receipts/receipts`);
    try {
      const receiptsSnapshot = await get(dbRef);

      if (receiptsSnapshot.exists()) {
        const receipts: ReceiptProps[] = Object.values(receiptsSnapshot.val());

        const currentDate = new Date();
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

        const prevMonthReceipts = receipts.filter((receipt) => {
          const receiptDate = new Date(receipt.receiptDate);
          return receiptDate >= lastMonth && receiptDate <= currentDate;
        });

        const priceTotals = prevMonthReceipts.map((item) => {
          return item.priceTotal;
        })

        setThirtyDayData(priceTotals);
        setLineCartLoading(false);

      }
    }
    catch(error){
      console.log('Error retrieving receipts (getPreviousMonthsReceipts()): ', error);
    }
  }

  export interface SpendingCategories {
    category: string,
    total: number
  }

  export const getSpendingByCategoryData = async(
    userId: string | undefined,
    setSpendingByCategory: React.Dispatch<SetStateAction<SpendingCategories[]>>,
    setBarChartLoading: React.Dispatch<SetStateAction<boolean>>
  ) => {
    const dbRef = ref(database, `/users/${userId}/receipts/receipts`);
    const spendingByCategory: Record<string, number> = {};

    try{
        const receiptsSnapshot = await get(dbRef);

        if(receiptsSnapshot.exists()){
            const receipts: ReceiptProps[] = Object.values(receiptsSnapshot.val());

            receipts.forEach((receipt) => {
                const { vendorType, priceTotal } = receipt;

                if(vendorType in spendingByCategory){
                    spendingByCategory[vendorType] += priceTotal;
                }
                else{
                    spendingByCategory[vendorType] = priceTotal;
                }

                const spendingArray: SpendingCategories[] = Object.entries(spendingByCategory).map(([vendorType, total]) => ({
                    category: vendorType,
                    total: total
                }));

                setSpendingByCategory(spendingArray);
                setBarChartLoading(false);
            })
        }
    }
    catch(error){
        console.log('Error retrieving receipts (getSpendingByCategoryData()): ', error);
    }
  }