import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ScrollView, StatusBar, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem, Seperator } from '../components/List';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  handlePressTheme = () => {
    this.props.navigation.navigate('Themes');
  };

  handlePressWebsite = () => {
    Linking.openURL('httpd://fixer.io').catch(alert("Error Sorry!, Fixer.io can't be reached now"));
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
