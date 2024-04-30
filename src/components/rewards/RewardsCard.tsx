import { Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR, FONTFAMILY, FULL_RECEIPT_WIDTH, REWARDS_CARD_HEIGHT, REWARDS_CARD_WIDTH, SIZE } from '../../theme/theme'
import { Reward } from '../../types/types';
import RewardStamp from './RewardStamp';
import { auth } from '../../../firebaseconfig';
import { setRewardActive, setRewardClaimed } from '../../functions/rewardFunctions';
import QRCode from 'react-native-qrcode-svg';

interface RewardCardProps {
  reward: Reward;
}

const RewardsCard: React.FC<RewardCardProps> = ({
  reward
}) => {
  const { active, complete, claimed, vendor, item, size, progress, vendorId, rewardId } = reward;
  const userId = auth.currentUser?.uid;
  const vendorName: string = vendor.replace(/_/g, ' ');
  const [modalVisible, setModalVisible] = useState(false);

  const renderRewardArray = () => {
    const rewardArray = [];
    for (let i = 0; i < size; i++) {
      if (i < progress) {
        rewardArray.push(<RewardStamp key={i} stamped={true} />);
      }
      else {
        rewardArray.push(<RewardStamp key={i} stamped={false} />);
      }
    }
    return rewardArray;
  }

  const displayRewardQRModal = () => {
    const rewardKey = `${vendor}_${vendorId}_${rewardId}_${item}`
    const rewardQRData = `${userId}:${rewardKey}`;

    return (
      <Modal
        animationType='slide'
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalCard}>
          <View style={styles.modalContent}>
            <Text style={{ fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_20, color: COLOR.primaryGreyHex }}>{`Your free ${item}!`}</Text>
            <QRCode 
              value={rewardQRData} 
              size={SIZE.size_160}/>
            <Pressable
            onPress={() => setModalVisible(false)}
              style={styles.pressable}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
              <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View>
      {claimed ?
        <View style={styles.card}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.vendorText}>{vendorName}</Text>
          <View style={styles.stamps}>
            {renderRewardArray()}
          </View>
        </View>
        :
        <View style={styles.card}>
          {complete ?
            <>
              <Text style={styles.itemText}>{item} reward complete!</Text>
              <Text style={styles.vendorText}>{vendorName}</Text>
            </>
            :
            <>
              <Text style={styles.itemText}>{item}</Text>
              <Text style={styles.vendorText}>{vendorName}</Text>
            </>
          }
          {active ?
            <View style={styles.stamps}>
              {renderRewardArray()}
            </View>
            :
            <>
              {complete ?
                <View style={styles.activate}>
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={styles.pressable}
                    android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                    <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Claim</Text>
                  </Pressable>
                </View>
                :
                <View style={styles.activate}>
                 
                  <Pressable
                    onPress={() => setRewardActive(
                      userId,
                      reward
                    )}
                    style={styles.pressable}
                    android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}>
                    <Text style={{ fontFamily: FONTFAMILY.jost_bold, fontSize: SIZE.size_16, color: COLOR.primaryWhiteHex }}>Activate</Text>
                  </Pressable>
                </View>
              }
            </>
          }
        </View>
      }
      {modalVisible && displayRewardQRModal()}
    </View>
  )
}

export default RewardsCard;

const styles = StyleSheet.create({
  card: {
    height: REWARDS_CARD_HEIGHT,
    width: REWARDS_CARD_WIDTH,
    backgroundColor: COLOR.secondaryLightGrey,
    borderRadius: SIZE.size_4,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    flexDirection: 'column',
    gap: SIZE.size_8,
    paddingTop: SIZE.size_5,
    paddingBottom: SIZE.size_5,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: SIZE.size_2
  },
  itemText: {
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_16
  },
  vendorText: {
    fontFamily: FONTFAMILY.jost_light,
    fontSize: SIZE.size_14
  },
  stamps: {
    width: REWARDS_CARD_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SIZE.size_10
  },
  activate: {
    width: FULL_RECEIPT_WIDTH
  },
  pressable: {
    alignItems: 'center',
    padding: SIZE.size_5,
    borderRadius: SIZE.size_4,
    backgroundColor: COLOR.primaryBlueHex,
    elevation: SIZE.size_2
  },
  modalCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.secondaryLightGrey
  },
  modalContent: {
    backgroundColor: COLOR.primaryWhiteHex,
    paddingStart: SIZE.size_100,
    paddingEnd: SIZE.size_100,
    paddingTop: SIZE.size_30,
    paddingBottom: SIZE.size_30,
    gap: SIZE.size_40,
    borderRadius: SIZE.size_10,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    alignItems: 'center'
  }
})