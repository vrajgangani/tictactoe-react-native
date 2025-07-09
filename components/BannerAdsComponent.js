/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';

const adID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-8287135114525889/9467362682';

export default function BannerAdsComponent() {
  return (
    <View>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adID}
        onAdFailedToLoad={e => console.log('Error Loading ad', e)}
        onAdLoaded={console.log}
      />
    </View>
  );
}
