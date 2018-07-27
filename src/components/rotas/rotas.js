import React, { Component } from 'react';

import { Router, Scene } from 'react-native-router-flux'
import { Icon } from 'native-base';

import Login from '../login/login'
import Home from '../home/home'
import Pacientes from '../pacientes/pacientes'


const TabIconHome = ({ selected, title }) => {
  return (
    <Icon style={{ color: selected ? 'red' : 'white' }} name='home' />

  );
}
const TabIconPacientes = ({ selected, title }) => {
  return (
    <Icon style={{ color: selected ? 'red' : 'white' }} name='man' />
  );
}


export default class Rotas extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router >
        <Scene key="root" >
          <Scene initial  hideNavBar key="login" component={Login} />
          <Scene   activeTintColor="#FFF" inactiveTintColor="#FFF" activeBackgroundColor="#2F6793" hideNavBar tabBarPosition="bottom" tabBarStyle={{ backgroundColor: '#4695D1' }} tabs key="tabbar" >
            <Scene key="icon" title="Home" icon={TabIconHome} >
              <Scene hideNavBar key="home" component={Home} />
            </Scene>
            <Scene  key="pacientes" title="Pacientes" icon={TabIconPacientes} >
              <Scene hideNavBar key="pacientes" component={Pacientes} />
            </Scene>
          </Scene>
        </Scene>
      </Router>

    );
  }
}
