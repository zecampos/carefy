import React, { Component } from 'react';
import { Image, View, StyleSheet, StatusBar, AsyncStorage } from 'react-native';

import { Container, Header, Content, Card, CardItem, Body, Text, Right, Icon, Button, Title, Left } from "native-base";
import { Actions } from 'react-native-router-flux'

import Card1 from '../../assets/card1.jpg'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: ''
    };
  }

  render() {

    return (
      <Container >
        <Header androidStatusBarColor="#4695D1" style={{ backgroundColor: '#4695D1' }} >
          <Body style={{ alignContent: 'center' }}>
            <Title>Prosel Carefly</Title>
          </Body>
          <Right>
            <Button onPress={() => Actions.push('login')} iconLeft transparent>
              <Text>sair</Text>
            </Button>
          </Right>
        </Header>
        <Content >
          <Card style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', marginVertical: 40 }}>
            <CardItem>
              <Image style={{ width: 400, height: 260 }} source={Card1} />
            </CardItem>
            <CardItem>
              <Body>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  <Icon name="md-medkit" />
                  <Text>Gestão de pacientes</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
