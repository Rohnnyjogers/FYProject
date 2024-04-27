import React, { SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator, Button } from 'react-native';
import { COLOR, FONTFAMILY, FULL_CARD_WIDTH, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import ReceiptCard from '../components/receipts/ReceiptCard';
import { ADD_TO_SAVED_TAX_EXPENSE, ReceiptProps } from '../types/types';
import Map from '../components/Map';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { auth, database } from '../../firebaseconfig';
import { get, onValue, ref, set } from 'firebase/database';
import { SpendingCategories, getPrevMonthsSpendingData, getSpendingByCategoryData, previousMonthSpendingTotal } from '../functions/homeFunctions';
import PushNotification from 'react-native-push-notification';

const Home = () => {
  const [recentReceipts, setRecentReceipts] = useState<ReceiptProps[]>([]);
  const [thirtyDayData, setThirtyDayData] = useState<number[]>([]);
  const [spendingByCategory, setSpendingByCategory] = useState<SpendingCategories[]>([]);
  const [lineChartLoading, setLineChartLoading] = useState(true);
  const [barChartLoading, setBarChartLoading] = useState(true);
  const [receiptsLoading, setReceiptsLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    const dbRef = ref(database, `/users/${userId}/receipts/receipts`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const receipts: ReceiptProps[] = Object.values(snapshot.val());
        // receipts.slice(0,10);
        setRecentReceipts(receipts.reverse());
        setReceiptsLoading(false);
        getPrevMonthsSpendingData(userId, setThirtyDayData, setLineChartLoading);
        getSpendingByCategoryData(userId, setSpendingByCategory, setBarChartLoading);
      }
      else {
        setRecentReceipts([]);
      }
    });
  }, []);


  const extractBarChartData = () => {
    let labels = [];
    let data = [];

    for (let i = 0; i < spendingByCategory.length; i++) {
      labels.push(spendingByCategory[i].category);
      data.push(spendingByCategory[i].total);
    }

    return {
      labels,
      data
    }
  }

  const lineChartData = {
    labels: [],
    datasets: [
      {
        data: thirtyDayData,
        color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const barChartData = {
    labels: extractBarChartData().labels,
    datasets: [
      {
        data: extractBarChartData().data,
        color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  const lineChartConfig = {
    backgroundGradientFrom: COLOR.primaryWhiteHex,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLOR.primaryWhiteHex,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const barChartConfig = {
    backgroundGradientFrom: COLOR.primaryWhiteHex,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLOR.primaryWhiteHex,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const test = () => {
    PushNotification.createChannel(
      {
        channelId: '929255533210',
        channelName: "My_channel",
        playSound: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.localNotification({
      channelId: '929255533210',
      title: "Notification",
      message: 'This is a notification.'
    });
  }

  return (
    <>
      <Header />
      {/* <Button title='Press' onPress={test} /> */}
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider} />
      <View style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <Text style={styles.subTitle}>Recent purchases</Text>
          {receiptsLoading ?
            <View style={{ height: 250, width: 332, justifyContent: 'center' }}>
              <ActivityIndicator
                size='large'
                color={COLOR.primaryBlueHex}
              />
            </View>
            :
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatlistStyle}
              contentContainerStyle={styles.recentList}
              data={recentReceipts}
              keyExtractor={item => item.receiptId.toString()}
              renderItem={({ item }) => {
                return <ReceiptCard
                  receiptId={item.receiptId}
                  vendorId={item.vendorId}
                  receiptDate={item.receiptDate}
                  latitude={item.latitude}
                  longitude={item.longitude}
                  vendorName={item.vendorName}
                  items={item.items}
                  priceTotal={item.priceTotal}
                  itemsTotal={item.itemsTotal}
                  taxType={item.taxType}
                  vendorType={item.vendorType}
                  viewerType={ADD_TO_SAVED_TAX_EXPENSE}
                />
              }}
            />
          }

          <Text style={styles.subTitle}>Analytics</Text>
          <View style={styles.analyticsView}>
            <Text style={{ alignSelf: 'flex-start', fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_16, color: COLOR.primaryGreyHex }}>Last 30 days spending</Text>
            <View style={{ elevation: 1, borderWidth: 1, borderRadius: 4, borderColor: COLOR.borderDarkGrey }}>
              {lineChartLoading ?
                <View style={{ height: 250, width: 332, backgroundColor: COLOR.secondaryLightGrey, justifyContent: 'center' }}>
                  <ActivityIndicator
                    size='large'
                    color={COLOR.primaryBlueHex}
                  />
                </View>
                :
                <LineChart
                  data={lineChartData}
                  width={330}
                  height={250}
                  chartConfig={lineChartConfig}
                  style={{ borderRadius: SIZE.size_4 }}
                  yAxisLabel='€'
                  fromZero={true}
                  bezier
                />
              }
            </View>
            <View style={{ width: '100%', flexDirection: 'row', }}>
              <Text style={{
                alignSelf: 'flex-start',
                fontFamily: FONTFAMILY.jost_medium,
                fontSize: SIZE.size_16,
                color: COLOR.primaryGreyHex
              }}>{`Total spend: €${previousMonthSpendingTotal(thirtyDayData).toFixed(2)}`}</Text>
            </View>
          </View>
          <View style={styles.analyticsView}>
            <Text style={{ alignSelf: 'flex-start', fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_16, color: COLOR.primaryGreyHex }}>Spending by Category</Text>
            <View style={{ elevation: 1, borderWidth: 1, borderRadius: 4, borderColor: COLOR.borderDarkGrey }}>
              {barChartLoading ?
                <View style={{ height: 250, width: 332, backgroundColor: COLOR.secondaryLightGrey, justifyContent: 'center' }}>
                  <ActivityIndicator
                    size='large'
                    color={COLOR.primaryBlueHex}
                  />
                </View>
                :
                <BarChart
                  data={barChartData}
                  width={330}
                  height={250}
                  chartConfig={barChartConfig}
                  yAxisLabel='€'
                  yAxisSuffix=''
                  fromZero={true}
                />
              }
            </View>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              {/* <Text style={{
                alignSelf: 'flex-start',
                fontFamily: FONTFAMILY.jost_medium,
                fontSize: SIZE.size_16,
                color: COLOR.primaryGreyHex
              }}>{`Total spend: €${previousMonthSpendingTotal(thirtyDayData).toFixed(2)}`}</Text> */}
            </View>
          </View>
          {/* <Map/> */}
        </ScrollView>
      </View>
    </>
  )
}

export default Home;

const styles = StyleSheet.create({
  screenContainer: {
    paddingStart: SIZE.size_18,
    paddingEnd: SIZE.size_18,
    paddingBottom: SIZE.size_20,
    flex: 1,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  recentScrollView: {},
  title: {
    paddingStart: SIZE.size_20,
    paddingEnd: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_bold,
    fontSize: SIZE.size_25,
    color: COLOR.primaryBlueHex,
  },
  divider: {
    height: SIZE.size_1,
    backgroundColor: COLOR.primaryBlueHex
  },
  subTitle: {
    marginTop: SIZE.size_20,
    marginBottom: SIZE.size_10,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  },
  recentList: {
    gap: SIZE.size_30,
    height: RECEIPT_CARD_HEIGHT + 2
  },
  flatlistStyle: {
    flexGrow: 0
  },
  analyticsView: {
    width: FULL_CARD_WIDTH,
    alignItems: 'center',
    backgroundColor: COLOR.secondaryLightGrey,
    borderRadius: SIZE.size_4,
    elevation: SIZE.size_1,
    padding: SIZE.size_5,
    marginBottom: SIZE.size_20,
    borderWidth: SIZE.size_1,
    borderColor: COLOR.borderDarkGrey,
    gap: SIZE.size_10
  },
  mapTitle: {
    marginTop: SIZE.size_20,
    fontFamily: FONTFAMILY.jost_medium,
    fontSize: SIZE.size_20,
    color: COLOR.primaryGreyHex,
  }
});
