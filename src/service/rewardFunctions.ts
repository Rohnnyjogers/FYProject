import React, { SetStateAction } from "react";
import { Reward } from "../types/types";
import { get, ref, set } from "firebase/database";
import { database } from "../../firebaseconfig";

export const setRewardActive = (
    userId: string | undefined,
    reward: Reward,
    setActive: React.Dispatch<SetStateAction<boolean>>
) => {
    const { vendor, vendorId, rewardId, item  } = reward;
    const dbRef = ref(database, `/users/${userId}/rewards/${vendor}_${vendorId}_${rewardId}_${item}/active`);
    set(dbRef, true)
    .then(() => {
        setActive(true);
    })
    .catch((error) => {
        console.error('Error activating reward: ', error);
    });
}