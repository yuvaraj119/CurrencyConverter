import React, { Component } from 'react';
import { ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem, Seperator } from '../components/List';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  handlePressTheme = () => {
    console.log('press theme');
  };

  handlePressWebsite = () => {
    console.log('press website');
  };

  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="default" />
        <ListItem
          text="Themes"
          onPress={this.handlePressTheme}
          customIcon={
            <Icon name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />
          }
        />
        <Seperator />
        <ListItem
          text="Fixer.io"
          onPress={this.handlePressWebsite}
          customIcon={<Icon name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />}
        />
        <Seperator />
      </ScrollView>
    );
  }
}

export default Options;
