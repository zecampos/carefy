import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, StatusBar, AsyncStorage } from 'react-native';

import { Container, CardItem, Card, Content, Form, Grid, Item, Input, Label, Icon, Button, Header } from 'native-base';
import { Actions } from 'react-native-router-flux'
import Modal from "react-native-modal";

import Logo from '../../assets/logo.png'
import Mixins from '../utils/Mixins'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isModalVisible: false,
        };
    }
    setId = async (res) => {
        try {
            await AsyncStorage.setItem('@MySuperStore:id', res.user_id)
            await AsyncStorage.setItem('@MySuperStore:name', res.name)
            await AsyncStorage.setItem('@MySuperStore:email', res.email)
        } catch (error) {
            console.log(error)
        }
    }
    Login = () => {
        this.setState({ isModalVisible: true })
        Mixins.Login(this.state.username, this.state.password)
            .then(res => {
                if (res.status === '200') {
                    this.setId(res)
                    setTimeout(() => {
                        this.setState({ isModalVisible: false })
                        Actions.push('home')
                    }, 2000)
                } else {
                    setTimeout(() => {
                        this.setState({ isModalVisible: false })
                        alert(res.message)
                    }, 2000)
                }
            })
            .catch(error => {
                setTimeout(() => {
                    console.log('erro')
                    this.setState({ isModalVisible: false })
                }, 2000)
            }
            )
    }
    render() {
        return (
            <Container androidStatusBarColor="#4695D1" style={{ backgroundColor: '#4695D1' }}>
                <Header style={{ backgroundColor: '#4695D1' }} androidStatusBarColor="#4695D1" />
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 100, marginBottom: 0 }}>
                    <Image source={Logo} />
                </View>
                <Content >
                    <View style={{ marginHorizontal: 30 }}>
                        <Form>
                            <Item inlineLabel last>
                                <Icon style={styles.iconStyle} active name='mail' />
                                <Label style={styles.label}>E-mail</Label>
                                <Input style={styles.input} onChangeText={(username) => this.setState({ username })} />
                            </Item>
                            <Item inlineLabel last>
                                <Icon style={styles.iconStyle} active name='key' />
                                <Label style={styles.label}>Senha</Label>
                                <Input secureTextEntry onChangeText={(password) => this.setState({ password })} style={styles.input} />
                            </Item>
                            <Button onPress={() => this.Login()} style={{ marginTop: 30, borderColor: 'white' }} full bordered>
                                <Text style={{ color: 'white' }}>Entrar</Text>
                            </Button>
                        </Form>
                    </View>
                </Content>
                <Modal backdropColor="#000000" isVisible={this.state.isModalVisible}>
                    <Content style={{ flex: 1, backgroundColor: '#FFFFFF', marginHorizontal: 0 }}>
                        <Image source={require('../../assets/spinner.gif')} />
                    </Content>
                </Modal>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    label: {
        color: 'white'
    },
    iconStyle: {
        color: 'white'
    },
    input: {
        color: 'white'
    },
    formLogin: {
        margin: '20',
    }
})