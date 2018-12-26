import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, NetInfo, Text } from 'react-native';
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
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd().catch((error) => {
          console.error(error);
        }));
      }).catch((error) => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  showAdBanner = () => {

    let showBanner = false;
    NetInfo.isConnected.fetch()
      .then((isConnected) => {
        console.log(`Connection is ${isConnected ? 'Expensive' : 'Not Expensive'}`, isConnected);
        showBanner = true;
      }).catch((error) => {
        console.error('error');
      });

    return (
      <View>
        {/*<Text style={styles.title}>Hello World !</Text>*/}
        <AdMobBanner
          adSize="largeBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={this.handleAdFailedToLoad()}
        />
      </View>);

  };

  handleAdFailedToLoad = () => {
    console.log("Error for banner");
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
