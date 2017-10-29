import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { FlatList, View, StatusBar } from 'react-native';
import { ListItem, Seperator } from '../components/List';

import currencies from '../data/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  handlePress = () => {
    this.props.navigation.goBack(null);
    console.log('row press');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" translucent={false} />
        <FlatList
          data={currencies}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === TEMP_CURRENT_CURRENCY}
              onPress={this.handlePress}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Seperator}
        />
      </View>
    );
  }
}

export default CurrencyList;
