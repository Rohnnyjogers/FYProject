import { PurchaseProps, ReceiptProps, Reward } from "../types/types";
import { DatabaseReference, child, get, ref, set, update } from "firebase/database";
import { database } from "../../firebaseconfig";

export const setRewardActive = (
    userId: string | undefined,
    reward: Reward
) => {
    const { vendor, vendorId, rewardId, item  } = reward;
    const rewardRef: DatabaseReference = ref(database, `/users/${userId}/rewards/${vendor}_${vendorId}_${rewardId}_${item}/active`);
    const purchaseRef: DatabaseReference = ref(database, `/vendors/${vendor}/${vendor}_${vendorId}/customers/${userId}/purchases/${item}/activeReward`);
    
    set(rewardRef, true)
    .catch((error) => {
        console.log('Error activating reward: ', error);
    });

    set(purchaseRef, true)
    .catch((error) => {
        console.log('Error setting activeReward property: ', error);
    });
}

export const setRewardClaimed = (
    userId: string | undefined,
    reward: Reward
) => {
    const { vendor, vendorId, rewardId, item  } = reward;
    const rewardRef: DatabaseReference = ref(database, `/users/${userId}/rewards/${vendor}_${vendorId}_${rewardId}_${item}/claimed`);

    set(rewardRef, true)
    .catch((error) => {
        console.log('Error setting claimed property: ', error);
    });
}

export const checkAndUpdateRewards = (
    userId: string | undefined,
    receipt: ReceiptProps
) => {
    const { items, vendorName, vendorId } = receipt;
    const dbRef: DatabaseReference = ref(database, `/users/${userId}/rewards`);

    get(dbRef)
    .then((snapshot) => {
        if(snapshot.exists()){
            const rewardIds: string[] = Object.keys(snapshot.val());
            
            rewardIds.forEach((rewardId) => {
                const rewardData: Reward = snapshot.val()[rewardId];
                const rewardRef = child(dbRef, rewardId);
                
                if(vendorName === rewardData.vendor && vendorId === rewardData.vendorId && rewardData.active){
                    items.forEach((item) => {

                        if(item.description === rewardData.item){

                            for(let i=0;i<item.quantity; i++){
                                const incrementProgress = rewardData.progress += 1;
                                update(rewardRef, {progress: incrementProgress});

                                if(rewardData.progress === rewardData.size){
                                    const purchaseRef: DatabaseReference = ref(database, `/vendors/${vendorName}/${vendorName}_${vendorId}/customers/${userId}/purchases/${item.description}`);
                                    
                                    get(purchaseRef)
                                    .then((snapshot) => {
                                        if(snapshot.exists()){
                                            const purchaseItem: PurchaseProps = snapshot.val();
                                            let { totalCompleteRewards } = purchaseItem;

                                            update(purchaseRef, {totalCompleteRewards: totalCompleteRewards+1});
                                            update(purchaseRef, {activeReward: false});

                                            if(purchaseItem.rewardable){
                                                update(purchaseRef, {nextRewardPhase: true});
                                            }
                                        }
                                    })
                                    .catch((error) => {
                                        console.log('Error updating purchase item: ', error);
                                    });

                                    update(rewardRef, {active: false, complete: true});
                                    //Prompt notification here
                                    break;
                                }
                            }
                        }
                    });
                }
            });
        }
    })
    .catch((error) => {
        console.error('Error checking rewards ', error);
    });
}