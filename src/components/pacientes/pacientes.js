import React, { Component } from 'react';
import { AsyncStorage, Image, Alert } from 'react-native'

import { Container, Header, Content, Body, Title, Right, Button, Icon, Label, Input, List, ListItem, Text, Left, Form, Item, ActionSheet } from "native-base";
import Modal from "react-native-modal";

import Mixins from '../utils/Mixins'

export default class Pacientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            id: '1',
            name: '',
            email: '',
            patients: [],
            hospital: '',
            loading: false
        };
    }
    componentDidMount() {
        this.listPatient(this.state.id)
    }

    async getData() {
        try {
            const id = await AsyncStorage.getItem('@MySuperStore:id')
            const email = await AsyncStorage.getItem('@MySuperStore:email')
            this.setState({ id, email })
        }
        catch (erro) {
            console.log(erro)
        }
    }


    listPatient = (id) => {
        this.getData()
        Mixins.getPatients(id)
            .then(res => {
                this.setState({ patients: res.database.patients })
                console.log(this.state)
            })
            .catch(error => console.log(error))
    }

    addPatient = () => {
        this.setState({ loading: true })
        Mixins.addPatient(this.state.name, this.state.hospital, this.state.id)
            .then(data => {
                if (data.status === '200') {
                    console.log(data.message)
                    this.setState({ isModalVisible: !this.state.isModalVisible, name: '', hospital: '', loading: false });
                    this.listPatient(this.state.id)
                } else if (data.status === '500') {
                    console.log('erro')
                    this.setState({ isModalVisible: !this.state.isModalVisible, name: '', hospital: '', loading: false });
                }
            })
    }

    removePatient = (id) =>{
        Alert.alert(
            'Excluir','tem certeza que deseja excluir?',
            [
                {text: 'excluir', onPress:() =>{
                    Mixins.removePatient(this.state.id, id)
                    .then(data =>{
                        if(data.status === '200'){
                            console.log('deletado com sucesso')
                            this.listPatient(this.state.id)
                        } else if (data.status === '500'){
                            console.log('erro ao deletar')
                        }
                    })

                }},
                {
                    text: 'cancel', onPress: () => console.log('cancelado')
                }
            ]
        )
       
    }
    render() {
        modalAction = () => {
            this.setState({ isModalVisible: !this.state.isModalVisible });
        }

        return (
            <Container style={{ margin: 0, padding: 0 }} >
                <Header androidStatusBarColor="#4695D1" style={{ backgroundColor: '#4695D1' }} >
                    <Body style={{ alignContent: 'center' }}>
                        <Title>Pacientes</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => modalAction()} transparent>
                            <Icon name='md-add-circle' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List
                        style={{ margin: 0, padding: 0 }}
                        dataArray={this.state.patients}
                        renderRow={(item) =>
                            <ListItem style={{ marginVertical: 2 }} icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#CCCCCC" }}>
                                        <Icon active name="contact" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>{item.name}</Text>
                                    <Text note>{item.hospital}</Text>
                                </Body>
                                <Right>
                                    <Button onPress={
                                      () => this.removePatient(item.id)
                                    } style={{ backgroundColor: "#CCCCCC" }}>
                                        <Icon active name="trash" />
                                    </Button>
                                </Right>
                            </ListItem>
                        }>
                    </List>
                </Content>
                <Modal isVisible={this.state.isModalVisible}>
                    {this.state.loading ?
                        <Content style={{ flex: 1, backgroundColor: '#FFFFFF', marginHorizontal: 0 }}>
                            <Image source={require('../../assets/spinner.gif')} />
                        </Content>
                        :
                        <Content style={{ flex: 1, backgroundColor: '#FFFFFF', marginHorizontal: 0 }}>
                            <Form>
                                <Item floatingLabel last>
                                    <Label>Nome Paciente</Label>
                                    <Input onChangeText={(name) => this.setState({ name })} />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>Nome Hospital</Label>
                                    <Input onChangeText={(hospital) => this.setState({ hospital })} />
                                </Item>
                            </Form>
                            <Button style={{ marginTop: 10 }} light full iconLeft onPress={() => {
                                modalAction()
                                this.setState({ name: '', hospital: '' })

                            }}>
                                <Icon active name="trash" />
                                <Text>Cancelar</Text>
                            </Button>
                            <Button style={{ marginTop: 2 }} info full iconLeft onPress={() => this.addPatient()}>
                                <Icon active name="trash" />
                                <Text>Salvar</Text>
                            </Button>
                        </Content>
                    }
                </Modal>
            </Container>
        );
    }
}
