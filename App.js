import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import {Root} from 'native-base'

import Rotas from './src/components/rotas/rotas'

export default class App extends Component {
  render() {
    return (
     <Root>
     <Rotas/>
     </Root>

    );
  }
}

