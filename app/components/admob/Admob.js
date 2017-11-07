import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, NetInfo } from 'react-native';
import { AdMobBanner, AdMobInterstitial } from 'react-native-admob';
import styles from './styles';


class Admob extends Component {
    static propTypes = {
      adType: PropTypes.string,
    };

    componentDidMount() {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          console.log(`Connection is ${isConnected ? 'Expensive' : 'Not Expensive'}`);
          AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
          AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
          AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd()).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
    }

    componentWillUnmount() {
      AdMobInterstitial.removeAllListeners();
    }

    showAdBanner = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          console.log(`Connection is ${isConnected ? 'Expensive' : 'Not Expensive'}`);
          return (
            <View><AdMobBanner
              adSize="largeBanner"
              adUnitID="ca-app-pub-3940256099942544/6300978111"
              testDevices={[AdMobBanner.simulatorId]}
            />
            </View>);
        }).catch((error) => {
          console.error('error');
        });
    };

    render() {
      return (
        <View style={styles.container}>
          {this.showAdBanner()}
        </View>
      );
    }
}

export default Admob;
