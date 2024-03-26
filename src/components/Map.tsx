import { StyleSheet, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import { COLOR, MAP_CARD_HEIGHT, MAP_CARD_WIDTH, MAP_HEIGHT, MAP_WIDTH, SIZE } from '../theme/theme';

const Map: React.FC = () => {
  return (
    <View style={styles.card}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
              latitude: 53.3482482,
              longitude: -6.2635793,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04
          }}
        />
      </View>
    </View>
  )
}

export default Map;

const styles = StyleSheet.create({
  card: {
    marginTop: SIZE.size_10,
    width: MAP_CARD_WIDTH,
    height: MAP_CARD_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: SIZE.size_4,
    borderWidth: 1,
    borderColor: COLOR.borderDarkGrey,
    backgroundColor: COLOR.secondaryLightGrey
  },
  mapContainer: {
    marginBottom: SIZE.size_8,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    borderRadius: SIZE.size_4,
    borderWidth: 1,
    borderColor: COLOR.borderDarkGrey,
    backgroundColor: COLOR.secondaryLightGrey
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})