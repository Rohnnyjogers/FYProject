import { create } from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import ReceiptsData from "../data/ReceiptsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStore = create(
    persist(
        (set, get) => ({
            ReceiptsList: ReceiptsData,
        }),
        {
            name: 'receipts-data',
            storage: createJSONStorage(() => AsyncStorage),
        }),
)