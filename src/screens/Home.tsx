import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { COLOR, FONTFAMILY, FULL_CARD_WIDTH, RECEIPT_CARD_HEIGHT, SIZE } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import ReceiptCard from '../components/receipts/ReceiptCard';
import { ADD_TO_SAVED_TAX_EXPENSE, ReceiptProps } from '../types/types';
import Map from '../components/Map';
import { LineChart } from 'react-native-chart-kit';
import { auth, database } from '../../firebaseconfig';
import { onValue, ref } from 'firebase/database';

const Home = () => {
  const [recentReceipts, setRecentReceipts] = useState<ReceiptProps[]>([]);
  const [loading, setLoading] = useState(true);

  const bottomTabHeight = useBottomTabBarHeight();

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    const recentDbRef = ref(database, `/users/${userId}/receipts/recent`);

    onValue(recentDbRef, (snapshot) => {
      if (snapshot.exists()) {
        const recents = Object.keys(snapshot.val());

        const recentReceipts = recents.flatMap((receipt) => {
          const receipts: ReceiptProps[] = Object.values(snapshot.val()[receipt]);

          return receipts.map((receipt) => ({
            ...receipt
          }))
        });
        setRecentReceipts(recentReceipts);
        setLoading(false);
      }
    })

  }, []);

  const getPreviousMonthsReceipts = () => {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    const prevMonthReceipts = recentReceipts.filter((receipt) => {
      const receiptDate = new Date(receipt.receiptDate);
      return receiptDate >= lastMonth && receiptDate <= currentDate;
    });

    const priceTotals = prevMonthReceipts.map((item) => {
      return item.priceTotal;
    })

    const prevMonthTotalSpend = prevMonthReceipts.reduce((acc, item) =>
      acc = acc + item.priceTotal, 0);

    return {
      prevMonthTotalSpend: prevMonthTotalSpend,
      prevMonthReceiptsTotals: priceTotals
    }
  }

  if (loading) {
    return (
      <View>
        
      </View>
    )
  }

  const x = getPreviousMonthsReceipts();

  const data = {
    labels: [],
    datasets: [
      {
        data: x.prevMonthReceiptsTotals,
        color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // optional
  };

  const chartConfig = {
    backgroundGradientFrom: COLOR.primaryWhiteHex,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: COLOR.primaryWhiteHex,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <>
      <Header />
      <Text style={styles.title}>Home</Text>
      <View style={styles.divider} />
      <View style={styles.screenContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}>
          <Text style={styles.subTitle}>Recent purchases</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.flatlistStyle}
            contentContainerStyle={styles.recentList}
            data={recentReceipts.reverse()}
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
                viewerType={ADD_TO_SAVED_TAX_EXPENSE}
              />
            }}
          />
          <Text style={styles.subTitle}>Analytics</Text>
          <View style={styles.analyticsView}>
            <Text style={{ alignSelf: 'flex-start', fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_16, color: COLOR.primaryGreyHex }}>Last 30 days spending</Text>
            <View style={{elevation: 1, borderWidth: 1, borderRadius: 4, borderColor: COLOR.borderDarkGrey}}>
              {loading ?
                <ActivityIndicator 
                  size='large' 
                  color='#0000ff' 
                />
                : 
                <LineChart
                  data={data}
                  width={330}
                  height={250}
                  chartConfig={chartConfig}
                  style={{ borderRadius: SIZE.size_4 }}
                  yAxisLabel='€'
                /> 
              }
            </View>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'flex-start', fontFamily: FONTFAMILY.jost_medium, fontSize: SIZE.size_16, color: COLOR.primaryGreyHex }}>{`Total spend: €${x.prevMonthTotalSpend}`}</Text>
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
    gap: SIZE.size_20,
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
